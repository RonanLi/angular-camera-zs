import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse,HttpParams,HttpHeaders} from '@angular/common/http';
import {groupAdd,groupEdit} from '../../modules/allData'
import {Router, NavigationExtras } from '@angular/router';
import {URLSearchParams} from "@angular/http";
import {CameraService} from "../../services/camera.service";

@Component({
  selector: 'group',
  templateUrl: './groupC.componment.html',

})


export class GroupCComponent {
  constructor(private groupHttp: HttpClient,public router: Router,public cameraService: CameraService) { }
  public listDiv:string='';
  public listUp:any;
  public listDown:any;
  public power:any;
  ngOnInit() {
    this.power=this.cameraService.getQx('1006');
    this.getList(1);
    this.getDeviceList();
  }
  /*定义参数*/
  private name;
  public show;
  public addgroup;
  public mask;
  public groupStorage;
  public groupDetial;
  public apiKey;

  //select 下拉选择
  public optionList:any=[{name:'全部'}, {name:'四宫格'}, {name:'九宫格'},{name:'十六宫格'}];
  public optionL:any='全部';
  public info:any='全部';

  public addData=new groupAdd;
  public editData=new groupEdit;

  public grad=4;
/*list1是可选设备列表，编辑选中设备用自传列表，添加分组选中设备用deviceListCheck*/
/*未选择设备列表*/
  public diveceList:any=[];
/*已选择设备列表 添加使用*/

  public deviceListCheck:any=[
    {
      value:[],
      page:1,
    },
  ];
/*单组编辑缓存列表  编辑使用*/
  public onGroupList=[];

/*获取设备列表*/
  public groupList:any;
  public pageIndex:any;
  public totalPages:any;
  public totalNums:any
  public searchStatu:boolean;
  /*获取分组列表*/
  getList(pageIndex){
    var timer='?m='+Date.parse(String(new Date()));

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('pageIndex', pageIndex);
    urlSearchParams.append('pageSize', '10');
    let params=urlSearchParams.toString();
    this.groupHttp.post('/api/v1.0/groups/list'+timer,params)
    // this.groupHttp.post('/api/v1.0/groups/list'+timer,params,{headers: new HttpHeaders({'apiKey': this.apiKey})})
      .subscribe(
        req => {
          if(req['code']=="200"){
            this.searchStatu=false;
            this.groupList=req['data'];
            this.pageIndex=req['pageing'].pageIndex;
            this.totalNums=req['pageing'].totalNums;
            this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
          }
          else if(req['code']=="401"){
            window.localStorage.removeItem('smartGroup');
            alert('请重新登录');
            let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
            let redirect ='/groupLogin';
            this.router.navigate([redirect], navigationExtras);
          }
          else{ alert(req['message']);}}
      );
  }

  /*添加选择设备*/
  public page=1;//当前第几屏
  public none=-1;//虚假设备containerId值

  /*获取设备可选列表*/
  public deviceList:any=[];
  getDeviceList(){
    var timer='?m='+Date.parse(String(new Date()));
    this.groupHttp.get('/api/v1.0/container/group'+timer).subscribe(req => {
      this.deviceList=req['data'];
    });
  }

  /*编辑筛选设备列表*/
  filterDeviceList(){
    var timer='?m='+Date.parse(String(new Date()));
    this.groupHttp.get('/api/v1.0/container/group'+timer).subscribe(req => {
      this.deviceList=req['data'];
    });
  }

  /*分组列表查询*/
  searchList(key,info,pageIndex){
    var timer='?m='+Date.parse(String(new Date()));

    let urlSearchParams = new URLSearchParams();
    if(info!=='全部'){ urlSearchParams.append('displayMode', info); }
    if(key){ urlSearchParams.append('groupName', key); }
    urlSearchParams.append('pageIndex', pageIndex);
    urlSearchParams.append('pageSize', '10');
    let params=urlSearchParams.toString();
    this.groupHttp.post('/api/v1.0/groups/list'+timer,params).subscribe(req => {
      if(req['code']=="200"){
        this.searchStatu=true;
        this.groupList=req['data'];
        if(req['data']&&req['data'].length>0){
          this.pageIndex=req['pageing'].pageIndex;
          this.totalNums=req['pageing'].totalNums;
          this.totalPages=Math.ceil(req['pageing'].totalNums/10) ;
        }
        else {
          this.pageIndex=1;
          this.totalNums=0;
          this.totalPages=1;
        }
      }
      else if(req['code']=="401"){
        window.localStorage.removeItem('smartGroup');
        alert('请重新登录');
        let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
        let redirect ='/groupLogin';
        this.router.navigate([redirect], navigationExtras);
      }
      else{ alert(req['message']);}
    });
  }

