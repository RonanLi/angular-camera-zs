import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 最新Echart 引入
import {NgxEchartsModule} from 'ngx-echarts';
import {HttpClientModule} from '@angular/common/http';
/*引入表单*/
import {    ReactiveFormsModule, FormsModule }   from '@angular/forms';

/**/
// import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {TreeviewComponent} from './treeview/treeview.component'
import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app_routing_module';
import { LoginComponent }   from './login/login.component';
import { IndexComponent }   from './index/index.component';
import { HeadComponent }   from './head/head.component';
import { FootComponent }   from './foot/foot.component';
import { AccountComponent }   from './setup/account/account.componment';
import { SafeComponent }   from './setup/safe/safe.component';
import { DeviceListComponent }   from './eoms/deviceList/deviceList.componment';
import { UserListComponent }   from './eoms/userList/userList.componment';
import { ProductListComponent }   from './eoms/productList/productList.componment';
import { UserChartComponent }   from './charts/userChart/userChart.componment';
import { ProductChartComponent }   from './charts/productChart/productChart.componment';
import { DeviceChartComponent }   from './charts/deviceChart/deviceChart.componment';
/*守卫路由*/

import {AuthGuard} from  './services/apiKey.service'
import {AuthService} from  './services/auth.service'
/*拦截器*/
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NoopInterceptor} from './services/intercept';

@NgModule({

  declarations: [
    AppComponent,LoginComponent,IndexComponent,
    HeadComponent,FootComponent,
    TreeviewComponent,AccountComponent,SafeComponent,
    DeviceListComponent,UserListComponent,
    ProductListComponent,UserChartComponent,
    ProductChartComponent,DeviceChartComponent,

  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule,NgxEchartsModule,

    FormsModule,  ReactiveFormsModule,


  ],
  // providers: [AuthGuard,AuthService,LoginComponent],
  providers: [
    AuthGuard,AuthService,LoginComponent,

    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true,}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }



