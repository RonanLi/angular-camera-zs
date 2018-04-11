import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { CameraService } from '../../services/camera.service';
import { deviceEdit,deviceActive } from '../../modules/allData';
/*导入*/
import {URLSearchParams} from "@angular/http";
import {Router, NavigationExtras } from '@angular/router';
import { FileUploader,FileUploadModule } from 'ng2-file-upload';
@Component({
  selector: 'deviceSmart',
  templateUrl: './device.componment.html',
})

export class DeviceComponent {
  title = 'false';
  constructor(private deviceHttp: HttpClient,public cameraService: CameraService,public router: Router,) { }
  /*定义页面参数*/
  // public img;
  public mask;
  public shareForm;
  public give;
  public edit;

  /*设备权限*/
  public power:any=[];
  /*类别*/
  public listUrl:any;  /*获取设备列表地址*/
  public exportUrl:any;/*导出设备地址*/
  public infoUrl:any;/*序列号查询设备地址*/
  public lockUrl:any;/*单个解锁／单个锁定地址*/
  public locksUrl:any;/*多个锁定／多个解锁地址*/
  public today;

  ngOnInit() {
    var ifIe=this.IEVersion();
    if(ifIe==-1){ this.ieVersion=false; } else{ this.ieVersion=true; }
    this.cameraService.userType();
    this.getGiveList();
    /*获取设备权限*/
    this.power=this.cameraService.getQx('1002');
    if(this.cameraService.customerType=='A'){
      this.listUrl='/api/v1.0/device/list';
      this.infoUrl='/api/v1.0/device/info';
      this.lockUrl='/api/v1.0/device/lock';
      this.locksUrl='/api/v1.0/devices/lock';
      this.exportUrl='/api/v1.0/device/export';
      this.cusType='运营公司';
    }
    else if(this.cameraService.customerType=='B'){
      this.listUrl='/api/v1.0/container/list';
      this.infoUrl='/api/v1.0/container/info';
      this.lockUrl='/api/v1.0/container/lock';
      this.locksUrl='/api/v1.0/containers/lock';
      this.exportUrl='/api/v1.0/container/export';
      this.cusType='租赁公司';
    }
    else if(this.cameraService.customerType=='C'){
      this.listUrl='/api/v1.0/container/list';
      this.infoUrl='/api/v1.0/container/info';
      this.lockUrl='/api/v1.0/container/lock';
      this.locksUrl='/api/v1.0/containers/lock';
      this.exportUrl='/api/v1.0/container/export';
      this.cusType='终端用户';
    }

    this.getDeviceList(1);
    this.getShareList();
    this.getACusList(1)

  }

  //select 下拉选择
  public optionList:any={
    data0:[{leasEnd:'租用到期时间',value:0},{leasEnd:'三天内',value:1}, {leasEnd:'七天内',value:2}, {leasEnd:'半月内',value:3}, {leasEnd:'已过期',value:4}, {leasEnd:'无',value:5}],
    data1:[{shareEnde:'分享到期时间',value:0},{shareEnde:'三天内',value:1}, {shareEnde:'七天内',value:2}, {shareEnde:'半月内',value:3}, {shareEnde:'已过期',value:4}, {shareEnde:'无',value:5}],
    data2:[{name:'设备状态',value:0}, {name:'正常',value:1}, {name:'锁定',value:2}, {name:'禁用',value:3}]
  };
  public optionList1:any={
    data0:[{leasEnd:'租用到期时间',value:0},{leasEnd:'三天内',value:1}, {leasEnd:'七天内',value:2}, {leasEnd:'半月内',value:3}, {leasEnd:'已过期',value:4}, {leasEnd:'无',value:5}],
    data1:[{shareEnde:'分享到期时间',value:0},{shareEnde:'三天内',value:1}, {shareEnde:'七天内',value:2}, {shareEnde:'半月内',value:3}, {shareEnde:'已过期',value:4}, {shareEnde:'无',value:5}],
    data2:[{name:'设备状态',value:0}, {name:'正常',value:1}, {name:'锁定',value:2}, {name:'禁用',value:3}]
  };
  // public optionL0:any=0;
  public optionL0:any='租用到期时间';
  // public optionL1:any=0;
  public optionL1:any='分享到期时间';
  // public optionL2:any=0;
  public optionL2:any='设备状态';

  //批量选中用户accoundId列表
  public checkList:any=[];
  //传值用
  public accountIdList:any=[];
  //是否全选
  public select=false;
  public editData=new deviceEdit();
  public acData=new deviceActive;

  //全部用户信息列表
  public deviceList:any;
  public paramList:any;
  //批量选中用户对象
  public obj:any = [];


