import { Component,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';
import {MenuEdit} from '../../modules/login';

@Component({
  selector: 'productEditT',
  templateUrl: './productEditT.componment.html',
})


export class ProductEditTComponent {
  constructor(private productEditTHttp: HttpClient) { }
  ngOnInit() {
    var id=window.location.pathname.substr(6);
    this.productEditT(id);
  }
  private menuEdit=new MenuEdit();
  private editData=new MenuEdit();
  /*获取产品列表*/
  productEditT(ele){
    this.productEditTHttp.get('/v1.1/'+ele).subscribe(req => {
      this.editData = req['data'];
      console.log(this.editData );
    });
  }
  productUpdateT(param){
    this.productEditTHttp.put('/v1.1/commodity/update',param,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
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
  editMenuT(form){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('commodityId', form.commodityId);
    urlSearchParams.append('appId', form.appId);
    urlSearchParams.append('categoryId', form.categoryId);
    urlSearchParams.append('vendorCode', form.vendorCode);
    urlSearchParams.append('productCode',form.productCode);
    urlSearchParams.append('englishName', form.englishName);
    urlSearchParams.append('templateId',form.templateId);
    urlSearchParams.append('annotation',form.annotation);
    urlSearchParams.append('recommendLevel',form.recommendLevel);
    urlSearchParams.append('guidePicture',form.guidePicture);
    urlSearchParams.append('effectPicture',form.effectPicture);
    urlSearchParams.append('productAvatar',form.productAvatar);
    urlSearchParams.append('qrCodePicture',form.qrCodePicture);
    urlSearchParams.append('statusCode',form.statusCode);
    urlSearchParams.append('versionLimit',form.versionLimit);
    urlSearchParams.append('actualPicture',form.actualPicture);
    urlSearchParams.append('groupOrder',form.groupOrder);
    let param = urlSearchParams.toString();
    this.productUpdateT(param);
  }
  goBack(){ location.href='eoms/productList'; }

}






