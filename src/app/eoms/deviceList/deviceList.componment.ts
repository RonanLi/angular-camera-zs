import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'deviceListBox',
  templateUrl: './deviceList.componment.html',
  styleUrls: ['./deviceList.componment.css'],
  // template: ` `
})
export class DeviceListComponent {
  title = 'deviceList';
  activeTab=0;
  Dtab=true;
  Gtab=true;
  key='';
  apiKey=this.authService.apiKey;
  // apiKey='85211b9c^1ed8^4377^9993^ae22ba0a71ef';
  private deviceListData1=[];
  private deviceListData2=[];

  constructor(private deviceListHttp: HttpClient,public authService: AuthService) { }
  ngOnInit() {this.deviceListF(this.key);this.deviceListG(this.key)}
  deviceListF(ele){
    const params = new HttpParams().set('key', ele);
    this.deviceListHttp.get('/v1.1/device/list',{params}).subscribe(req => {
      this.deviceListData1 = req['data'];
      console.log(this.deviceListData1)
    });

  }
  deviceListG(ele){
    const params = new HttpParams().set('key', ele);
    this.deviceListHttp.get('/v1.1/gateway/list',{params}).subscribe(req => {
      this.deviceListData2 = req['data'];
      console.log(this.deviceListData2)
    });

  }
  tabPP(){
    this.Dtab=!this.Dtab;
    return this.Dtab;
  }

}