  /*添加账户*/
  addDevice(form){//添加客户
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('customerName', form.customerName);
    urlSearchParams.append('passwd', form.passwd);
    urlSearchParams.append('customerLinkman', form.customerLinkman);
    urlSearchParams.append('customerPhone', form.customerPhone);
    urlSearchParams.append('description', form.description);
    urlSearchParams.append('customerType', form.customerType);
    if(form.childCompany){ urlSearchParams.append('childCompany', form.childCompany); }
    if(form.roleDict){ urlSearchParams.append('roleDict', form.roleDict); }
    let paramAdd = urlSearchParams.toString();
    this.deviceHttp.post('/api/v1.0/customer/signup',paramAdd)
     .subscribe(
     req => {
     if(req['code']=="200"){ alert('添加成功');}
     else{ alert('添加失败'); }
     },
     (err: HttpErrorResponse) => {
     if (err.error instanceof Error) {/* console.log( err.error.message); */}
     else { alert(`服务器异常，请稍后再试！`); }
     }
     )
  }

/*------------共用函数开始----------------*/
  public page:any;
  public totalPages:any;
  public totalNums:any;
  /*获取授权列表*/
  public cusType:any;
  public giveList:any;
  public giveBList:any;

  getGiveList(){
    var params = new HttpParams().set('customerType', this.cameraService.userDetial.customerType);
    var timer='?m='+Date.parse(String(new Date()))
    this.deviceHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
      if(req['code']=='200'){
        this.giveList=req['data'];
        var newList=[];
        for(var i=0;i<this.giveList.length;i++){
          if(this.giveList[i].statusCode!=='禁用'){
            newList.push(this.giveList[i])
          }
        }
        this.giveList=newList;
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

  /*获取分享列表*/
  public shareList:any;
  getShareList(){
    var params = new HttpParams().set('customerType',this.cusType);
    var timer='?m='+Date.parse(String(new Date()));
    this.deviceHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
      this.shareList=req['data'];
      var newList=[];
      for(var i=0;i<this.shareList.length;i++){
        if(this.shareList[i].statusCode!=='禁用'){
          newList.push(this.shareList[i])
        }
      }
      this.shareList=newList;
    });
  }

/*获取设备列表 this.listUrl */
  getDeviceList(pageIndex){/*查看用户设备列表*/
    this.today=Date.now();
    var params = new HttpParams().set('pageIndex',pageIndex).set('pageSize','10');
    var timer='?m='+Date.parse(String(new Date()));
    this.deviceHttp.get(this.listUrl+timer,{params}).subscribe(req => {
      if(req['data'].length>0){
        this.searchStatu=false;
        this.batchStatu=false;
        this.deviceList=req['data'];
        this.paramList=req['data'];
        this.page=req['pageing'].pageIndex;
        this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
        this.totalNums=req['pageing'].totalNums;
      }else{
        this.searchStatu=false;
        this.batchStatu=false;
        this.deviceList=req['data'];
        this.paramList=req['data'];
        this.page=1;
        this.totalPages=1;
        this.totalNums=0;
      }

    });
  }

/*查询 this.infoUrl*/
  public searchStatu:boolean;
  searchList(searchText,endTime1,endTime2,status,filterType,page){
    // var endT1=String(Date.parse(endTime1)+57599000);
    var endT1;
    let endT2=String(Date.parse(endTime2)+57599000);
    let urlSearchParams = new URLSearchParams();
    var timer='?m='+Date.parse(String(new Date()));
    if(searchText){ urlSearchParams.append('searchText', searchText); }
    if(endTime1){
      if(this.cameraService.customerType=='A'){endT1=String(Date.parse(endTime1)); urlSearchParams.append('startTime', endT1); }
      else if(this.cameraService.customerType=='B'){endT1=String(Date.parse(endTime1)); urlSearchParams.append('rentStartTime', endT1); }
      else{endT1=String(Date.parse(endTime1)+57599000); urlSearchParams.append('rentEndTime',endT1); }
    }
    if(endTime2){
      if(this.cameraService.customerType=='A'){ urlSearchParams.append('endTime', endT2); }
      else if(this.cameraService.customerType=='B'){ urlSearchParams.append('rentEndTime', endT2); }
      else{ urlSearchParams.append('shareEndTime', endT2); }
    }
    if(status=='正常'||status=='禁用'||status=='锁定'){ urlSearchParams.append('statusCode', status); }
    urlSearchParams.append('pageIndex', page);
    urlSearchParams.append('pageSize', '10');
    const params = new HttpParams({fromString: urlSearchParams.toString()});
    // console.log(params);
    this.deviceHttp.get(this.listUrl+timer,{params}).subscribe(req => {
      if(req['code']=="200"){
        this.batchStatu=false;
        this.searchStatu=true;
        this.deviceList=req['data'];
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
      else{alert('查询失败！')}
    });
  }

/*批量操作查询*/
  public batchStatu:boolean;
  public batchType:any;
  empowerList(filterType,page){
    this.batchType=filterType;
    var timer='?m='+Date.parse(String(new Date()));
    let urlSearchParams = new URLSearchParams();
    if(filterType){ urlSearchParams.append('filterType', filterType); }
    urlSearchParams.append('pageIndex', page);
    urlSearchParams.append('pageSize', '10');
    const params = new HttpParams({fromString: urlSearchParams.toString()});
    this.deviceHttp.get(this.listUrl+timer,{params}).subscribe(req => {
      if(req['data'].length>0) {
        this.searchStatu=false;
        this.batchStatu=true;
        this.deviceList = req['data'];
        this.paramList = req['data'];
        this.page = req['pageing'].pageIndex;
        this.totalPages = Math.ceil(req['pageing'].totalNums / 10);
        this.totalNums=req['pageing'].totalNums;
      }
      else{
        this.deviceList = req['data'];
        this.paramList = req['data'];
        this.page = 1;
        this.totalPages = 1;
        this.totalNums=0;
      }
    });
  }

/*可批量启禁用操作查询*/
  isEmpowerList(statusCode,page){
    this.batchType=statusCode;
    var timer='?m='+Date.parse(String(new Date()));
    let urlSearchParams = new URLSearchParams();
    if(statusCode=='正常'||statusCode=='锁定'){
      if(statusCode){ urlSearchParams.append('statusCode', statusCode); }
    }
    else{
      if(statusCode){ urlSearchParams.append('filterType', statusCode); }
    }
    // if(statusCode){ urlSearchParams.append('statusCode', statusCode); }
    urlSearchParams.append('pageIndex', page);
    urlSearchParams.append('pageSize', '10');
    const params = new HttpParams({fromString: urlSearchParams.toString()});
    this.deviceHttp.get(this.listUrl+timer,{params}).subscribe(req => {
      if(req['data'].length>0){
        this.searchStatu=false;
        this.batchStatu=true;
        this.deviceList=req['data'];
        this.paramList=req['data'];
        this.page=req['pageing'].pageIndex;
        this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
      }else{
        this.deviceList=req['data'];
        this.paramList=req['data'];
        this.page=1;
        this.totalPages=1;
        this.totalNums=0;
      }
    });
  }

/*批量启用禁用this.locksUrl*/
  batch(ele1,ele2){//ele1判断是否全选；ele2的值为禁用或启用或授权
    var timer='?m='+Date.parse(String(new Date()));
    if(this.obj.length<=0){alert('请选择设备！'); return; }
    if(ele2=='锁定'){
      var realy=confirm('进行该操作后，所有已经分享/授权给下级的设备，将被禁止使用，可以通过解锁功能进行恢复，是否继续？');
      if(!realy){return;}
    }
    if(ele1){//全选状态
      for(var i=0;i<this.paramList.length;i++){ this.paramList[i].statusCode=ele2; }
    }
    else{//非全选状态
      /*if(this.obj.length<=0){alert('请选择设备！'); return; }
      else { for (var i=0;i<this.obj.length;i++){ this.obj[i].statusCode=ele2; } }*/
      for (var i=0;i<this.obj.length;i++){ this.obj[i].statusCode=ele2; }
    }
    var params;
    if(this.cameraService.customerType=='A'){
      params = new HttpParams().set('deviceList',JSON.stringify(this.obj));
    }else{
      params = new HttpParams().set('containerList',JSON.stringify(this.obj));
    }
    this.deviceHttp
      .post(this.locksUrl+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"&&ele2=='锁定'){ this.obj=[]; alert('批量锁定成功'); this.select=false;   this.getDeviceList(this.page);}
          else if(req['code']=="200"&&ele2=='正常'){  this.obj=[];alert('批量解锁成功'); this.select=false;   this.getDeviceList(this.page);}
          else{ alert(req['message']); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {/* console.log( err.error.message); */}
          else { alert(`服务器异常，请稍后再试！`); }
        },
      )
  }

/*提示编辑*/
  alertEdit(){
    if(this.obj.length<=0){alert('请选择设备!'); return; }
    this.edit=!this.edit;
    this.mask=!this.mask
  }

/*提示授权*/
  alertGive(){

    if(this.obj.length<=0){alert('请选择设备!'); return; }
    this.give=!this.give;
    this.mask=!this.mask
  }

/*提示分享*/
  alertObj(){
    if(this.obj.length<=0){alert('请选择设备！');return; }
    this.shareForm=!this.shareForm;
    this.mask=!this.mask
  }

/*单个解锁；单个锁定 this.lockUrl */
  singleBatch(ele,edt1){//ele的值为禁用／启用；ele1:containerId
    var timer='?m='+Date.parse(String(new Date()));
    if(ele=='锁定'){
      var realy=confirm('进行该操作后，所有已经分享/授权给下级的设备，将被禁止使用，可以通过解锁功能进行恢复，是否继续？');
      if(!realy){return;}
    }
    var params ;
    if(this.cameraService.customerType=='A'){
      params = new HttpParams().set('deviceSn', edt1).set('statusCode',ele);
    }
    else{
       params = new HttpParams().set('containerId', edt1).set('statusCode',ele);
    }

    this.deviceHttp
      .post( this.lockUrl+timer,params,)
      .subscribe(
        req => {
          if(req['code']=="200"&&ele=='锁定'){ alert('锁定成功');this.getDeviceList(this.page); }
          else if(req['code']=="200"&&ele=='正常'){ alert('解锁成功');this.getDeviceList(this.page); }
          else{ alert(req['message']); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message); */}
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )

  }

/*设备导出 this.exportUrl */
  exportData(){/*导出数据*/
    let url= 'http://camera.5itianyuan.com'+this.exportUrl+'?apiKey='+this.cameraService.userDetial.apiKey;
    let urlNew=url.replace(/`/g, "%60");
    window.location.href = urlNew;
  }

/*模版下载*/
  exportDemo(ele){/*导出数据*/
    let url= 'http://camera.5itianyuan.com/api/v1.0/template?apiKey='+this.cameraService.userDetial.apiKey+'&templateName='+ele;
    let urlNew=url.replace(/`/g, "%60");
    window.location.href = urlNew;
  }

/*导出二维码*/
  exportER(id){
    let url= 'http://camera.5itianyuan.com/api/v1.0/export/qrcode?apiKey='+this.cameraService.userDetial.apiKey;
    let urlNew=url.replace(/`/g, "%60");
    window.location.href = urlNew;

  }

/*------------共用函数结束----------------*/

/*-------------A类函数开始----------------*/
  /*A取消授权:/device/recycle*/
  recycle(id){
    var realy=confirm('回收用于对故障设备进行召回处理，该操作将对所有已售出给下级的设备进行回收，并将同时删除已经授权/分享的给终端客户的设备，此操作不可恢复。是否继续');
    if(realy){
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('deviceSn', id);
      let params = urlSearchParams.toString();
      this.deviceHttp.post('/api/v1.0/device/recycle ',params)
        .subscribe(
          req => {if(req['code']=="200"){ alert('回收成功');this.getDeviceList(this.page);} else{ alert(req['message']);}}
        );
    }
  }

  /*设备激活*/
  // public deviceModeArr=[{name:'智能摄像头V20',value:'HUADI:VCW002',type:'v20'},{name:'智能摄像头V30',value:'www.ys7.com:DS-2DE2204IW-D3',type:'v30'},{name:'萤石云摄像机C2',value:'ys7:CS-C2',type:'c2'},{name:'萤石云摄像机C6',value:'ys7:CS-C6',type:'c6'}];
  public deviceModeArr=[{name:'智能摄像头V20',value:'HUADI:VCW002',type:'v20'},{name:'智能摄像头V30',value:'www.ys7.com:DS-2DE2204IW-D3',type:'v30'},{name:'萤石云摄像机C6',value:'ys7:CS-C6',type:'c6'}];
  public customerArr;
  public isNetArr=[{name:'联网激活',value:1},{name:'不联网激活',value:0}];
  public isYs;
  /*设备激活客户列表*/
  getACusList(pageIndex){
    var params=new HttpParams();
    var timer='?m='+Date.parse(String(new Date()));

    params = new HttpParams().set('pageIndex', pageIndex).set('pageSize', '50').set('customerType', this.cusType);
    this.deviceHttp.get('/api/v1.0/customer/list'+timer,{params}).subscribe(req => {
      if(req['code']=='200'){
        this.searchStatu=false;
        this.customerArr=req['data'];
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
  /*设备激活*/
  deviceToAc(form){
    let urlSearchParams = new URLSearchParams();
    if(form.deviceMode==''){alert('请选择设备型号');return;}
    if(form.customer==''){alert('请选择客户账号');return;}
    if(form.pwd.length<6){alert('密码长度至少为6位');return; }
    urlSearchParams.append('productName', form.deviceMode);
    urlSearchParams.append('customerName', form.customer);
    urlSearchParams.append('deviceSn', form.deviceSn);
    if(form.port){urlSearchParams.append('port', form.port); }
    if(form.user){urlSearchParams.append('user', form.user); }
    if(form.pwd){urlSearchParams.append('password', form.pwd); }
    if(form.code){urlSearchParams.append('validateCode', form.code); }
    if(form.isNet){urlSearchParams.append('isActive', 'true'); }
    if(!form.isNet){urlSearchParams.append('isActive', 'false'); }
    urlSearchParams.append('description', form.description)
    let params = urlSearchParams.toString();
    this.deviceHttp.post('/api/v1.0/device/add ',params)
      .subscribe(req => {
        if(req['code']=='200'){ alert('激活成功！'); }
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

/*-------------A类函数结束----------------*/

/*-------------B、C类函数开始-------------*/



/*单个分享: /container/shares*/
  toShares(form,id,lendTime){
    var timer='?m='+Date.parse(String(new Date()));
    if(!form.shareSTime){this.singleShareList=[];alert('分享时间不能为空！');return;}
    if(form.shareSTime>form.shareETime){this.singleShareList=[];alert('起始时间不能大于结束时间！');return;}
    if(this.today>(Date.parse(form.shareSTime)+57599000)){this.singleShareList=[];alert('起始时间不能小于当前时间！');return;}
    if(Date.parse(form.shareSTime)>lendTime){this.singleShareList=[];alert('分享起始时间不能大于设备授权/租赁时间！');return;}
    if(Date.parse(form.shareETime)>lendTime){this.singleShareList=[];alert('分享结束时间不能大于设备授权/租赁时间！');return;}
    if(this.singleShareList.length>0){
      for(var i=0;i<this.singleShareList.length;i++){
        this.singleShareList[i].startTime=Date.parse(form.shareSTime);
        this.singleShareList[i].endTime=Date.parse(form.shareETime)+57599000;
      }
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('containerId', id);
      urlSearchParams.append('customerList', JSON.stringify(this.singleShareList));
      let params=urlSearchParams.toString();
      this.deviceHttp.post('/api/v1.0/container/shares'+timer,params)
        .subscribe(
          req => {
            if(req['code']=="200"){ alert('操作成功');this.getDeviceList(this.page);} else{  alert(req['message']);

          }}
        );
      this.singleShareList=[];
    }else {this.singleShareList=[];alert('请选择分享账号!');return;}
    console.log( this.singleShareList)
  }

/*批量分享*/
  sharesTo(ele,form,Sele,Eele){//ele判断是否全选

    var timer='?m='+Date.parse(String(new Date()));
    if(!Sele){alert('起始时间不能为空!');return;}
    if(Sele>Eele){alert('起始时间不能大于结束时间!');return;}
    if(this.singleShareList.length<=0){alert('请选择分享账户!');return; }
    if(this.today>(Date.parse(Sele)+57599000)){alert('起始时间不能小于当前时间！');return;}
    // console.log(this.singleShareList);
    let containerList=[];

    let urlSearchParams = new URLSearchParams();
    if(ele){//全选状态
      for(var i=0;i<this.paramList.length;i++){
        // containerList.push({containerId:this.paramList[i].containerId,startTime:this.paramList[i].startTime,endTime:this.paramList[i].endTime});
        for(var j=0;j<this.singleShareList.length;j++){
          containerList.push({containerId:this.paramList[i].containerId,customerId:this.singleShareList[j].customerId,startTime:Date.parse(Sele),endTime:Date.parse(Eele)+57599000});
        }
      }
    }
    else{//非全选状态
      if(this.obj.length<=0){ alert('请选择设备！');return; }
      else {
        for (var i=0;i<this.obj.length;i++){
          for(var j=0;j<this.paramList.length;j++){
            if(this.obj[i].containerId==this.paramList[j].containerId){
              for(var t=0;t<this.singleShareList.length;t++){
                let tmp={containerId:this.paramList[j].containerId,customerId:this.singleShareList[t].customerId,startTime:Date.parse(Sele),endTime:Date.parse(Eele)+57599000};
                containerList.push(tmp);
                // console.log(this.singleShareList[t].customerId)
              }
            }
          }
        }
      }
    }
    urlSearchParams.append('containerList', JSON.stringify(containerList));
    let params=urlSearchParams.toString();
    console.log(params)
    this.deviceHttp
      .post('/api/v1.0/containers/shares'+timer,params, {headers: new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'})})
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('批量分享成功');this.empowerList('分享',this.page)}
          else{ alert(req['message']); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        },
      )
    this.obj=[];

  }

/*单个授权: /containers/share*/
  toGive(form,id,startTime,endTime){
    var timer='?m='+Date.parse(String(new Date()));
    if(!form.select||form.select=='1'){alert('请选择授权账户');return }
    if(!startTime&&this.cameraService.customerType=='B'){alert('起始时间不能为空！');return }
    if(this.today>(Date.parse(startTime)+57599000)){alert('起始时间不能小于当前时间！');return;}
    var tmp={containerId:id,startTime:Date.parse(startTime),endTime:Date.parse(endTime)+57599000};
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('customerId', form.select);
    urlSearchParams.append('containerList', JSON.stringify([tmp]));
    let params=urlSearchParams.toString();
    this.deviceHttp.post('/api/v1.0/containers/share'+timer,params)
      .subscribe(
        req => {if(req['code']=="200"){ alert('操作成功');this.getDeviceList(this.page);} else{ alert(req['message']);}}
      );
  }

/*批量授权*/
  toGives(ele,form,Sele,Eele){//ele1判断是否全选；ele2的值为禁用或启用或授权
    var containerList=[];
    var timer='?m='+Date.parse(String(new Date()));
    let urlSearchParams = new URLSearchParams();
    if(!form.select){alert('请选择授权子账户！');return;}
    if(this.cameraService.customerType!=='C'){
      if(!form.select||!Sele){ alert('请选择授权账户或起始时间！'); return; }
      if(Sele>Eele){ alert('起始时间不能大于结束时间！'); return; }
      if(this.today>(Date.parse(Sele)+57599000)){ alert('起始时间不能小于当前时间！'); return; }
      if(this.select){//全选状态
        for(var i=0;i<this.paramList.length;i++){
          // containerList.push({containerId:this.paramList[i].containerId,startTime:this.paramList[i].startTime,endTime:this.paramList[i].endTime});
          containerList.push({containerId:this.paramList[i].containerId,startTime:Date.parse(Sele),endTime:Date.parse(Eele)});
        }
      }
      else{//非全选状态
        if(this.obj.length<=0){alert('请选择设备!'); return; }
        else {
          for (var i=0;i<this.obj.length;i++){
            for(var j=0;j<this.paramList.length;j++){
              if(this.obj[i].containerId==this.paramList[j].containerId){
                let tmp={containerId:this.paramList[j].containerId,startTime:Date.parse(Sele),endTime:Date.parse(Eele)};
                containerList.push(tmp);
              }
            }
          }
        }
      }
    }
    else{//C类账户去掉时间
      if(this.select){//全选状态
        for(var i=0;i<this.paramList.length;i++){
          // containerList.push({containerId:this.paramList[i].containerId,startTime:this.paramList[i].startTime,endTime:this.paramList[i].endTime});
          containerList.push({containerId:this.paramList[i].containerId});
        }
      }
      else{//非全选状态
        if(this.obj.length<=0){alert('请选择设备!'); return; }
        else {
          for (var i=0;i<this.obj.length;i++){
            for(var j=0;j<this.paramList.length;j++){
              if(this.obj[i].containerId==this.paramList[j].containerId){
                let tmp={containerId:this.paramList[j].containerId};
                containerList.push(tmp);
              }
            }
          }
        }
      }
    }
    // console.log(containerList);
    urlSearchParams.append('customerId', form.select);
    urlSearchParams.append('containerList', JSON.stringify(containerList));
    let params=urlSearchParams.toString();
    this.deviceHttp.post('/api/v1.0/containers/share'+timer,params)
      .subscribe(
        req => {this.getDeviceList(this.page);if(req['code']=="200"){this.obj=[];this.select=false; this.getDeviceList(this.page);alert('全部操作成功');}else if(req['code']=="403"){ this.obj=[];alert('可授权设备操作成功');} else{ alert(req['message']);}}
      );
  }

/*删除单个分享或授权:/container/delete*/
  singleDelete(id){
    var timer='?m='+Date.parse(String(new Date()));

    var realy=confirm('进行该操作后，已经授权/分享给下级的设备，将被禁止使用，可以通过重新授权方式恢复使用，是否继续？');
    if(!realy){return;}
    const params = new HttpParams().set('containerId',id);
    this.deviceHttp.post('/api/v1.0/container/delete'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('移除成功');this.getDeviceList(this.page);}
          else{ alert(req['message']);}
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        },
      );
  }

/*批量取消授权:/containers/delete todo 尚未开始*/
  deletes(ele1){//ele1判断是否全选；
    var timer='?m='+Date.parse(String(new Date()));

    if(this.obj.length<=0){alert('请选择设备!'); return; }
    var realy=confirm('进行该操作后，所有已经授权给下级的设备，将被禁止使用，可以通过重新授权方式恢复使用，是否继续？');
    if(!realy){return;}
    var dels=[];
    if(ele1){//全选状态
      for(var i=0;i<this.paramList.length;i++){
        if(this.paramList[i].childrenList){
          dels.push(this.paramList[i].childrenList[0].containerId);
        }
      }
    }
    else{//非全选状态
      /*if(this.obj.length<=0){alert('请选择设备!'); return; }
      else {
        for (var i=0;i<this.obj.length;i++){
          for(var j=0;j<this.paramList.length;j++){
            if(this.obj[i].containerId==this.paramList[j].containerId&&this.paramList[j].childrenList){
              dels.push(this.paramList[j].childrenList[0].containerId);
            }
          }
        }
      }*/
      for (var i=0;i<this.obj.length;i++){
        for(var j=0;j<this.paramList.length;j++){
          if(this.obj[i].containerId==this.paramList[j].containerId&&this.paramList[j].childrenList){
            dels.push(this.paramList[j].childrenList[0].containerId);
          }
        }
      }
    }
    const params = new HttpParams().set('containerIdList',JSON.stringify(dels));
    this.deviceHttp
      .post('/api/v1.0/containers/delete'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"){this.getDeviceList(this.page); alert('批量取消授权成功'); }
          else{ alert('批量取消授权失败'); }
          this.select=false;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message); */}
          else { alert(`服务器异常，请稍后再试！`); }
        },
      );
  }

/*单个编辑:/container/update*/
  singleEdit(form,id,lendTime){ /*单个编辑*/
    var timer='?m='+Date.parse(String(new Date()));

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('containerId', id);
    if(Date.parse(form.startTime)>lendTime){alert('分享起始时间不能大于设备授权/租赁时间！');return;}
    if(Date.parse(form.endTime)>lendTime){alert('分享结束时间不能大于设备授权/租赁时间！');return;}

    if(!form.startTime&&this.cameraService.customerType=='C'){alert('请选择起始时间');return;}
    if(Date.parse(form.startTime)>(Date.parse(form.endTime)+57599000)){alert('开始时间不能大于结束时间！');return;}
    if(this.cameraService.customerType=='C'){ urlSearchParams.append('startTime', String(Date.parse(form.startTime)));}
    if(form.endTime){ urlSearchParams.append('endTime', String(Date.parse(form.endTime)+57599000)) }
    if(form.location){ urlSearchParams.append('location', form.location); }
    if(form.description){ urlSearchParams.append('description', form.description); }
    if(form.permissionType){ urlSearchParams.append('permissionType', form.permissionType); }
    if(form.statusCode){ urlSearchParams.append('statusCode', form.statusCode); }
    let paramEdit = urlSearchParams.toString();
    this.deviceHttp
      .post('/api/v1.0/container/lifetime'+timer,paramEdit,)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('编辑成功');this.getDeviceList(this.page)}
          else{ alert('编辑失败'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message); */}
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )
  }

/*B类单个编辑:/container/lifetime*/
  singleBEdit(form,id,startTime){ /*单个编辑*/
    var timer='?m='+Date.parse(String(new Date()));

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('containerId', id);
    urlSearchParams.append('startTime', startTime);
    if(form.endTime){ urlSearchParams.append('endTime', String(Date.parse(form.endTime))) }
    if(form.description){ urlSearchParams.append('description', form.description); }
    let paramEdit = urlSearchParams.toString();
    this.deviceHttp
      .post('/api/v1.0/container/lifetime'+timer,paramEdit,)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('编辑成功');this.getDeviceList(this.page)}
          else{ alert('编辑失败'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )
  }

/*C类编辑设备名称*/
  editDeviceName(form,id){
    var timer='?m='+Date.parse(String(new Date()));

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('containerId', id);
    urlSearchParams.append('containerName', form.containerName);
    let paramEdit = urlSearchParams.toString();
    this.deviceHttp
      .post('/api/v1.0/container/update'+timer,paramEdit,)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('编辑成功');this.getDeviceList(this.page)}
          else{ alert('编辑设备名称失败!'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )

  }

/*编辑安装位置*/
  locationEdit(form,sn){
    var timer='?m='+Date.parse(String(new Date()));

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('deviceSn', sn);
    urlSearchParams.append('location', form.location);
    let paramEdit = urlSearchParams.toString();
    this.deviceHttp
      .post('/api/v1.0/device/update'+timer,paramEdit,)
      .subscribe(
        req => {
          if(req['code']=="200"){ alert('编辑成功');this.getDeviceList(this.page)}
          else{ alert('编辑安装位置失败!'); }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) { /*console.log( err.error.message);*/ }
          else { alert(`服务器异常，请稍后再试！`); }
        }
      )

  }

/*批量编辑:/containers/update */
  toEdit(ele,form,Eele){//ele1判断是否全选；ele2的值为禁用或启用或授权
    var timer='?m='+Date.parse(String(new Date()));

    if(!Eele){ alert('请选择租用时间'); return; }
    var containerList=[];
    let urlSearchParams = new URLSearchParams();
    if(this.cameraService.customerType!=='B'){
      if(this.select){//全选状态
        for(var i=0;i<this.paramList.length;i++){
          containerList.push({containerId:this.paramList[i].containerId,endTime:Date.parse(Eele)});
        }
      }
      else{//非全选状态
        if(this.obj.length<=0){ alert('请选择设备！');return; }
        else {
          for (var i=0;i<this.obj.length;i++){
            for(var j=0;j<this.paramList.length;j++){
              if(this.obj[i].containerId==this.paramList[j].containerId){
                let tmp={containerId:this.paramList[j].containerId,endTime:Date.parse(Eele)};
                containerList.push(tmp);
              }
            }
          }
        }
      }
    }
    else{
      if(this.select){//全选状态
        for(var i=0;i<this.paramList.length;i++){
          containerList.push({containerId:this.paramList[i].childrenList[0].containerId,endTime:Date.parse(Eele)});
        }
      }
      else{//非全选状态
        if(this.obj.length<=0){ alert('请选择设备！');return; }
        else {
          for (var i=0;i<this.obj.length;i++){
            for(var j=0;j<this.paramList.length;j++){
              if(this.obj[i].containerId==this.paramList[j].containerId){
                let tmp={containerId:this.paramList[j].childrenList[0].containerId,endTime:Date.parse(Eele)};
                containerList.push(tmp);
              }
            }
          }
        }
      }
    }
    urlSearchParams.append('containerList', JSON.stringify(containerList));
    let params=urlSearchParams.toString();
    this.deviceHttp.post('/api/v1.0/containers/update'+timer,params)
      .subscribe(
        req => {this.getDeviceList(this.page);if(req['code']=="200"){this.obj=[]; alert('全部操作成功');}else if(req['code']=="403"){ this.obj=[];alert('可授权设备操作成功');} else{ alert(req['message']);}}
      );
  }

/*-------------B、C类函数结束-------------*/

  /*全选*/
  selectAll(){
    this.select=!this.select;
    this.obj=this.deleteData(this.obj,this.select?'all':'clear');
  };

  /*选中或移除数据*/
  isChecked(ele,ele1){
    if(ele){
      var temp;

      if(this.cameraService.customerType=='A'){
        temp = { deviceSn: ele1}
      }
      else{
        temp = { containerId: ele1}
      }
      this.obj.push(temp);
    }
    else {
      if(this.obj[1]&&this.obj[1].deviceSn){ this.obj=[] }
      else{ this.obj=this.deleteData(this.obj,ele1); }
    }
  }

  /*取全部数据appId*/

  allId(){
    var newArr=[];
    for(var i=0;i<this.paramList.length;i++){ newArr.push(this.paramList[i].containerId); }
    return newArr;
  }

  /*删除数据*/
  deleteData(ele,id) {
    var newObj=[];
    if(id=='all'){
      this.obj=[];
      newObj=this.paramList;
    }
    else if(id=='clear'){this.obj=[]; }
    else{
      if(this.cameraService.customerType=='A'){
        this.obj=[];
        for (var i = 0; i < ele.length; i++) { if (ele[i].deviceSn!== id) { newObj.push(ele[i]); } }
      }
      else{
        this.obj=[];
        for (var i = 0; i < ele.length; i++) { if (ele[i].containerId !== id) { newObj.push(ele[i]); } }
      }
    }
    return newObj
  }

  /*日期*/
  ch = {
    firstDayOfWeek: 0,
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  };

  /*分享选择和移除*/
  public singleShareList=[];
  isCheckedShare(ele,id){
    var temp={customerId:id};
    if(ele){
      this.singleShareList.push(temp);
    }else{
      this.singleShareList=this.removeShare(this.singleShareList,id);
    }
    // console.log(this.singleShareList)
  }

  removeShare(ele,id){
    var newObj=[];
    for (var i = 0; i < ele.length; i++) { if (ele[i].customerId !== id) { newObj.push(ele[i]); } }
    return newObj
  }



  /*二维码转译函数*/
  public img;
  erImg(id){
    var imgData;
    var params = new HttpParams().set('containerId', id);
    this.deviceHttp.get('/api/v1.0/container/link',{params})
      .subscribe(
        req => {if(req['code']=="200"){
          this.img='http://qr.liantu.com/api.php?text='+req['data'].replace(/&/g, "%26");
        }
        else{
          alert(req['message']);}
        }
      );
    return this.img
  }

/*设备导入:/device/import*/
  public excel=false;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  public fileOverBase(e:any):void { this.hasBaseDropZoneOver = e; }
  public fileOverAnother(e:any):void { this.hasAnotherDropZoneOver = e; }
  //初始化定义uploader变量,用来配置input中的uploader属性
  public uploader:FileUploader = new FileUploader({
    url: "/api/v1.0/device/import",
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
    this.getDeviceList(this.page);
  }
  // 上传文件
  uploadFile() {
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        // console.log(tempRes['code']);
        if(tempRes['code']=='200'){alert(tempRes['message']); }
        else{ alert('导入失败！'+tempRes['message']); }
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('上传失败！'+'服务异常请稍后');
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }
  /*高度*/
  // public currentStyles = { 'min-height': (window.screen.height)+'px',};
  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};

  /*BC类时间传值*/
  timeTo(ele){ this.editData.endTime=new Date(parseInt(ele)).toJSON().substr(0,10) }
  timeToS(ele){ this.editData.startTime=new Date(parseInt(ele)).toJSON().substr(0,10) }

  /*判断是否为IE浏览器*/
  public ieVersion;
  IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if(fIEVersion == 7) {
        return 7;
      } else if(fIEVersion == 8) {
        return 8;
      } else if(fIEVersion == 9) {
        return 9;
      } else if(fIEVersion == 10) {
        return 10;
      } else {
        return 6;//IE版本<=7
      }
    } else if(isEdge) {
      return 'edge';//edge
    } else if(isIE11) {
      return 11; //IE11
    }else{
      return -1;//不是ie浏览器
    }
  }
  /*传递IE视频参数*/
  toIEdata(ele){
    var mm={
      AccessToken: "at.4r97u6wa5o7sd9s56fwt23ly4nx34uhe-3noy68395c-1ysy25l-uoxfk8af3",
      Appkey: "bb5e2766e054431d9e352eee91e55fd3",
      Url: "ezopen://open.ys7.com/181788973/1.live",
    };
    // window.localStorage.setItem('IEdata', JSON.stringify(ele));
    window.localStorage.setItem('IEdata', JSON.stringify(mm));

  }

}
