import { Component,OnInit,Input } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import{LoginMsg} from '../modules/allData';
import {Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';
// import { Injectable } from '@angular/core';
import {URLSearchParams} from "@angular/http";

import {userDetial} from '../modules/allData'

/*路由守卫*/
import { CameraService } from '../services/camera.service';
// import { GroupService } from '../services/group.service';
import {Router, NavigationExtras } from '@angular/router';

// @Injectable()

@Component({
  selector: 'groupLoginBox',
  templateUrl: './groupLogin.component.html',
  styleUrls: ['./groupLogin.component.css'],
})

export class GroupLoginComponent {
  // constructor(private loginHttp: HttpClient,public cameraService: GroupService, public router: Router) { }
  constructor(private loginHttp: HttpClient,public cameraService: CameraService,public router: Router) { }
  public errMsg;
  public userStorage;
  public userDetial;
  public apiKey;
  ngOnInit() {
    this.userStorage = window.localStorage.getItem('smartGroup');
  }
  private user=new LoginMsg();
  vode=Math.floor((Math.random()*9+1)*1000);
  public datas={};
  public mark=true;
  private isPhone=true;//手机号码校验标识;
  refresh() { this.vode = Math.floor((Math.random()*9+1)*1000); }

  submit(form){
    var userDelSpace=form.userName.replace(/\s+/g,'');
    let passwordSalt='ABB716BEBB22441CE3093599FCA48249';
    let key='58E2496E54D7E3AA';
    let formPass=Md5.hashStr(form.password+passwordSalt).toString();
    let validate=Md5.hashStr(userDelSpace+key).toString();
    var urlSearchParams = new URLSearchParams();

    if(userDelSpace.length==11){this.isPhone=this.isPoneAvailable(userDelSpace);}
    if(userDelSpace.length!==11){this.isPhone=true;}

    if(this.vode==form.code){
      if(userDelSpace.length==11&&this.isPhone){ urlSearchParams.append('phone', userDelSpace); }
      else if(userDelSpace.length==11&&!this.isPhone){return;}
      else{this.isPhone=true; urlSearchParams.append('name', userDelSpace); }
      urlSearchParams.append('passwd', formPass);
      urlSearchParams.append('validate', validate);
      urlSearchParams.append('type', 'video');
      let param = urlSearchParams.toString();
      this.mark=false;
      this.login(param);
    }
    else{this.refresh(); return false; }
  }
  login(ele) {
    if (ele.length< 23) { return false; }
    else {
      this.cameraService.group=1;
      this.loginHttp
        .post('/api/v1.0/customer/signin',ele)
        .subscribe(
          req => {
            this.mark=true;
            this.datas=req;
            if(this.datas['code']=="200"){
              if(req['data']){
                this.user.password='';
                this.user.userName='';
                window.localStorage.setItem('smartGroup', JSON.stringify(req['data']));
                let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
                let redirect ='/group/groupIndex';
                this.router.navigate([redirect], navigationExtras);
                this.errMsg='';

              }
              else{this.errMsg='您尚没有登录权限!'; }
            }
            else{this.errMsg=this.datas['message'];}
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) { console.log( err.error.message); }
            else { alert(`服务器异常，请稍后再试！`); }
          });
      this.mark=true;
    }
  }
  /*手机号码校验*/
  isPoneAvailable(ele){
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    this.errMsg='';
    if(!myreg.test(ele)) { return false; }
    else {return true; }
  }


  public currentStyles = { 'min-height': (window.screen.height-200)+'px','height': (window.screen.height-90)+'px',overflow:'visible'};


}





