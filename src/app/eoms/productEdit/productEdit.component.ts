import { Component,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';
import {MenuEdit} from '../../modules/login';

@Component({
  selector: 'productEditBox',
  templateUrl: './productEdit.component.html',
})


export class ProductEditComponent {
  constructor(private productEditHttp: HttpClient) { }
  ngOnInit() {
    var id=window.location.pathname.substr(6);
    this.productEdit(id);
  }
  private editData=new MenuEdit();
  // private editData:any;
  /*获取产品列表*/
  productEdit(ele){
    this.productEditHttp.get('/v1.1/'+ele).subscribe(req => { this.editData = req['data']; });
  }
  productUpdate(param){
    this.productEditHttp.put('/v1.1/category/update',param,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req=>{
        if(req['code']=="200"){ alert('修改成功');this.goBack()}
        else{ alert('修改失败'); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { console.log( err.error.message); }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    )
  }
  editMenu(form){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('categoryId', form.categoryId);
    urlSearchParams.append('annotation', form.annotation);
    urlSearchParams.append('appId', form.appId);
    urlSearchParams.append('categoryAvatar', form.categoryAvatar);
    urlSearchParams.append('englishName',form.englishName);
    urlSearchParams.append('groupOrder', form.groupOrder);
    if(form.parentId){ urlSearchParams.append('parentId',form.parentId); }
    urlSearchParams.append('statusCode',form.statusCode);
    urlSearchParams.append('versionLimit',form.versionLimit);
    let param = urlSearchParams.toString();
    console.log(param);
    this.productUpdate(param)
  }
  goBack(){ location.href='eoms/productList'; }

}