  /*设备名称模糊查询*/
  searchDeviceList(name){
    var timer='?m='+Date.parse(String(new Date()));
    var search=name.replace(/\s+/g,'');
    if(search.length>0){
      var params=new HttpParams();
      params = new HttpParams().set('containerName' , search);
      this.groupHttp.get('/api/v1.0/container/group'+timer,{params})
        .subscribe(req => {
        this.deviceList=req['data'];
      });
    }
    else{
      this.getDeviceList();
    }

  }

  /*添加选中设备*/
  addDevice(ele,page,ele2,eleList){//containerId,第几屏,宫格方式,选中列表；
    var obj=[];
    if(eleList[page-1]){
      var allValue=eleList[page-1].value;//取出当前屏的全部value
      var isNull=9999;//如果存在空设备isNull为i，否则为9999
      if(allValue.length==0){isNull=9999}
      for(var i=0;i<allValue.length;i++){ if (allValue[i].containerId==0){isNull=i;break;} }
      if(isNull==9999&&eleList[page-1].value.length<ele2){//不存在空设备,且长度小于ele2
        if(ele>0){//添加真实设备
          for(var g=0;g<this.deviceList.length;g++){
             if(this.deviceList[g].containerId==ele){
               eleList[page-1].value.push(this.deviceList[g]);//选中列表添加设备
               this.deviceList= this.deleteData(this.deviceList,ele);//设备列表删除设备
             }
          }
        }
        else{//添加虚拟占位设备
          eleList[page-1].value.push({containerName:'虚拟占位设备',containerId:ele,location:''});
        }
      }
      else if(isNull!==9999&&eleList[page-1].value.length<ele2){//存在空设备,且长度小于ele2
        if(ele>0){//添加真实设备
          for(var j=0;j<this.deviceList.length;j++){
            if(this.deviceList[j].containerId==ele){
              eleList[page-1].value[isNull].containerId=ele;//刷新containerId
              eleList[page-1].value[isNull].containerName=this.deviceList[j].containerName;//刷新containerName
              eleList[page-1].value[isNull].location=this.deviceList[j].location;//刷新location
              this.deviceList= this.deleteData(this.deviceList,ele);//设备列表删除设备
            }
          }
        }
        else{//添加虚拟占位设备
          eleList[page-1].value.push({containerName:'虚拟占位设备',containerId:ele,location:''});
        }
      }
      else if(isNull!==9999&&eleList[page-1].value.length>=ele2){//存在空设备,且长度大于等于ele2
        if(ele>0){//添加真实设备
          for(var j=0;j<this.deviceList.length;j++){
            if(this.deviceList[j].containerId==ele){
              eleList[page-1].value[isNull].containerId=ele;//刷新containerId
              eleList[page-1].value[isNull].containerName=this.deviceList[j].containerName;//刷新containerName
              eleList[page-1].value[isNull].location=this.deviceList[j].location;//刷新location
              this.deviceList= this.deleteData(this.deviceList,ele);//设备列表删除设备
            }
          }
        }
        else{//添加虚拟占位设备
          alert('已达当前页面数量上限!');
        }
      }
      else if(isNull==9999&&eleList[page-1].value.length>=ele2){//不存在空设备,且长度大于等于ele2
        alert('已达当前页面数量上限!');
      }
    }
  }

