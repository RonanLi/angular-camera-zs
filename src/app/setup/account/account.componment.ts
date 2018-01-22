import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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
  constructor(private userMsgHttp: HttpClient,private authService: AuthService,private userService: UserService) {  }
  private user=new UserUpdata();
  private sendcode:any;//手机验证吗
  private salt='52E52B983F54C6946B2424B240944FF2';
  private mark=true;//保存按钮禁用标识
  private codeMark=true;//是否发送验证码标识
  private phoneMark=false;//手机号码有误标识
  private modify=false;//弹窗是否显示
  private phoneCode=false;//验证有误
  count:number;
  ngOnInit() {
    // Observable.interval(1000).take(15).repeat(1).subscribe(_ => this.count = _);
  }

  newUserMsg(ele){
    this.userMsgHttp.post('/v1.1/application/updatePhone',ele,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req => {
        if(req['code']=="200"){
          alert('修改成功'); this.modify=false;
          this.userService.userPublic();
        }
        else if(req['code']=="502"){
          this.mark=true;this.phoneCode=true;
        }
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
  /*发送验证码*/
  sendCode(ele){
    let phoneSalt='58E2496E54D7E3AA';
    console.log(ele);
    let phoneKey=Md5.hashStr(ele+phoneSalt).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('phone',ele);
    urlSearchParams.append('validate',phoneKey);
    let param = urlSearchParams.toString();
    if(this.isPoneAvailable(ele)){
      this.codeMark=false;/*禁止再次点击发送*/
      this.phoneMark=false;
      this.userMsgHttp.post('/v1.1/application/checkCode',param,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
       req => {
         if(req['message']=="OK"){
           this.mark=true;
           this.timeOut();
         }
         else{ alert(req['message']); this.codeMark=true; }
       },
       (err: HttpErrorResponse) => {
         if (err.error instanceof Error) { console.log( err.error.message); }
         else { alert(`服务器异常，请稍后再试！`); }
         this.mark=true;
         this.codeMark=true;
       });
    }
    else{ this.phoneMark=true;}
  }
  /*倒计时*/
  timeOut(){ return this.codeMark=true; }

  /*手机号码校验*/
  isPoneAvailable(ele){ var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; if(!myreg.test(ele)) { return false; } else { return true; } }

  /*提交表单*/
  submitN(form){
    let key=Md5.hashStr(form.newphone+form.randomCode+this.salt).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', this.userService.userData['email']);
    urlSearchParams.append('phone', form.newphone);
    urlSearchParams.append('randomCode', form.randomCode);
    urlSearchParams.append('validate', key);
    let paramT = urlSearchParams.toString();
    if(form.newphone!==''&&form.randomCode!==''){
      this.mark=false;
      this.newUserMsg(paramT);
    }
  }
}
