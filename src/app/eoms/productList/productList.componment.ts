import { Component,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'productListBox',
  templateUrl: './productList.componment.html',
  styleUrls: ['./productList.componment.css'],
})


export class ProductListComponent {

  productlists = ProductList;

  constructor(private productListHttp: HttpClient,public authService: AuthService) { }

  key='';
  apiKey=this.authService.apiKey;
  // apiKey='174bc4c1^f3ed^44a9^b01f^9ccf20229a3b';
  private productListData=[];

  ngOnInit() {
    this.productListF(this.key);
  }

  productListF(ele){
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const params = new HttpParams() .set('apiKey', this.apiKey).set('key', ele);
    this.productListHttp.get('/v1.1/category/list',{headers}).subscribe(req => {
      this.productListData = req['data']['resourceData'];
      console.log(this.productListData);
    });

  }


}





const ProductList = [
  {
    id: 1, name:'智能网关',
    subList:[
      {subName:'智能网关1'},
      {subName:'智能网关2'},
      {subName:'智能网关3'},
      {subName:'智能网关4'},
      {subName:'智能网关5'},
    ],
    isShow:false,

  },
  {
    id: 2, name:'智能照明',
    subList:[
      {subName:'智能照明1'},
      { subName:'智能照明2'},
      {subName:'智能照明3'},
      { subName:'智能照明4'},
      {subName:'智能照明5'},
    ],
    isShow:false,
  },
  {
    id: 5, name:'智能插座',
    subList:[
      {subName:'智能插座1'},
      { subName:'智能插座2'},
      {subName:'智能插座3'},
      { subName:'智能插座4'},
      {subName:'智能插座5'},
    ],
    isShow:false,
  },
  {
    id: 3, name:'智能面板',
    subList:[
      {subName:'智能插座1'},
      { subName:'智能插座2'},
      {subName:'智能插座3'},
      { subName:'智能插座4'},
      {subName:'智能插座5'},
    ],
    isShow:false,
  },
  {
    id: 4, name:'智能窗帘',
    subList:[
      {subName:'智能插座1'},
      { subName:'智能插座2'},
      {subName:'智能插座3'},
      { subName:'智能插座4'},
      {subName:'智能插座5'},
    ],
    isShow:false,
  }
];

