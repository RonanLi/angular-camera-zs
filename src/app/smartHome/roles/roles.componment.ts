import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { CameraService } from '../../services/camera.service';
import {Router, NavigationExtras } from '@angular/router';
import { roleEdit,roleCreat } from '../../modules/allData';
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'rolesSmart',
  templateUrl: './roles.componment.html',
})

export class RolesComponent {
  constructor(private rolesHttp: HttpClient,public cameraService: CameraService,public router: Router) { }
  ngOnInit() {
    this.rolePower=this.cameraService.getQx('1003');
    this.getRoleList(this.cameraService.userDetial.customerId);
  }
  /*定义页面参数*/
  public add;
  public mask;
  public roleList:any;
  public roleAdd=new roleCreat();
  public edit=new roleEdit();
  // public timer='?m='+Date.parse(String(new Date()));

  /*权限*/
  public rolePower:any=[];

  /*获取角色列表*/
  getRoleList(ele){
    var timer='?m='+Date.parse(String(new Date()));

    const params = new HttpParams().set('customerId', ele)
    this.rolesHttp.get('/api/v1.0/role/list'+timer,{params}).subscribe(req => {
      if(req['code']=='200'){
        this.roleList=req['data'];
      }
      else if(req['code']=='401'){
        window.localStorage.removeItem('smartContent');
        this.cameraService.isLoggedIn=false;
        alert('请重新登录');
        var url = '/login';
        let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
        this.router.navigate([url], navigationExtras);
      }
      else{  alert(req['message'])}
    });
  }

  /*删除角色*/
  delet(ele){
    var timer='?m='+Date.parse(String(new Date()));

    var realy=confirm('角色删除后将无法恢复，是否继续？');
    if(!realy){return;}
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('roleId', ele);
    let param = urlSearchParams.toString();
    // console.log(param);
        this.rolesHttp
       .post('/api/v1.0/role/delete'+timer,param)
       .subscribe(
       req => {
         if(req['code']=="200"){
           alert('删除成功');
           this.getRoleList(this.cameraService.userDetial.customerId);
         }
         else{ alert(req['message']); }
       },
       (err: HttpErrorResponse) => {
         if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
         else { alert(`服务器异常，请稍后再试！`); }
       }
     )
  }

  /*编辑角色*/
  editRole(form){
    var timer='?m='+Date.parse(String(new Date()));

    for(var i=0;i<this.power.length;i++){
        // console.log(this.power[i].permission);
    }
    let Plist=JSON.stringify(this.power);
    // console.log(JSON.stringify(this.power));
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('roleId',  this.roleId);
    urlSearchParams.append('roleName',form.roleName );
    urlSearchParams.append('permission', Plist);
    /*数据为空不传数据*/
    // if(form.description){ urlSearchParams.append('description', form.description); }
    /*数据为空传数据*/
    urlSearchParams.append('description', form.description?form.description:'');
    let paramEdit = urlSearchParams.toString();
    this.rolesHttp
      .post('/api/v1.0/role/update'+timer,paramEdit,)
      .subscribe(
        req => {
          if(req['code']=="200"){
            alert('修改成功');
            this.getRoleList(this.cameraService.userDetial.customerId);
          }
          else{ alert(req['message']); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )
  }
  public power:any;
  public roleId:any;

  getRoleInfo(id){
    const params = new HttpParams().set('roleId', id);
    this.rolesHttp.get('/api/v1.0/role/info',{params}).subscribe(req => {
        this.power=JSON.parse(req['data'].permission);
        this.roleId=req['data'].roleId;
    });
  }

  selectCheckbox(check:boolean,id,name,omg){
    if(this.power.length>0){
      for(var i=0;i<this.power.length;i++){
        if(this.power[i].functionId==id){
          let qx=this.power[i].permission;
          qx[name]=check;
          return;
        }
      }
    }
    else{alert('系统异常请稍后')}
  }


  /*创建角色*/
  createRoleList(form){
    var timer='?m='+Date.parse(String(new Date()));

    let Plist=JSON.stringify(this.powerB);
    // console.log(JSON.stringify(this.powerB));
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('roleName', form.roleName);
    urlSearchParams.append('customerId', this.cameraService.userDetial.customerId);
    urlSearchParams.append('permission', Plist);
    if(form.description){ urlSearchParams.append('description', form.description); }
    let paramEdit = urlSearchParams.toString();
    // console.log(paramEdit);
    this.rolesHttp
      .post('/api/v1.0/role/add'+timer,paramEdit,)
      .subscribe(
        req => {
          if(req['code']=="200"){
            alert('创建成功');
            this.getRoleList(this.cameraService.userDetial.customerId);
          }
          else{ alert('创建失败'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )
  }

  /*添加权限对象*/
  public powerB=[
    {
      'functionId':'1001',
      'permission':{add:false,edit:false,forbidden:false,active:false,'export':false,"delete":false}
    },
    {
      'functionId':'1002',
      'permission':{share:false,edit:false,lookup:false,authorize:false,'export':false,"delete":false,forbidden:false,active:false,}
    },
    {
      'functionId':'1003',
      'permission':{add:false,edit:false,'delete':false}
    },
    {
      'functionId':'1004',
      // 'permission':{add:false,edit:false, "delete":false}
      'permission':{add:false,edit:false,forbidden:false,active:false,}

    },
    {
      'functionId':'1005',
      'permission':{log:false}
    },
    {
      'functionId':'1006',
      'permission':{add:false,edit:false,lookup:false,"delete":false}
    },
  ];

  /*权限选中设置*/
  public checkRole:any;
  selectCheckboxA(check:boolean,id,name){
    if(check){this.checkRole=check;}

    for(var i=0;i<this.powerB.length;i++){
      if(this.powerB[i].functionId==id){
        let qx=this.powerB[i].permission;
        qx[name]=check;
        // console.log(this.powerB);
        return;
      }
    }
  }

  // public currentStyles = { 'min-height': (window.screen.height)+'px',};
  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};

}


