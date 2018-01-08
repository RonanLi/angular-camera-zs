import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  /*简单的转发请求而不做任何修改*/
  /*  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   console.log(next.handle(req));
   return next.handle(req);
   }*/


  /*修改请求地址http为https*/
/*    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const dupReq = req.clone();
   const secureReq = req.clone({url: req.url.replace('http://', 'https://')});
   return next.handle(secureReq);
   }*/


  /*拦截器设置新的头*/
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authHeader = "application/x-www-form-urlencoded";
        const authReq = req.clone({headers: req.headers.set('Content-Type', authHeader)});
        // console.log(authReq)
        return next.handle(req);
   }

  /*打印日志--请求时间*/
  /*  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const started = Date.now();
   return next
   .handle(req)
   .do(event => {
   if (event instanceof HttpResponse) {
   const elapsed = Date.now() - started;
   console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
   }
   });
   }*/


  /*拦截器缓存*/



}
