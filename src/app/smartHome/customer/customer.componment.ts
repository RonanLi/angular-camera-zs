import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { CameraService } from '../../services/camera.service';
import { customerEdit,customerAdd} from '../../modules/allData';
/*导入*/
import {URLSearchParams} from "@angular/http";
import {Router, NavigationExtras } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'customerSmart',
  templateUrl: './customer.componment.html',
})

export class CustomerComponent {
  constructor(public customertHttp: HttpClient,public cameraService: CameraService,public router: Router) { }
  /*定义页面参数*/
  public add;
  public nameType:boolean;
  public addBind;
  public mask;
  public isPhone;
  // public timer='?m='+Date.parse(String(new Date()));

  //全部用户信息列表
  public customerList:any;
  public paramList:any;

  //select 下拉选择
  public optionList:any=[{name:'请选择用户状态'}, {name:'正常'}, {name:'禁用'},];
  public optionL:any='请选择用户状态';
  public info:any='请选择用户状态';

  //是否全选
  public select=false;
  public editData=new customerEdit;
  public addData=new customerAdd;
  //批量选中用户对象
  public obj:any = [];
  /*页码*/
  public  page:any;
  public  totalPages:any;
  public  totalNums:any;
  /*权限*/
  public power:any=[];
  public cusType:any;
/*D类客户类型*/
  public grad=1001
  ngOnInit() {
    this.cameraService.userType();
    if(this.cameraService.customerType=='A'){ this.cusType='运营公司'; }
    else if(this.cameraService.customerType=='B'){ this.cusType='租赁公司'; }
    else if(this.cameraService.customerType=='C'){ this.cusType='终端用户'; }
    this.getCustomerList('1');
    this.power=this.cameraService.getQx('1001');
  }

