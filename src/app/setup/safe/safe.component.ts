import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import { resetPwd } from '../../modules/login';
import { FormControl, FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import {Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'safeBox',
  templateUrl: './safe.component.html',
  // styleUrls: '',
})
export class SafeComponent {
  constructor(private userSafeHttp: HttpClient,private authService: AuthService,) {  }
  private resetpwd=new resetPwd();
  private salt='52E52B983F54C6946B2424B240944FF2';
  ngOnInit() {}

  updatePwd(ele){
    this.userSafeHttp.post('/v1.1/application/update111',ele,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req => {
        if(req['message']=="OK"){ alert('修改成功'); }
        else{ alert(req['message']); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { console.log( err.error.message); }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    );
  }

  submitPwd(form){
    let key=Md5.hashStr(form.oldPwd+form.newPwd+this.salt).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('oldPwd', form.oldPwd);
    urlSearchParams.append('newPwd', form.newPwd);
    urlSearchParams.append('salt', this.salt);
    let param = urlSearchParams.toString();
    if(form.newPwd==form.reNewPwd){
      if(form.oldPwd==form.newPwd){
        alert('新密码与原始密码一致！');return false;
      }
      else{
        alert('修改成功');
        this.updatePwd(param);
      }
    }
  }
}
