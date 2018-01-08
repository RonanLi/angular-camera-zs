import { Component } from '@angular/core';
import * as $ from 'jquery'
import { AuthService } from '../services/auth.service';
import {Router, NavigationExtras } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'headBox',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent {
  title = 'head';
  private userData={};
  ngOnInit(){this.userMsgF();}
  constructor(public authService: AuthService, public router: Router,private userMsgHttp: HttpClient,) { }

  logout() {
        this.DelCookie('apiKey');
        let redirect ='/login';
        let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
        this.router.navigate([redirect], navigationExtras);
        this.authService.isLoggedIn = false;
  }
  DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
    var cval = this.authService.GetCookieValue(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toUTCString();

  }


  userMsgF(){
    this.userMsgHttp.get('/v1.1/application/info').subscribe(req => {
      this.userData = req['data'];
      this.authService.userData=req['data'];
      return this.userData;
    });
  }

  bodyAdd(){
    let body=document.getElementsByTagName('body')[0];
    let subMenu=document.getElementsByClassName('treeview-menu');
    if(body.className==''){ body.className = 'sidebar-collapse'; }
    else{ body.classList.remove('sidebar-collapse'); }
  }
}
