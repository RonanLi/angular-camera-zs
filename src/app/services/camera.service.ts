import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, NavigationExtras } from '@angular/router';
@Injectable()
export class CameraService {
  constructor( public router: Router) { }
  public group=0;
  public userStorage:any;
  public apiKey:any;
  public isLoggedIn=this.openUrl();
  public redirectUrl: string;
  public userDetial:any;
  public customerType;
  public  power;
  ngOnInit(){}

  openUrl(){
    this.userStorage = window.localStorage.getItem('smartContent');
    if(this.userStorage == null || this.userStorage == undefined){
      window.localStorage.removeItem('smartContent');
      // var url = '/index';
      // let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
      // this.router.navigate([url], navigationExtras);
      return false;
    }
    else{ this.userDetial=JSON.parse(this.userStorage);this.apiKey=this.userDetial.apiKey;return true; }
  }
  /*获取客户管理权限*/
  getQx(id){
    let arr=[];
    for(var i=0;i<this.userDetial.functionArray.length;i++){
      if(this.userDetial.functionArray[i].functionId==id) {
        arr=this.userDetial.functionArray[i].permission;
      }
    }
    return arr;
  }
  userType(){
    if(this.isLoggedIn==true){
      if(this.userDetial.customerType=='甜园科技'){
        return this.customerType='A';
      }
      else if(this.userDetial.customerType=='运营公司'){
        return this.customerType='B';
      }
      else if(this.userDetial.customerType=='租赁公司'){
        return this.customerType='C';
      }
      else{
        return this.customerType='D';
      }
    }
  }
  goLogIn(){
    window.localStorage.removeItem('smartContent');
    this.isLoggedIn=false;
    var url = '/login';
    let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
    this.router.navigate([url], navigationExtras);
  }

}

