import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CameraService } from './camera.service';
// import { GroupService } from './group.service';

@Injectable()
export class HttpServiceFactory implements HttpInterceptor {

  // constructor(private auth: CameraService,private authG:GroupService ) {}
  constructor(private auth: CameraService ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = "application/x-www-form-urlencoded";
    var authReq;
    var smartContent = window.localStorage.getItem('smartContent');
    var smartGroup = window.localStorage.getItem('smartGroup');
/*    if(this.auth.apiKey){
      authReq = req
        .clone({headers: req.headers.set('Content-Type', authHeader)})
        .clone({setHeaders: {apiKey: this.auth.apiKey}});
    }
    else{
      authReq = req
        .clone({headers: req.headers.set('Content-Type', authHeader)})
    }
    return next.handle(authReq);*/


    if(smartContent&&!smartGroup){
      if(this.auth.group==1){
        console.log(this.auth.group)
        authReq = req
          .clone({headers: req.headers.set('Content-Type', authHeader)})
      }
      else{
        authReq = req
          .clone({headers: req.headers.set('Content-Type', authHeader)})
          .clone({setHeaders: {apiKey: this.auth.apiKey}});
      }

    }
    else if(smartContent&&smartGroup){
      if(this.auth.group==1){
        authReq = req
          .clone({headers: req.headers.set('Content-Type', authHeader)})
      }
      else{
        authReq = req
          .clone({headers: req.headers.set('Content-Type', authHeader)})
          .clone({setHeaders: {apiKey: this.auth.apiKey}});
      }
    }
    else if(!smartContent&&smartGroup){
      authReq = req
        .clone({headers: req.headers.set('Content-Type', authHeader)})
    }
    else if(!smartContent&&!smartGroup){
      authReq = req
        .clone({headers: req.headers.set('Content-Type', authHeader)})
    }
    return next.handle(authReq);


  }


}