  /*删除选择设备*/
  delDevice(page,ele,eleList){//第几屏,containerId,选中列表
    var obj=[];
    // console.log('删除第'+page+'页，value为'+ele);
    for(var i=0;i<eleList.length;i++){
      if(eleList[i].page==page){
        if(ele>50){//删除正常设备
          for(var j=0;j<eleList[i].value.length;j++){
            if(eleList[i].value[j].containerId==ele){ //如果id匹配 置空操作
              var temp={containerId:eleList[i].value[j].containerId,containerName:eleList[i].value[j].containerName,location:eleList[i].value[j].location}
              this.deviceList.push(temp);
              eleList[i].value[j].containerId=0;
              eleList[i].value[j].containerName='空设备';
              eleList[i].value[j].location='';
            }
          }
        }
       /* if(ele>=0&&ele<50){//删除空设备
          var newObj=[];
          var index=ele-20;
          for (var n = 0; n < eleList[i].value.length; n++) { if (n!==index) { newObj.push(eleList[i].value[n]); } }
          eleList[i].value= newObj;
        }
        else if(ele<0&&ele>-1000){//删除虚假虚拟设备
          eleList[i].value=this.deleteData(eleList[i].value,ele);
        }
        else{//删除真实虚拟设备
          var realFalse=[];
          var indexF=ele+1000;
          for (var p = 0; p < eleList[i].value.length; p++) { if (p!==indexF) { realFalse.push(eleList[i].value[p]); } }
          eleList[i].value= realFalse;
        }*/
        if(ele>=0&&ele<50){//删除空设备
          var newObj=[];
          var index=ele-20;
          for (var n = 0; n < eleList[i].value.length; n++) { if (n!==index) { newObj.push(eleList[i].value[n]); } }
          eleList[i].value= newObj;
        }
        else if(ele<0){//删除虚假虚拟设备
          var realFalse=[];
          var indexF=ele+1000;
          for (var p = 0; p < eleList[i].value.length; p++) { if (p!==indexF) { realFalse.push(eleList[i].value[p]); } }
          eleList[i].value= realFalse;
        }

      }
    }
    // console.log(eleList)
    // console.log(this.deviceList)
  }

  /*添加新页面*/
  addPage(ele,eleList){//ele为类型add或edit
    var eleArray=[];
    if(ele='edit'){
      var temp={page:eleList.length+1,value:[]};
      eleList.push(temp);
      this.page=eleList.length;
    }
    else{
      var temp={page:eleList.length+1,value:[]};
      eleList.push(temp);
      this.page=eleList.length;
    }
  }

  /*删除当前页*/
  delPage(ele,num){
    var del=confirm('确定删除当前页面？');
    var obj=[];
    if(del&&ele=='add'){
      for(var i=0;i<this.deviceListCheck.length;i++){
        if(this.deviceListCheck[i].page!==num){
          obj.push(this.deviceListCheck[i]);
        }
      }
      for(var j=0;j<obj.length;j++){
        obj[j].page=j+1;
      }
      this.deviceListCheck=obj;
      this.page=this.deviceListCheck.length;
    }
    else if(del&&ele=='edit'){
      for(var i=0;i<this.onGroupList.length;i++){
        if(this.onGroupList[i].page!==num){
          obj.push(this.onGroupList[i]);
        }
      }
      for(var j=0;j<obj.length;j++){
        obj[j].page=j+1;
      }
      this.onGroupList=obj;
      this.page=this.onGroupList.length;

    }
  }

  /*删除对象中某个参数函数*/
  deleteData(ele,id) {
    var newObj=[];
    for (var i = 0; i < ele.length; i++) {
      if (ele[i]&&ele[i].containerId !== id) {
        newObj.push(ele[i]);
      }else if(!ele[i]){newObj.push(ele[i]);}
    }
    // console.log(newObj);
    return newObj
  }

  /*处理编辑数据*/
  editDateNew(eleList){
    this.onGroupList=eleList;
  }

