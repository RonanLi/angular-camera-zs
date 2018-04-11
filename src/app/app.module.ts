import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// 最新Echart 引入
import {HttpClientModule} from '@angular/common/http';

/*引入表单*/
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


import {TreeviewComponent} from './treeview/treeview.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app_routing_module';
import {LoginComponent} from './login/login.component';
import {GroupLoginComponent} from './groupLogin/groupLogin.component';
import {IndexComponent} from './index/index.component';
import {HeadComponent} from './head/head.component';
import {FootComponent} from './foot/foot.component';

/*甜园科技路径*/
import {CustomerComponent} from './smartHome/customer/customer.componment';
import {DeviceComponent} from './smartHome/device/device.componment';
import {LeasedLogComponent} from './smartHome/leasedLog/leasedLog.componment';
import {RolesComponent} from './smartHome/roles/roles.componment';
import {SubaccountComponent} from './smartHome/subaccount/subaccount.componment';
import {RePwdComponent} from './smartHome/rePwd/rePwd.componment';
import {GroupComponent} from './smartHome/group/group.componment';
import {GroupCComponent} from './smartHome/groupC/groupC.componment';
import {DownloadComponent} from './smartHome/download/download';
import {DebugLogComponent} from './smartHome/debugLog/debugLog';

/*服务*/
import {CameraService} from './services/camera.service';
/*守卫路由*/
import {RoutGuard} from './services/routService';
/*拦截器*/
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpServiceFactory} from './services/httpServiceFactory';
/*Json管道*/
import {ToArray} from './services/toArray';

/*日期插件*/
import {CalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/*上传插件*/
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({

  declarations: [
    AppComponent, LoginComponent, IndexComponent,
    HeadComponent, FootComponent,
    TreeviewComponent,
    CustomerComponent, DeviceComponent, LeasedLogComponent, RolesComponent, SubaccountComponent, RePwdComponent,
    GroupComponent,DownloadComponent,DebugLogComponent,GroupCComponent,
    GroupLoginComponent,

    ToArray,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    CalendarModule, BrowserAnimationsModule,
    CommonModule, FileUploadModule,

  ],
  providers: [
    LoginComponent,
    CameraService,
    RoutGuard,

    {provide: HTTP_INTERCEPTORS, useClass: HttpServiceFactory, multi: true,},
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}



