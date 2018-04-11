import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import {Router, NavigationExtras } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'headBox',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent {
  title = 'head';
  private name;
  public show;
  constructor(public cameraService: CameraService, public router: Router,private logoutHttp: HttpClient) { }
  ngOnInit(){
    this.cameraService.openUrl();
    // this.getRoleList(this.cameraService.userDetial.customerId);
  }
  /*退出登录*/
  logout() {
    this.logoutHttp
      .post('/api/v1.0/customer/signout', {headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})})
      .subscribe(
        req => {
          if(req['code']=="200"||req['code']=="401"){
            window.localStorage.removeItem('smartContent');
            let redirect ='/login';
            let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
            this.router.navigate([redirect], navigationExtras);
            this.cameraService.isLoggedIn = false;
          }
          else {alert(req['message'])}
        }
      );
/*    window.localStorage.removeItem('smartContent');
    let redirect ='/login';
    let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
    this.router.navigate([redirect], navigationExtras);
    this.cameraService.isLoggedIn = false;*/
  }
  /*获取角色权限*/
  getRoleList(ele){
    const params = new HttpParams().set('customerId', ele)
    this.logoutHttp.get('/api/v1.0/function/list',{params}).subscribe(req => {
      if(req['code']==401){
        window.localStorage.removeItem('smartContent');
        this.cameraService.isLoggedIn=false
        var url = '/login';
        let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
        this.router.navigate([url], navigationExtras);
      }
    });
  }
  bodyAdd(){
    let body=document.getElementsByTagName('body')[0];
    let subMenu=document.getElementsByClassName('treeview-menu');
    if(body.className==''){ body.className = 'sidebar-collapse'; }
    else{ body.classList.remove('sidebar-collapse'); }
  }
}
