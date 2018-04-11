import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { CameraService } from '../../services/camera.service';
import { subEdit,subAdd } from '../../modules/allData';
/*导入*/
import {Router, NavigationExtras } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'subaccountSmart',
  templateUrl: './subaccount.componment.html',
})

export class SubaccountComponent {
  constructor(private subaccountHttp: HttpClient,public cameraService: CameraService,public router: Router) { }
  /*定义页面参数*/
  public add;
  public editBatch;
  public mask;
  // public timer='?m='+Date.parse(String(new Date()));

  public subList:any;
  public paramList:any;
  //select 下拉选择
  public optionList:any=[{name:'请选择用户状态'}, {name:'启用'}, {name:'禁用'},];
  public optionL:any='请选择用户状态';
  public info:any='请选择用户状态';

  //是否全选
  public select=false;
  public select1=false;
  public editData=new subEdit;
  public addData=new subAdd;
  //批量选中用户对象
  public obj:any = [];
  /*页码*/
  public  page:any;
  public  totalPages:any;
  /*权限*/
  public power:any=[];

  ngOnInit() {
    this.cameraService.userType();
    this.getSubDetail();
    this.getSubList('1');
    this.power=this.cameraService.getQx('1004');
  }

  /*查看用户客户列表*/
  getSubList(pageIndex){
    var timer='?m='+Date.parse(String(new Date()));

    const params = new HttpParams().set('pageIndex', pageIndex).set('pageIndex', pageIndex).set('pageSize', '10').set('customerType', this.cameraService.userDetial.customerType);
    this.subaccountHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
      if(req['code']=='200'){
        this.subList=req['data'];
        this.paramList=req['data'];
        this.page=req['pageing'].pageIndex;
        this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
      }
      else if(req['code']=='401'){
        window.localStorage.removeItem('smartContent');
        this.cameraService.isLoggedIn=false;
        alert('请重新登录');
        var url = '/login';
        let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
        this.router.navigate([url], navigationExtras);
      }
      else{ alert(req['message']) }
    });
  }

  public roleNameList:any;
  getSubDetail(){
    var timer='?m='+Date.parse(String(new Date()));

    const params = new HttpParams().set('customerId', this.cameraService.userDetial.customerId);
    this.subaccountHttp.get('/api/v1.0/customer/detail'+timer,{params}).subscribe(req => {
    this.roleNameList=req['data'];
      // console.log(this.roleNameList.roleNameArray)
    });
  }

  /*全选*/
  selectAll(ele){
    this.select=!this.select;
    this.obj=this.deleteData(this.obj,ele?'all':'clear');
    console.log(this.obj)
  };

  /*selectAll(){
    this.select=!this.select;
    this.obj=this.deleteData(this.obj,this.select?'all':'clear');
  };*/

  /*批量启用禁用*/
  batch(ele1,ele2){//ele1判断是否全选；ele2的值为禁用或启用
    var timer='?m='+Date.parse(String(new Date()));

    if(this.obj.length<=0){alert('请选择客户账号！');return; }

    if(ele2=='禁用'){
      var realy=confirm('进行锁定操作后，客户及其下级账户将无法再次通过网站/APP登录系统，解锁功能进行恢复，是否继续？');
      if(!realy){return;}
    }
    if(ele1){//全选状态
      for(var i=0;i<this.paramList.length;i++){
        this.paramList[i].statusCode=ele2;
      }
    }
    else{//非全选状态
      /*if(this.obj.length<=0){alert('请选择客户账号！');return; }
      else { for (var i=0;i<this.obj.length;i++){ this.obj[i].statusCode=ele2; } }*/
      for (var i=0;i<this.obj.length;i++){ this.obj[i].statusCode=ele2; }
    }
    const params = new HttpParams().set('customerList', JSON.stringify(this.obj)).set('statusCode', ele2);
    this.subaccountHttp
      .post('/api/v1.0/customers/update'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"&&ele2=='禁用'){ alert('批量锁定成功'); }
          else if(req['code']=="200"&&ele2=='正常'){ alert('批量解锁成功'); }
          else{ alert(req['message']); }
          this.getSubList(this.page);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        },
      );
    this.obj=[];
    this.select=false;
  }

  /*批量编辑*/
  batchEdit(ele1,form){//ele1:是否全选;ele2:
    var timer='?m='+Date.parse(String(new Date()));

    if(ele1){//全选状态
      for(var i=0;i<this.paramList.length;i++){
        this.paramList[i].roleIdArray= [JSON.parse(form.role)];
      }
    }
    else{//非全选状态
      if(this.obj.length<=0){alert('请选择客户账号！');return; }
      else { for (var i=0;i<this.obj.length;i++){ this.obj[i].roleIdArray=[JSON.parse(form.role)]; } }
    }
    const params = new HttpParams().set('customerList', JSON.stringify(this.obj));
    this.subaccountHttp
      .post('/api/v1.0/customers/update'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('批量编辑成功'); }
          else{ alert(req['message']); }
          this.getSubList(this.page);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        },
      );
    this.obj=[];
    this.select=false;
  }

  /*单个启用、禁用*/
  single(ele,edt1){//ele的值为禁用／启用；ele1:accoundID
    var timer='?m='+Date.parse(String(new Date()));

    if(ele=='禁用'){
      var realy=confirm('进行锁定操作后，该客户及其下级账户将无法再次通过网站/APP登录系统，解锁功能进行恢复，是否继续？');
      if(!realy){return;}
    }

    var params = new HttpParams().set('customerId', edt1).set('statusCode',ele);
    // console.log('单个禁用启用功能'+params);
    this.subaccountHttp
      .post('/api/v1.0/customer/update'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"&&ele=='禁用'){ alert('锁定成功');this.getSubList(this.page); }
          else if(req['code']=="200"&&ele=='正常'){ alert('解锁成功');this.getSubList(this.page); }
          else{ alert('操作失败'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message); */}
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )

  }

  /*重置密码*/
  resetPwd(id){
    var timer='?m='+Date.parse(String(new Date()));

    var realy=confirm('进行该操作后，子账户的登录密码将被恢复初始化状态，默认密码为子账户联系电话，是否继续？');
    if(realy) {
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('customerId', id);
      let params = urlSearchParams.toString();
      this.subaccountHttp
        .post('/api/v1.0/password/reset'+timer, params)
        .subscribe(
          req => {
            if (req['code'] == "200") {
              alert('子账户密码重置成功！默认密码为手机号');
            }
            else {
              alert(req['message'])
            }
          }
        );
    }
  }

  /*单个编辑*/
  singleEdit(form,id,resetPwd){//ele1:accoundID;ele2:customerLinkman;ele3:customerPhone;ele4:description;ele5:roleDict
    var timer='?m='+Date.parse(String(new Date()));

    if(form.role==''||form.role==null){ alert('请选择角色'); return }
    let urlSearchParams = new URLSearchParams();
    /*数据为空不传数据*/
 /*   urlSearchParams.append('customerId', id);
    if(form.linkman){ urlSearchParams.append('linkman', form.linkman); }
    if(this.cameraService.customerType=='C'){ urlSearchParams.append('roleNameArray', JSON.stringify([form.role])); }
    if(this.cameraService.customerType!=='C'){ urlSearchParams.append('roleIdArray', JSON.stringify([form.role])); }
    if(form.description){urlSearchParams.append('description', form.description); }*/

    /*数据为空传数据*/
    urlSearchParams.append('customerId', id);
    urlSearchParams.append('linkman', form.linkman);
    urlSearchParams.append('phone', form.phone);
    if(this.cameraService.customerType=='C'){ urlSearchParams.append('roleNameArray', JSON.stringify([form.role])); }
    if(this.cameraService.customerType!=='C'){ urlSearchParams.append('roleIdArray', JSON.stringify([form.role])); }
    urlSearchParams.append('description', form.description?form.description:'');


    let paramEdit = urlSearchParams.toString();
    this.subaccountHttp
      .post('/api/v1.0/customer/update'+timer,paramEdit)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('编辑成功');
            if(resetPwd){ this.resetPwd(id); }
            this.getSubList(this.page);
          }
          else{ alert('编辑失败'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )

  }

  /*添加账户*/
  addSub(form){//添加客户
    var timer='?m='+Date.parse(String(new Date()));

    if(!form.role){ alert('请选择角色'); return }
    if(form.passwd.length<6){ alert('密码长度不能少于6位'); return }
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('customerName', form.customerName);
    urlSearchParams.append('passwd', form.passwd);
    if(form.description){ urlSearchParams.append('description', form.description); }
    if(this.cameraService.customerType=='C'){ urlSearchParams.append('roleNameArray', JSON.stringify([form.role])); }
    if(this.cameraService.customerType!=='C'){ urlSearchParams.append('roleIdArray', JSON.stringify([form.role])); }
    urlSearchParams.append('linkman', form.linkman);
    urlSearchParams.append('phone', form.phone);
    let paramAdd = urlSearchParams.toString();
    this.subaccountHttp
      .post('/api/v1.0/customer/add'+timer,paramAdd)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('添加成功');this.getSubList(this.page)}
          else{ alert(req['message']); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )
  }

  /*提示*/
  alertObj(){
    if(this.obj.length<=0){alert('请选择客户账号！');return; }
    this.editBatch=!this.editBatch;this.mask=!this.mask;
  }

  /*导出数据*/
  exportData(){
    let url= 'http://camera.t2.5itianyuan.com/api/v1.0/customer/export?apiKey='+this.cameraService.userDetial.apiKey;
    let urlNew=url.replace(/`/g, "%60");
    window.location.href = urlNew;
  }

  /*模版下载*/
  exportDemo(ele){/*导出数据*/
    let url= 'http://camera.t2.5itianyuan.com/api/v1.0/template?apiKey='+this.cameraService.userDetial.apiKey+'&templateName='+ele;
    let urlNew=url.replace(/`/g, "%60");
    window.location.href = urlNew;
  }

  isChecked(ele,ele1){//单数据check
    if(ele){//check:true
      // var temp = { customerId: ele1};
      var temp = { customerId: ele1,sec:ele};
      this.obj.push(temp);
      // console.log(this.obj);
    }
    else {//check:false
   /*   if(this.obj[1]&&this.obj[1].accountId){ this.obj=[] }//清空全选
      else{ this.obj=this.deleteData(this.obj,ele1); }*/
      this.obj=this.deleteData(this.obj,ele1);
    }
    if(this.obj.length<=0){this.select=false;}
    console.log(this.obj)
  }

  /*删除数据*/
  deleteData(ele,id) {
    var newObj=[];
    if(id=='all'){ newObj=this.paramList; this.obj=[]; }
    else if(id=='clear'){this.obj=[]; }
    else{ for (var i = 0; i < ele.length; i++) { if (ele[i].customerId !== id) { newObj.push(ele[i]); } } }
    return newObj
  }

  /*导入数据*/
  public excel=false;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void { this.hasBaseDropZoneOver = e; }

  public fileOverAnother(e:any):void { this.hasAnotherDropZoneOver = e; }
  //初始化定义uploader变量,用来配置input中的uploader属性
  public uploader:FileUploader = new FileUploader({
    url: "/api/v1.0/customer/import",
    method: "post",
    removeAfterUpload:true,
    itemAlias: "excelFile",
    headers:[{name:'apiKey',value:this.cameraService.userDetial.apiKey},],
  });

  // 修改上传文件
  selectedFileOnChanged(event:any) {
    this.uploader.onAfterAddingFile= (item => {
      item.withCredentials = false
    });
    // 打印文件选择名称
    // console.log(event.target.value);
    this.uploadFile();
    this.excel=false;
    this.getSubList(this.page);
  }

  // 上传文件
  uploadFile() {
    this.uploader.queue[0].onSuccess = function (response, status) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        if(tempRes['code']=='200'){alert(tempRes['message']); }
        else{ alert('导入失败！'+tempRes['message']); }
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('上传失败！'+'服务异常请稍后');
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  // public currentStyles = { 'min-height': (window.screen.height)+'px',};
  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};

}




