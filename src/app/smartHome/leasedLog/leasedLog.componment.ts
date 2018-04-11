import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import { CameraService } from '../../services/camera.service';
import {Router, NavigationExtras } from '@angular/router';
import {URLSearchParams} from "@angular/http";
/*日期插件*/


@Component({
  selector: 'leasedLogSmart',
  templateUrl: './leasedLog.componment.html',
})


export class LeasedLogComponent {
  title = 'false';
  constructor(private LogHttp: HttpClient,public cameraService: CameraService,public router: Router) { }
  /*定义页面参数*/
  public startTime;
  public endTime;
  // public timer='?m='+Date.parse(String(new Date()));

  public logList:any;
  public page;
  public totalPages;
  public logPower:any=[];

  ngOnInit() {
    this.logPower=this.cameraService.getQx('1005');
    if(this.logPower.log){
      this.getLogList(1);
    }
  }
//select 下拉选择
  public optionList:any=[
    {name:'全部'},
    {name:'登录'},{name:'登出'},
    {name:'添加客户'},{name:'更新客户'},{name:'删除客户'},
    {name:'添加设备'},{name:'更新设备'},{name:'删除设备'},
    {name:'添加子账户'},{name:'更新子账户'},{name:'删除子账户'},
    {name:'添加角色'},{name:'更新角色'},{name:'删除角色'},
    {name:'添加分组'},{name:'更新分组'},{name:'删除分组'},
  ];
  public optionL:any='全部';
  public info:any='全部';

  getLogList(pageIndex){
    var timer='?m='+Date.parse(String(new Date()));

    const params = new HttpParams().set('pageIndex', pageIndex).set('pageSize', '10');
    this.LogHttp.post('/api/v1.0/log/list'+timer,params).subscribe(req => {
      if(req['code']=='200'){
        this.searchStatu=false;
        this.logList=req['data']=req['data'];
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
      else{  alert(req['message'])}
    });
  }

  public searchStatu:boolean;
  searchLogList(startTime,endTime,master,searchText,pageIndex){
    var timer='?m='+Date.parse(String(new Date()));

    var dayStart=Date.parse(startTime);
    var dayEnd=Date.parse(endTime)+57599000;
    if(dayEnd-dayStart>=604800000){alert('起止时间不能超过7天！');return;}
    if(!startTime&&!endTime&&!master){return}
    if(startTime>endTime){return}
    let urlSearchParams = new URLSearchParams();
    if(startTime){ urlSearchParams.append('startTime', String(dayStart)); }
    if(endTime){ urlSearchParams.append('endTime', String(dayEnd)); }
    if(master&&master!=='全部'){ urlSearchParams.append('type', master); }
    if(searchText){ urlSearchParams.append('searchText', searchText); }
    urlSearchParams.append('pageIndex', pageIndex);
    urlSearchParams.append('pageSize', '10');
    let params = urlSearchParams.toString();
    this.LogHttp.post('/api/v1.0/log/list'+timer,params).subscribe(req => {
      if(req['code']=='200'){
        if(req['data'].length>0){
          this.searchStatu=true;
          this.logList=req['data'];
          this.page=req['pageing'].pageIndex;
          this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
        }
        else{
          this.searchStatu=true;
          this.logList=req['data'];
          this.page=1;
          this.totalPages=1 ;
          alert('查询结果为空');
        }
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


  /*导出日志*/
  exportData(){
    let url= 'http://apis.5itianyuan.com/smarthome-camera/v1.0/log/export?apiKey='+this.cameraService.userDetial.apiKey;
    let urlNew=url.replace(/`/g, "%60");
    window.location.href = urlNew;
  }

  ch = {
    firstDayOfWeek: 0,
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  };

  dateString='yy-mm-dd';
  date=[{inputId:'data0',placeholder:"起始日期"},{inputId:'data1',placeholder:"结束日期"}];

  // public currentStyles = { 'min-height': (window.screen.height-120)+'px',};
  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};

}
