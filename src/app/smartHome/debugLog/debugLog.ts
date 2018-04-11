import { Component ,OnInit} from '@angular/core';
import { CameraService } from '../../services/camera.service';
import {Router, NavigationExtras } from '@angular/router';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
/*导入滚动*/
import {ElementRef, AfterViewChecked, ViewChild} from "@angular/core";
@Component({
  selector: 'debugLogBox',
  templateUrl: './debugLog.html',
})
export class DebugLogComponent {
  constructor( ) { }
  ngOnInit() {
    // this.dataToHtml(this.dataEnd);

    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
      /*建立连接*/
      // this.ws = new $WebSocket("ws:" + '//' + "apis.t2.5itianyuan.com/smarthome-console" + '/'+ '/' + "/debugsocket");

      // this.sendMsg()
    }
    else { alert('当前浏览器 Not support websocket'); }



  }

  public ws;
  public connect:boolean;
  public innerHtml='';
  public dataList:any=[];

  sendMsg() {
    this.connect=true;
    /*监听服务器返回信息*/
    this.ws.onMessage((msg: MessageEvent) => {this.delMessage(msg.data) }, {autoApply: false });
    /*监听打开连接*/
    this.ws.onOpen(function () { console.log('连接成功！') });
    /*监听关闭连接*/
    this.ws.onClose(function () { console.log('关闭连接！');});
    /*监听连接错误*/
    this.ws.onError(function () { console.log("连接发生错误"); });
    /*监听窗口关闭*/

  }
  /*关闭连接*/
  closeWebSocket(){this.connect=false; this.ws.close(); }

  /*重建连接*/
  openWebSocket(){
    this.ws = new $WebSocket("ws:" + '//' + "apis.t2.5itianyuan.com/smarthome-console" + '/'+ '/' + "/debugsocket");
    this.connect=true;
    this.sendMsg();
  }

  /*处理服务器返回消息*/
  delMessage(ele){
    /*SENSORCONTROL/DIRECT/YUNBA/YUNBARECV/UARTSEND/UARTRECV/RESPONSE/RSP*/
    /*
    MESSAGE-SERVER-->messageServe
    API-SERVER-->server
    GATEWAY-ZIGBEE-->zigBee
    YUNBA-CLOUD-->yunbaCloud
    WIFI-DEVICE-->wifiDevice
    */

    var data=JSON.parse(ele);
    var flag = false;
    var compare = false;
    var index;
    // if(!data.deviceSn||!data.accountId){return;}
    // let temp={arriveTime:data.arriveTime,deviceSn:data.deviceSn,sn:data.sn,accountId:data.accountId,messageServe:['','','','','','','',''],server:['','','','','','','',''],zigBee:['','','','','','','',''],yunbaCloud:['','','','','','','',''],wifiDevice:['','','','','','','','']};
    // let tempSecond={arriveTime:data.arriveTime,process:data.process,method:data.method,params:data.params,isSucess:'',interfaceResp:'',retryCount:''};

    let temp:any={arriveTime:data.arriveTime,deviceSn:data.deviceSn,sn:data.sn,accountId:data.accountId,messageServe:[{},{},{},{},{},{},{},''],server:[{},{},{},{},{},{},{},''],zigBee:[{},{},{},{},{},{},{},''],yunbaCloud:[{},{},{},{},{},{},{},''],wifiDevice:[{},{},{},{},{},{},{},'']};
    let tempSecond={arriveTime:data.arriveTime,process:data.process,method:data.method,params:data.params,isSucess:null,interfaceResp:'',retryCount:''};



    for(var i=0; i<this.dataList.length;i++){
      // if(this.dataList[i].deviceSn==data.deviceSn){ flag = true;index=i;break;}
      if(this.dataList[i].sn==data.sn){
        flag = true;index=i;
        if(this.dataList[i].arriveTime<data.arriveTime){compare=true;console.log(data.sn+'========='+(data.arriveTime-this.dataList[i].arriveTime))}
        break;
      }
    }
    if(flag&&compare){
      if(compare){//不超时
        if(data.process=='end'){
          tempSecond.isSucess=data.isSucess;
          tempSecond.interfaceResp=data.interfaceResp;
          tempSecond.retryCount=data.retryCount;
        }
        if(data.inititor=='MESSAGE-SERVER'){
          this.dataList[i].messageServe[8]=data.process;
          this.arryData(data,i,data.method,'messageServe',data.process);
        }
        else if(data.inititor=='API-SERVER'){
          this.dataList[i].server[8]=data.process;
          this.arryData(data,i,data.method,'server',data.process);
        }
        else if(data.inititor=='GATEWAY-ZIGBEE'){
          this.dataList[i].zigBee[8]=data.process;
          this.arryData(data,i,data.method,'zigBee',data.process);
        }
        else if(data.inititor=='YUNBA-CLOUD'){
          this.dataList[i].yunbaCloud[8]=data.process;
          this.arryData(data,i,data.method,'yunbaCloud',data.process);
        }
        else if(data.inititor=='WIFI-DEVICE'){
          this.dataList[i].wifiDevice[8]=data.process;
          this.arryData(data,i,data.method,'wifiDevice',data.process);
        }
      }
    }
    else{
      if(data.process=='end'){
        tempSecond.isSucess=data.isSucess;
        tempSecond.interfaceResp=data.interfaceResp;
        tempSecond.retryCount=data.retryCount;

      }
      if(data.inititor==' MESSAGE-SERVER'){
        temp.messageServe[8]='true';
        // temp.messageServe.push(tempSecond);
        if(data.method=='SENSORCONTROL'){temp.messageServe.splice(0,1,tempSecond); }
        if(data.method=='DIRECT'){temp.messageServe.splice(1,1,tempSecond); }
        if(data.method=='YUNBA'){temp.messageServe.splice(2,1,tempSecond); }
        if(data.method=='YUNBARECV'){temp.messageServe.splice(3,1,tempSecond); }
        if(data.method=='UARTSEND'){temp.messageServe.splice(4,1,tempSecond); }
        if(data.method=='UARTRECV'){temp.messageServe.splice(5,1,tempSecond); }
        if(data.method=='RESPONSE'){temp.messageServe.splice(6,1,tempSecond); }
        if(data.method=='RSP'){temp.messageServe.splice(7,1,tempSecond); }
      }
      else if(data.inititor=='API-SERVER'){
        // temp.server.push(tempSecond);
        temp.server[8]='true';
        if(data.method=='SENSORCONTROL'){temp.server.splice(0,1,tempSecond); }
        if(data.method=='DIRECT'){temp.server.splice(1,1,tempSecond); }
        if(data.method=='YUNBA'){temp.server.splice(2,1,tempSecond); }
        if(data.method=='YUNBARECV'){temp.server.splice(3,1,tempSecond); }
        if(data.method=='UARTSEND'){temp.server.splice(4,1,tempSecond); }
        if(data.method=='UARTRECV'){temp.server.splice(5,1,tempSecond); }
        if(data.method=='RESPONSE'){temp.server.splice(6,1,tempSecond); }
        if(data.method=='RSP'){temp.server.splice(7,1,tempSecond); }

      }
      else if(data.inititor=='GATEWAY-ZIGBEE'){
        // temp.zigBee.push(tempSecond);
        temp.zigBee[8]='true';
        if(data.method=='SENSORCONTROL'){temp.zigBee.splice(0,1,tempSecond); }
        if(data.method=='DIRECT'){temp.zigBee.splice(1,1,tempSecond); }
        if(data.method=='YUNBA'){temp.zigBee.splice(2,1,tempSecond); }
        if(data.method=='YUNBARECV'){temp.zigBee.splice(3,1,tempSecond); }
        if(data.method=='UARTSEND'){temp.zigBee.splice(4,1,tempSecond); }
        if(data.method=='UARTRECV'){temp.zigBee.splice(5,1,tempSecond); }
        if(data.method=='RESPONSE'){temp.zigBee.splice(6,1,tempSecond); }
        if(data.method=='RSP'){temp.zigBee.splice(7,1,tempSecond); }
      }
      else if(data.inititor=='YUNBA-CLOUD'){
        // temp.yunbaCloud.push(tempSecond);
        temp.yunbaCloud[8]='true';
        if(data.method=='SENSORCONTROL'){temp.yunbaCloud.splice(0,1,tempSecond); }
        if(data.method=='DIRECT'){temp.yunbaCloud.splice(1,1,tempSecond); }
        if(data.method=='YUNBA'){temp.yunbaCloud.splice(2,1,tempSecond); }
        if(data.method=='YUNBARECV'){temp.yunbaCloud.splice(3,1,tempSecond); }
        if(data.method=='UARTSEND'){temp.yunbaCloud.splice(4,1,tempSecond); }
        if(data.method=='UARTRECV'){temp.yunbaCloud.splice(5,1,tempSecond); }
        if(data.method=='RESPONSE'){temp.yunbaCloud.splice(6,1,tempSecond); }
        if(data.method=='RSP'){temp.yunbaCloud.splice(7,1,tempSecond); }
      }
      else if(data.inititor=='WIFI-DEVICE'){
        // temp.wifiDevice.push(tempSecond);
        temp.wifiDevice[8]='true';
        if(data.method=='SENSORCONTROL'){temp.wifiDevice.splice(0,1,tempSecond); }
        if(data.method=='DIRECT'){temp.wifiDevice.splice(1,1,tempSecond); }
        if(data.method=='YUNBA'){temp.wifiDevice.splice(2,1,tempSecond); }
        if(data.method=='YUNBARECV'){temp.wifiDevice.splice(3,1,tempSecond); }
        if(data.method=='UARTSEND'){temp.wifiDevice.splice(4,1,tempSecond); }
        if(data.method=='UARTRECV'){temp.wifiDevice.splice(5,1,tempSecond); }
        if(data.method=='RESPONSE'){temp.wifiDevice.splice(6,1,tempSecond); }
        if(data.method=='RSP'){temp.wifiDevice.splice(7,1,tempSecond); }
      }

      this.dataList.push(temp);

    }
  }
  /*处理数组*/
  arryData(data,i,method,type,process){
    // let temp={arriveTime:data.arriveTime,deviceSn:data.deviceSn,sn:data.sn,accountId:data.accountId,messageServe:['','','','','','','',''],server:['','','','','','','',''],zigBee:['','','','','','','',''],yunbaCloud:['','','','','','','',''],wifiDevice:['','','','','','','','']};
    // let temp={arriveTime:data.arriveTime,deviceSn:data.deviceSn,sn:data.sn,accountId:data.accountId,messageServe:[null,null,null,null,null,null,null,false],server:[null,null,null,null,null,null,null,false],zigBee:[null,null,null,null,null,null,null,false],yunbaCloud:[null,null,null,null,null,null,null,false],wifiDevice:[null,null,null,null,null,null,null,false]};
    let temp:any={arriveTime:data.arriveTime,deviceSn:data.deviceSn,sn:data.sn,accountId:data.accountId,messageServe:[{},{},{},{},{},{},{},''],server:[{},{},{},{},{},{},{},''],zigBee:[{},{},{},{},{},{},{},''],yunbaCloud:[{},{},{},{},{},{},{},''],wifiDevice:[{},{},{},{},{},{},{},'']};

    let tempSecond={arriveTime:data.arriveTime,process:data.process,method:data.method,params:data.params,isSucess:null,interfaceResp:'',retryCount:''};
    if(process=='end'){
      tempSecond.isSucess=data.isSucess;
      tempSecond.interfaceResp=data.interfaceResp;
      tempSecond.retryCount=data.retryCount;
    }
    if(data.method=='SENSORCONTROL'){this.dataList[i][type].splice(0,1,tempSecond); }
    if(data.method=='DIRECT'){this.dataList[i][type].splice(1,1,tempSecond); }
    if(data.method=='YUNBA'){this.dataList[i][type].splice(2,1,tempSecond); }
    if(data.method=='YUNBARECV'){this.dataList[i][type].splice(3,1,tempSecond); }
    if(data.method=='UARTSEND'){this.dataList[i][type].splice(4,1,tempSecond); }
    if(data.method=='UARTRECV'){this.dataList[i][type].splice(5,1,tempSecond); }
    if(data.method=='RESPONSE'){this.dataList[i][type].splice(6,1,tempSecond); }
    if(data.method=='RSP'){this.dataList[i][type].splice(7,1,tempSecond); }
  }

  /*清空消息*/
  reset() { this.innerHtml='';this.dataList=[]; }
  public currentStyles = { 'min-height': (window.screen.height-145)+'px','height': (window.screen.height-145)+'px',overflow:'visible'};
  public currentStyleS = { 'min-height': (window.screen.height-300)+'px','height': (window.screen.height-300)+'px',overflow:'scroll'};


  /*消息滚动*/
  @ViewChild("scrollMe") myScrollContainer;
  ngAfterViewChecked() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }





}