  /*查看用户客户列表*/
  getCustomerList(pageIndex){
    var params=new HttpParams();
    var timer='?m='+Date.parse(String(new Date()));

    params = new HttpParams().set('pageIndex', pageIndex).set('pageSize', '10').set('customerType', this.cusType);
    this.customertHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
      if(req['code']=='200'){
        this.searchStatu=false;
        this.customerList=req['data'];
        this.paramList=req['data'];
        this.page=req['pageing'].pageIndex;
        this.totalNums=req['pageing'].totalNums;
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
      else{  alert(req['message'])}
    });
  }

  /*查询*/
  public searchStatu:boolean;
  searchList(searchText,status,pageIndex){
    var timer='?m='+Date.parse(String(new Date()));

    let params=new HttpParams();
    if(status!=='请选择用户状态'){
      if(searchText){
        params=new HttpParams().set('searchText', searchText)
          .set('statusCode', status)
          .set('pageIndex', pageIndex)
          .set('pageSize', '10').set('customerType', this.cusType);
      }
      else{
        params=new HttpParams()
          .set('statusCode', status)
          .set('pageIndex', pageIndex)
          .set('pageSize', '10').set('customerType', this.cusType);
      }
       this.customertHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
         if(req['code']=="200"){
           this.searchStatu=true;
           this.customerList=req['data'];
           this.paramList=req['data'];
           if(req['data'].length>0){
             this.page=req['pageing'].pageIndex;
             this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
             this.totalNums=req['pageing'].totalNums;
           }else{
             this.page=1;
             this.totalPages=1 ;
             this.totalNums=0;
           }
         }
       });
    }
    else{
      if(searchText){
        params=new HttpParams().set('searchText', searchText)
          .set('pageIndex', pageIndex)
          .set('pageSize', '10').set('customerType', this.cusType);
         this.customertHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
           if(req['code']=="200"){
             this.searchStatu=true;
             this.customerList=req['data'];
             this.paramList=req['data'];
             if(req['data'].length>0){
               this.page=req['pageing'].pageIndex;
               this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
               this.totalNums=req['pageing'].totalNums;
             }else{
               this.page=1;
               this.totalPages=1 ;
               this.totalNums=0;
             }
           }
         });
      }
      else{ this.getCustomerList(this.page) }
    }
  }

  /*全选*/
  selectAll(){
    this.select=!this.select;
    this.obj=this.deleteData(this.obj,this.select?'all':'clear');
  };

  /*批量启用禁用*/
  batch(ele1,ele2){//ele1判断是否全选；ele2的值为禁用或启用
    if(this.obj.length<=0){alert('请选择账户!');return; }

    if(ele2=='禁用'){
      var realy=confirm('进行锁定操作后，该客户及其下级账户将无法再次通过网站/APP登录系统，解锁功能进行恢复，是否继续？');
      if(!realy){return;}
    }
    if(ele1){//全选状态
      for(var i=0;i<this.paramList.length;i++){
        this.paramList[i].statusCode=ele2;
      }
    }
    else{//非全选状态
      /*if(this.obj.length<=0){alert('请选择账户!');return; }
      else { for (var i=0;i<this.obj.length;i++){ this.obj[i].statusCode=ele2; } }*/
      for (var i=0;i<this.obj.length;i++){ this.obj[i].statusCode=ele2; }
    }
    const params = new HttpParams().set('customerList', JSON.stringify(this.obj)).set('statusCode', ele2);

    this.customertHttp
      .post('/api/v1.0/customers/update',params)
      .subscribe(
        req => {
          if(req['code']=="200"&&ele2=='禁用'){ alert('批量锁定成功'); }
          else if(req['code']=="200"&&ele2=='正常'){ alert('批量解锁成功'); }
          this.getCustomerList(this.page);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {/* console.log( err.error.message); */}
          else { alert(`服务器异常，请稍后再试！`); }
        },
      );
    this.obj=[];
    this.select=false;
  }

  /*单个启用、禁用*/
  single(ele,edt1){//ele的值为禁用／启用；ele1:accoundID
    if(ele=='禁用'){
      var realy=confirm('进行锁定操作后，该客户及其下级账户将无法再次通过网站/APP登录系统，解锁功能进行恢复，是否继续？');
      if(!realy){return;}
    }
    var params = new HttpParams().set('customerId', edt1).set('statusCode',ele);
    this.customertHttp
      .post('/api/v1.0/customer/update',params)
      .subscribe(
        req => {
          if(req['code']=="200"&&ele=='禁用'){ alert('锁定成功');this.getCustomerList(this.page); }
          else if(req['code']=="200"&&ele=='正常'){ alert('解锁成功');this.getCustomerList(this.page); }
          else{ alert('操作失败'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {}
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )

  }

  /*单个编辑*/
  singleEdit(form,id){//ele1:accoundID;ele2:customerLinkman;ele3:customerPhone;ele4:description;ele5:roleDict
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('customerId', id);
    /*当数据为空时不传数据*/
    // if(this.cameraService.customerType=='C'){urlSearchParams.append('roleIdArray', '['+this.grad+']');}
    // if(form.linkman){ urlSearchParams.append('linkman', form.linkman); }
    // if(form.phone){ urlSearchParams.append('phone', form.phone); }
    // else if(this.cameraService.customerType=='C' && form.phone){ urlSearchParams.append('contactNumber', form.phone); }
    // if(this.cameraService.customerType!=='C' && form.phone){ urlSearchParams.append('phone',form.phone); }
    // if(form.description){urlSearchParams.append('description', form.description); }

    /*当数据为空时传递数据*/
    urlSearchParams.append('linkman', form.linkman?form.linkman:'');
    if(this.cameraService.customerType=='C'){
      urlSearchParams.append('roleIdArray', '['+this.grad+']');
      urlSearchParams.append('contactNumber', form.phone?form.phone:'');
    }
    else {urlSearchParams.append('phone',form.phone?form.phone:''); }
    urlSearchParams.append('description', form.description?form.description:'');
    let paramEdit = urlSearchParams.toString();
    this.customertHttp
    .post('/api/v1.0/customer/update',paramEdit)
    .subscribe(
     req => {
       if(req['code']=="200"){ alert('编辑成功');this.getCustomerList(this.page);}
       else{ alert('编辑失败'); }
     },
     (err: HttpErrorResponse) => {
     if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
     else { alert(`服务器异常，请稍后再试！`); }
     }
    )
  }

  /*重置密码*/
  resetPwd(id){
    var realy=confirm('进行该操作后，客户的登录密码将被恢复初始化状态，默认密码为客户预留的手机号，是否继续？');
    if(realy){
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('customerId',id);
      let params=urlSearchParams.toString();
      this.customertHttp
        .post('/api/v1.0/password/reset',params)
        .subscribe(
          req => {
            if(req['code']=="200"){ alert('密码重置成功！默认密码为手机号'); }
            else {alert(req['message'])}
          }
        );
    }
  }

  /*添加账户*/
  addCustomer(form){
    var url='/api/v1.0/customer/add';
    let urlSearchParams = new URLSearchParams();
    if(!form.customerName){alert('公司名称不能为空');return;}
    if(!form.passwd){alert('账号密码');return;}
    urlSearchParams.append('customerName', form.customerName);
    urlSearchParams.append('passwd', form.passwd);
    if(this.cameraService.customerType=='A'){ urlSearchParams.append('roleIdArray', '[1003]'); }
    else if(this.cameraService.customerType=='B'){ urlSearchParams.append('roleIdArray', '[1004]'); }
    urlSearchParams.append('linkman', form.linkman);
    // urlSearchParams.append('phone', form.phone);
    if(form.phone){
      var real=this.isPoneAvailable(form.phone);
      if(real){urlSearchParams.append('phone', form.phone);}
      else{alert('请输入有效的联系电话！');return;}
    }
    if(form.description){ urlSearchParams.append('description', form.description); }
    let paramAdd = urlSearchParams.toString();
    this.customertHttp .post(url,paramAdd) .subscribe(
      req => {
        if(req['code']=="200"){ alert('添加成功');this.getCustomerList(this.page)}
        else{ alert(req['message']); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    )
  }

  /*绑定账户*/
  bindCustomer(form){
    var url = '/api/v1.0/customer/binding';
    let urlSearchParams = new URLSearchParams();
    var regPhone=this.isPoneAvailable(form.customerName);
    if(!regPhone){ alert('客户账号无效！');return ; }
    urlSearchParams.append('roleIdArray', '['+this.grad+']');
    urlSearchParams.append('customerName', form.customerName);
    urlSearchParams.append('linkman', form.linkman);
    if(form.phone){
      var real=this.isPoneAvailable(form.phone);
      if(real){urlSearchParams.append('phone', form.phone);}
      else{alert('请输入有效的联系电话！');return;}
    }
    if(form.description){ urlSearchParams.append('description', form.description); }
    let paramAdd = urlSearchParams.toString();
    this.customertHttp .post(url,paramAdd) .subscribe(
      req => {
        if(req['code']=="200"){ alert('绑定成功');this.getCustomerList(this.page)}
        else{ alert(req['message']); }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {  }
        else { alert(`服务器异常，请稍后再试！`); }
      }
    )
  }

  /*C删除客户*/
  customerDel(id){
    var realy=confirm('删除客户时，将同时删除已经分享给该用户的所有设备，是否继续？');
    if(!realy){return;}
    const params = new HttpParams().set('customerId',id);
    this.customertHttp.delete('/api/v1.0/customer/delete',{params})
      .subscribe(
        req => {
          if(req['code']=="200"){
            this.getCustomerList(this.page);
            alert('删除客户成功');
          }
          else if(req['code']=="401"){
            window.localStorage.removeItem('smartContent');
            this.cameraService.isLoggedIn=false;
            alert('请重新登录');
            var url = '/login';
            let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: false};
            this.router.navigate([url], navigationExtras);
          }
          else{ alert(req['message']);}}
      );
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

  isChecked(ele,ele1){
    if(ele){
      var temp = { customerId: ele1};
      this.obj.push(temp);
      // console.log(this.obj);
    }
    else {
      if(this.obj[1]&&this.obj[1].accountId){ this.obj=[] }
      else{ this.obj=this.deleteData(this.obj,ele1); }
      // console.log(this.obj)

    }
  }
  /*删除数据*/
  deleteData(ele,id) {
    var newObj=[];
    if(id=='all'){ newObj=this.paramList; this.obj=[]; }
    else if(id=='clear'){this.obj=[]; }
    else{ for (var i = 0; i < ele.length; i++) { if (ele[i].customerId !== id) { newObj.push(ele[i]); } } }
    // console.log(newObj);
    return newObj
  }

  /*手机号码校验*/
  isPoneAvailable(ele){
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(!myreg.test(ele)) { return false; }
    else {return true; }
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
    headers:[{name:'apiKey',value:this.cameraService.apiKey},],
    // withCredentials: true,
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
    this.getCustomerList(this.page);
  }
  // 上传文件
  uploadFile() {
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      if (status == 200) {
        let tempRes = JSON.parse(response);
        if(tempRes['code']=='200'){alert(tempRes['message']); }
        else{ alert('导入失败！'+tempRes['message']); }
      } else {
        alert('上传失败！'+'服务异常请稍后');
      }
    };
    this.uploader.queue[0].upload();
  }

  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};


}




