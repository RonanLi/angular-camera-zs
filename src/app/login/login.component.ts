import { Component,OnInit,Input } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import{LoginNews} from '../modules/login';
import {Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';


/*路由守卫*/
import {Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {parseCookieValue} from "@angular/common/src/cookie";

@Injectable()

@Component({
  selector: 'loginBox',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
  constructor(private loginHttp: HttpClient,public authService: AuthService, public router: Router) { }

  ngOnInit() { console.log(this.authService.isLoggedIn); }
  private user=new LoginNews();
  vode=Math.floor((Math.random()*9+1)*1000);
  private headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  public datas={};
  public mark=true;
  public apiKey=this.authService.isLoggedIn;
  refresh() { this.vode = Math.floor((Math.random()*9+1)*1000); }
  submit(form){
    let passwordSalt='ABB716BEBB22441CE3093599FCA48249';
    let randomSalt='52E52B983F54C6946B2424B240944FF2';
    let key=Md5.hashStr(form.password+passwordSalt).toString();
    let formPass=Md5.hashStr(key+form.code+randomSalt).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', form.userName);
    urlSearchParams.append('password', formPass);
    urlSearchParams.append('randomCode', form.code);
    let param = urlSearchParams.toString();
    if(this.vode==form.code){
      this.mark=false;
      this.login(param);
    }
    else{this.refresh(); return false; }
  }
  login(ele) {
      if (ele.length< 23) { return false; }
      else {
        this.loginHttp
          .post('http://10.2.10.43:8092/v1.1/application/signin',ele, {headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})})
          .subscribe(
            req => {
              this.datas=req;
              // this.authService.apiKey=req['data']['apiKey'].replace(/\^/g, '%5E');
              if(this.datas['message']=="OK"){
                let redirect ='/index';
                let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
                this.router.navigate([redirect], navigationExtras);
                /*失效时长*/
                var millisecond = new Date().getTime();
                var expiresTime = new Date(millisecond + 60 * 1000 *120 );
                // var expiresTime = new Date(millisecond + 10 * 1000 );
                document.cookie="apiKey="+req['data']['apiKey']+"; expires=" + expiresTime+';path= /';
                console.log(document.cookie);
                return this.authService.isLoggedIn=true;
              }
              else{alert('用户名或密码错误');return this.mark=true;}
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) { console.log( err.error.message); }
              else { alert(`服务器异常，请稍后再试！`); }
              return this.mark=true;
            });
      }
  }
}






