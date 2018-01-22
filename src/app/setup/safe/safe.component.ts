import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { resetPwd } from '../../modules/login';
import { FormControl, FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import {Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'safeBox',
  templateUrl: './safe.component.html',
})
export class SafeComponent {
  constructor(private userSafeHttp: HttpClient,private userService: UserService,) { }
  private resetpwd=new resetPwd();
  private salt='ABB716BEBB22441CE3093599FCA48249';
  private saltS='52E52B983F54C6946B2424B240944FF2';
  ngOnInit() {}

  updatePwd(ele){
    this.userSafeHttp.post('/v1.1/application/updatePwd',ele,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req => {
        if(req['message']=="OK"){ alert('修改成功'); }
        else{ alert('原始密码不正确'); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { console.log( err.error.message); }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    );
  }

  submitPwd(form){
    let oldKey=Md5.hashStr(form.oldPwd+this.salt).toString();
    let newKey=Md5.hashStr(form.newPwd+this.salt).toString();
    let newKeyS=Md5.hashStr(newKey+this.saltS).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', this.userService.userData.email);
    urlSearchParams.append('oldPassword', oldKey);
    urlSearchParams.append('newPassword', newKey);
    urlSearchParams.append('validate', newKeyS);
    let param = urlSearchParams.toString();
    if(form.newPwd==form.reNewPwd){
      if(form.oldPwd==form.newPwd){
        alert('新密码与原始密码一致！');return false;
      }
      else{
        this.updatePwd(param);
      }
    }
  }
}