  /*添加分组*/
  addGroup(from,ele,eleList){
    var timer='?m='+Date.parse(String(new Date()));

    for(var i=0;i<eleList.length;i++){
      var inList=[];
      for(var j=0;j<ele;j++){
        if(eleList[i].value[j]&&eleList[i].value[j].containerId>0) {
          inList.push(eleList[i].value[j].containerId);
        }
        else if(eleList[i].value[j]&&eleList[i].value[j].containerId<0){
          inList.push(-1);
        }
        else {
          inList.push(null)
        }
      }
      eleList[i].value=inList;
    }
    // console.log(eleList);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('groupName', from.name);
    urlSearchParams.append('switchInterval', from.intervalTime);
    if(ele==4){ urlSearchParams.append('displayMode','四宫格'); }
    if(ele==9){ urlSearchParams.append('displayMode','九宫格'); }
    if(ele==16){ urlSearchParams.append('displayMode','十六宫格'); }
    urlSearchParams.append('groupContent',JSON.stringify(eleList));
    let params=urlSearchParams.toString();
    this.groupHttp.post('/api/v1.0/groups/add'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"){  this.getList(1);this.addData.select=this.grad=4; this.getDeviceList();alert('添加分组成功');}
          else if(req['code']=="401"){
            window.localStorage.removeItem('smartGroup');
            alert('请重新登录');
            let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
            let redirect ='/groupLogin';
            this.router.navigate([redirect], navigationExtras);
          }
          else{ alert(req['message']);}}
      );
    this.getDeviceList();this.freshAdd();
  }

  /*编辑分组*/
  editGroup(from,ele,eleList,id){
    var timer='?m='+Date.parse(String(new Date()));

    for(var i=0;i<eleList.length;i++){
      var inList=[];
      for(var j=0;j<ele;j++){
        if(eleList[i].value[j]&&eleList[i].value[j].containerId>0) {
          inList.push(eleList[i].value[j].containerId);
        }
        else if(eleList[i].value[j]&&eleList[i].value[j].containerId<0){
          inList.push(-1);
        }
        else {
          inList.push(null)
        }
      }
      eleList[i].value=inList;
    }
    // console.log(eleList);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('groupId', id);
    if(from.name){urlSearchParams.append('groupName', from.name); }
    if(from.intervalTime){ urlSearchParams.append('switchInterval', from.intervalTime); }
    if(ele==4){ urlSearchParams.append('displayMode','四宫格'); }
    if(ele==9){ urlSearchParams.append('displayMode','九宫格'); }
    if(ele==16){ urlSearchParams.append('displayMode','十六宫格'); }
    urlSearchParams.append('groupContent',JSON.stringify(eleList));
    let params=urlSearchParams.toString();
    this.groupHttp.put('/api/v1.0/groups/update'+timer,params)
      .subscribe(
        req => {
          if(req['code']=="200"){
            this.editData.select=this.grad=4;
            this.getList(1);
            this.getDeviceList();
            alert('操作成功');
          }
          else if(req['code']=="401"){
            window.localStorage.removeItem('smartGroup');
            alert('请重新登录');
            let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
            let redirect ='/groupLogin';
            this.router.navigate([redirect], navigationExtras);
          }
          else{ alert(req['message']);}}
      );
  }

  /*删除分组*/
  delGroup(groupId:string){
    var realy=confirm('分组删除后将无法恢复，是否继续？');
    if(!realy){return;}
    const params = new HttpParams().set('groupId',groupId);
    this.groupHttp.delete('/api/v1.0/groups/delete',{headers: new HttpHeaders({'apiKey': this.apiKey}),params})
      .subscribe(
        req => {
          if(req['code']=="200"){
            this.getList(1);
            this.getDeviceList();
            alert('删除分组成功');
          }
          else if(req['code']=="401"){
            window.localStorage.removeItem('smartGroup');
            alert('请重新登录');
            let navigationExtras: NavigationExtras = { queryParamsHandling: 'preserve', preserveFragment: true};
            let redirect ='/groupLogin';
            this.router.navigate([redirect], navigationExtras);
          }
          else{ alert(req['message']);}}
      );
  }

  /*编辑获取宫格方式*/
  gradChang(ele){
    var gradC;
    if(ele=='四宫格'){ gradC=4 }
    else if(ele=='九宫格'){ gradC=9 }
    else if(ele=='十六宫格'){ gradC=16 }
    return gradC;
  }

  /*编辑的设备列表处理*/
  editDeviceList(eleList){
    var timer='?m='+Date.parse(String(new Date()));
    this.groupHttp.get('/api/v1.0/container/group'+timer).subscribe(req => {
      if(req['code']==200&&req['data']!==''){
        this.deviceList=req['data'];
        if(eleList[0].value[0]||eleList.length>1) {
          for (var i = 0; i < eleList.length; i++) {
            for (var j = 0; j < eleList[i].value.length; j++) {
              if(eleList[i].value[j].containerId>0){
                this.deviceList= this.deleteData(this.deviceList,eleList[i].value[j].containerId);//设备列表删除设备
              }
            }
          }
        }
      }
    });
    return this.deviceList;
  }

  /*刷新添加选中列表*/
  freshAdd(){
    this.deviceListCheck=[
      {
        value:[],
        page:1,
      },
    ];
  }


/*加载结束启用拖拽功能*/
public iosDragDropShim;
public source;
public recycle;
public locked;


  public currentStyles = { 'min-height': (window.screen.height)+'px','height': (window.screen.height)+'px',overflow:'visible'};




}
