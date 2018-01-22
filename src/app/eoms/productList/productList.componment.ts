import { Component,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';
import {MenuAdd} from '../../modules/login';




import * as $ from 'jquery';
import '../../../assets/js/drag-arrange.js';



@Component({
  selector: 'productListBox',
  templateUrl: './productList.componment.html',
  styleUrls: ['./productList.componment.css'],
})


export class ProductListComponent {
  constructor(private productListHttp: HttpClient) { }
  private productListData:any;
  private listLength:any;
  private first:any;
  private appid:any;
  private fNum:any;
  private sNum:any;
  private parentid='0';
  private tNum:any;
  private parentidT:any;
  ngOnInit() {
    this.productListF();




  /*／／／／／／／／／／／／／／*/




    var iosDragDropShim = { enableEnterLeave: true }                // 兼容移动端
    var source = document.querySelectorAll('.list'),
      recycle = document.getElementById('recycle'),
      dragElement = null,                                         // 用于存放拖动元素
      lock = true;                                                // 最后元素拖放拖放时会进入enter和leave的循环，用来锁住

    for(var i = 0; i < source.length; i++){
      source[i].addEventListener('dragstart',function(ev){
        dragElement = this;                                     // 用于存放拖动元素
        // this.style.backgroundColor = '#f8f8f8';                 // 设置拖动元素的背景
      },false);

      source[i].addEventListener('dragend',function(ev){
        // ev.target.style.backgroundColor = '#fff';               // 拖放结束还原拖动元素的背景
        ev.preventDefault();
      },false)

      source[i].addEventListener('dragenter', function(ev){
        if(dragElement != this){
          this.parentNode.insertBefore(dragElement,this);     // 把拖动元素添加到当前元素的前面
        }
      }, false)

      source[i].addEventListener('dragleave', function(ev){
        console.log(111);
        if(dragElement != this){
          if(lock && (this == this.parentNode.lastElementChild || this == this.parentNode.lastChild)){    // 当前元素时最后一个元素
            this.parentNode.appendChild(dragElement);       // 把拖动元素添加最后面
            lock = false;
          }else{
            lock = true;
          }
        }
      }, false)
    };

    recycle.addEventListener('drop', function(ev){                  // 拖进回收站则删除该元素
      dragElement.parentNode.removeChild(dragElement);
    }, false)

    document.ondragover = function(e){e.preventDefault();}          // 必须设置dragover阻止默认事件
    document.ondrop = function(e){e.preventDefault();}



  /*／／／／／／／／／／／／／／／／*/



  }
  private menuAdd=new MenuAdd();
  /*获取产品列表*/
  productListF(){
    this.productListHttp.get('/v1.1/category/list').subscribe(req => {
      this.productListData = req['data']['resourceData'];
      this.appid=this.productListData[0].appId;
      console.log(this.productListData);
      console.log(this.appid);

      return this.listLength = this.productListData.length;
    });
  }

  productAddFather(ele){
    this.productListHttp.post('/v1.1/category/add',ele,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req=>{
        if(req['code']=="200"){ alert('添加成功'); this.first=false;this.productListF();}
        else{ alert('添加失败'); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { console.log( err.error.message); }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    )
  }

  productAddChild(ele){
    this.productListHttp.post('/v1.1/commodity/add',ele,{headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})}).subscribe(
      req=>{
        if(req['code']=="200"){ alert('添加成功'); this.productListF();;}
        else{ alert('添加失败'); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { console.log( err.error.message); }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    )
  }

  addFathertMenu(form){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('appId', this.appid);
    urlSearchParams.append('annotation', form.annotation);
    urlSearchParams.append('englishName', form.englishName);
    urlSearchParams.append('categoryClass', this.parentid=='0'?'1':'2');
    urlSearchParams.append('groupOrder', this.parentid=='0'?this.fNum:this.sNum);
    urlSearchParams.append('versionLimit', form.versionLimit);
    urlSearchParams.append('version', form.version);
    if(this.parentid!=='0'){ urlSearchParams.append('parentId', this.parentid); }
    let paramFather = urlSearchParams.toString();
    console.log(paramFather);
    this.parentid='0';
    this.productAddFather(paramFather)
}

  addChildMenu(form){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('appId', this.appid);
    urlSearchParams.append('annotation', form.annotation);
    urlSearchParams.append('englishName', form.englishName);
    urlSearchParams.append('vendorCode', form.vendorCode);
    urlSearchParams.append('productCode', form.productCode);
    urlSearchParams.append('groupOrder', this.tNum);
    urlSearchParams.append('versionLimit', form.versionLimit);
    urlSearchParams.append('version', form.version);
    urlSearchParams.append('categoryId', this.parentidT);
    let paramChild = urlSearchParams.toString();
    console.log(paramChild);
    this.parentidT='0';
    this.productAddChild(paramChild)
  }


}






