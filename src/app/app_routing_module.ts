import { NgModule }             from '@angular/core';
import { RouterModule, Routes,PreloadAllModules} from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { IndexComponent }   from './index/index.component';
import { AccountComponent }   from './setup/account/account.componment';
import { SafeComponent }   from './setup/safe/safe.component';
import { SubscribeComponent }   from './setup/subscribe/subscribe.component';
import { DeviceListComponent }   from './eoms/deviceList/deviceList.componment';
import { UserListComponent }   from './eoms/userList/userList.componment';
import { ProductListComponent }   from './eoms/productList/productList.componment';
import { ProductEditComponent }   from './eoms/productEdit/productEdit.component';
import { ProductEditTComponent }   from './eoms/productEditT/productEditT.componment';
import { UserChartComponent }   from './charts/userChart/userChart.componment';
import { ProductChartComponent }   from './charts/productChart/productChart.componment';
import { DeviceChartComponent }   from './charts/deviceChart/deviceChart.componment';
import { WebLogComponent }   from './track/webLog/webLog.component';
import { InsideLogComponent }   from './track/insideLog/insideLog.component';
import { OutsideLogComponent }   from './track/outsideLog/outsideLog.component';
import { BugLogComponent }   from './track/bugLog/bugLog.component';
import { UserLogComponent }   from './track/userLog/userLog.component';
import { UserAllContrastComponent }   from './userAnalysis/userAllContrast/UserAllContrast.Component';
import { UserAttributeComponent }   from './userAnalysis/userAttribute/userAttribute.Component';
import { UserBehaviorComponent }   from './userAnalysis/userBehavior/userBehavior.Component';
import { UserEnvironmenComponent }   from './userAnalysis/userEnvironmen/userEnvironmen.Component';
import { UserEnvironmenContrastComponent }   from './userAnalysis/userEnvironmenContrast/userEnvironmenContrast.Component';
import { UserSceneComponent }   from './userAnalysis/userScene/userScene.Component';
/*路由守卫*/

import { CanActivate }    from '@angular/router';
import { AuthGuard } from './services/apiKey.service';

/*const routes: Routes = [

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent},
  { path: 'setup/account',component:AccountComponent},
  { path: 'eoms/deviceList', component: DeviceListComponent },
  { path: 'eoms/productList', component: ProductListComponent },
  { path: 'eoms/userList',component: UserListComponent },
  { path: 'charts/userChart', component: UserChartComponent },
  { path: 'charts/productChart', component: ProductChartComponent },
  { path: 'charts/deviceChart', component: DeviceChartComponent },
];*/
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: 'index', component: IndexComponent},
          { path: 'setup/account',component:AccountComponent},
          { path: 'setup/safe',component:SafeComponent},
          { path: 'setup/subscribe',component:SubscribeComponent},
          { path: 'eoms/deviceList', component: DeviceListComponent },
          { path: 'eoms/productList', component: ProductListComponent },
          { path: 'eoms/userList',component: UserListComponent },
          { path: 'eoms/category/:id',component: ProductEditComponent },
          { path: 'eoms/commodity/:id',component: ProductEditTComponent },
          { path: 'charts/userChart', component: UserChartComponent },
          { path: 'charts/productChart', component: ProductChartComponent },
          { path: 'charts/deviceChart', component: DeviceChartComponent },
          { path: 'track/webLog', component: WebLogComponent },
          { path: 'track/insideLog', component: InsideLogComponent },
          { path: 'track/outsideLog', component: OutsideLogComponent },
          { path: 'track/bugLog', component: BugLogComponent },
          { path: 'track/userLog', component: UserLogComponent },

          { path: 'userAnalysis/userAllContrast', component: UserAllContrastComponent },
          { path: 'userAnalysis/userAttribute', component: UserAttributeComponent },
          { path: 'userAnalysis/userBehavior', component: UserBehaviorComponent },
          { path: 'userAnalysis/userEnvironmen', component: UserEnvironmenComponent },
          { path: 'userAnalysis/userEnvironmenContrast', component: UserEnvironmenContrastComponent },
          { path: 'userAnalysis/userScene', component: UserLogComponent },

        ],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) ,
    // RouterModule.forRoot(routes,{enableTracing:true,preloadingStrategy:PreloadAllModules}),
  ],

  exports: [ RouterModule ]
})
export class AppRoutingModule {}



