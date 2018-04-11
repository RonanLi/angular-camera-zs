import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { CameraService } from '../../services/camera.service';
import {Router, NavigationExtras } from '@angular/router';
import { resetPwd } from '../../modules/login';
import { FormControl, FormGroup,FormBuilder,AbstractControl,Validators } from '@angular/forms';
import {Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/toPromise';
import {URLSearchParams} from "@angular/http";
@Component({
  selector: 'rePwdBox',
  templateUrl: './rePwd.componment.html',
})
export class RePwdComponent {
  constructor(private userSafeHttp: HttpClient,private userService: CameraService,public router: Router) { }
  public resetpwd=new resetPwd();
  public salt='ABB716BEBB22441CE3093599FCA48249';
  public saltS='52E52B983F54C6946B2424B240944FF2';
  ngOnInit() {}

  updatePwd(ele){
    var timer='?m='+Date.parse(String(new Date()));

    this.userSafeHttp.post('/api/v1.0/password/update?'+timer,ele,).subscribe(
      req => {
        if(req['message']=="OK"){ alert('修改成功,请重新登录!');
          window.localStorage.removeItem('smartContent');
          this.userService.isLoggedIn=false;
          var url = '/login';
          let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
          this.router.navigate([url], navigationExtras); }
        else{ alert('原始密码不正确'); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    );
  }

  submitPwd(form){
    let oldKey=Md5.hashStr(form.oldPwd+this.salt).toString();
    let newKey=Md5.hashStr(form.newPwd+this.salt).toString();
    let newKeyS=Md5.hashStr(newKey+this.saltS).toString();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('oldPassword', oldKey);
    urlSearchParams.append('newPassword', newKey);
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

  // public currentStyles = { 'min-height': (window.screen.height)+'px',};
  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};

}
