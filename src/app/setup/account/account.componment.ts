import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import { UserUpdata } from '../../modules/login';
import { FormControl, FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import {Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'accountBox',
  templateUrl: './account.componment.html',
  styleUrls: ['./account.componment.css'],
})
export class AccountComponent {
  title = 'account';
  constructor(private userMsgHttp: HttpClient,private authService: AuthService,) {  }
  private userData={};
  private user=new UserUpdata();
  private sendcode:any;
  private salt='52E52B983F54C6946B2424B240944FF2';
  private mark=true;
  private codeMark=true;
  private modify=false;
  count:number;
  ngOnInit() {
    this.userMsgF();

    // Observable.interval(1000).take(15).repeat(1).subscribe(_ => this.count = _);

  }
  userMsgF(){
    this.userMsgHttp.get('/v1.1/application/info').subscribe(req => {
      this.userData = req['data'];
      this.authService.userData=req['data'];
      return this.userData;
    });
  }


  newUserMsg(ele){
    this.userMsgHttp.post('/v1.1/application/update',ele,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req => {
        if(req['message']=="OK"){ alert('修改成功'); this.modify=false; this.userMsgF(); }
        else{ alert(req['message']); }
        return this.mark=true;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { console.log( err.error.message); }
        else { alert(`服务器异常，请稍后再试！`); }
        return this.mark=true;
      }
    );
  }
  sendCode(){
    this.codeMark=false;

    this.sendcode=123456;

    console.log(this.sendcode);
    // return this.codeMark=true;
  }

  submitN(form){
    let key=Md5.hashStr(form.newphone+form.randomCode+this.salt).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', this.userData['email']);
    urlSearchParams.append('phone', form.newphone);
    urlSearchParams.append('randomCode', form.randomCode);
    urlSearchParams.append('validate', key);
    let param = urlSearchParams.toString();
    if(this.sendcode==form.randomCode){this.mark=false; this.newUserMsg(param); }
    else{return false; }
  }
}
