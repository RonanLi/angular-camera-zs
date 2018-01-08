import { NgModule }             from '@angular/core';
import { RouterModule, Routes,PreloadAllModules} from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { IndexComponent }   from './index/index.component';
import { AccountComponent }   from './setup/account/account.componment';
import { SafeComponent }   from './setup/safe/safe.component';
import { DeviceListComponent }   from './eoms/deviceList/deviceList.componment';
import { UserListComponent }   from './eoms/userList/userList.componment';
import { ProductListComponent }   from './eoms/productList/productList.componment';
import { UserChartComponent }   from './charts/userChart/userChart.componment';
import { ProductChartComponent }   from './charts/productChart/productChart.componment';
import { DeviceChartComponent }   from './charts/deviceChart/deviceChart.componment';
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
          { path: 'eoms/deviceList', component: DeviceListComponent },
          { path: 'eoms/productList', component: ProductListComponent },
          { path: 'eoms/userList',component: UserListComponent },
          { path: 'charts/userChart', component: UserChartComponent },
          { path: 'charts/productChart', component: ProductChartComponent },
          { path: 'charts/deviceChart', component: DeviceChartComponent },

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



