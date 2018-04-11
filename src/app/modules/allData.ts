import { Map, List } from './commonclass';

//登录信息实体类
export class LoginMsg {
  userName: string;
  password: string;
  randomCode:string;
}

//用户信息返回
export class userDetial {
  appId: string;
  customerId: string;
  customerName: string;
  customerType: string;
  description: string;
  linkman: string;
  phone: string;
  statuscode : string;
}

//客户信息编辑类
export class customerEdit {
  linkman: string;
  phone: string;
  pwd: string;
  description: string;
  roleIdArray: string;//用户组ID
}

//客户信息添加类
export class customerAdd {
  customerName: string;
  passwd: string;
  linkman: string;
  phone: string;
  description: string;
  select=1001;
  selectName=true;
  excel: any;
}
/*设备管理设备激活*/
export class deviceActive{
  // factory='HUADI';
  // deviceMode='VCW002';
  factory='';
  deviceMode='';
  customer='';
  deviceSn:string;
  port='81';
  user='admin';
  pwd='888888';
  code:string;
  description:string;
  isNet=1;
}
//子账户信息编辑类
export class subEdit {
  linkman: string;
  phone: string;
  description: string;
  roleIdArray: string;//用户组ID
}

//子账户信息添加类
export class subAdd {
  customerName: string;
  passwd: string;
  linkman: string;
  phone: string;
  role:any;
  description: string;
  excel:any;
}

//B、C设备信息编辑类
export class deviceEdit {
  containerId:string;
  startTime:string;
  endTime:string;
  location:string;
  description:string;
  permissionType:string;
  excel:any;
  select='';
  share:any;
}
/*角色创建信息类*/
export class roleCreat {
  roleName:string;
  customerId:string;
  permission:string;
  description:string;
}
/*角色编辑信息类*/
export class roleEdit{
  roleName:string;
  customerId:string;
  permission:string;
  description:string;
}
/*添加分组*/
export class groupAdd{
  name:string;
  intervalTime:string;
  grid:string;
  select=4;
}
export class groupEdit{
  name:string;
  intervalTime:string;
  grid:string;
  select=4;
}


//模块类
export class ModuleNews {
  id: string;
  mname: string;
  murl: string;
  orderid: number;
  cssname: string;
  pages: PagesNews[];

  backid: number;
  isshow: number;
}
//页面信息类
export class PagesNews {
  id: string;
  pagename: string;
  pageurl: string;
  allurl: string;
  mid: string;//模块ID
  orderid: number;
  btitle: string;
  stitle: string;
  cssname: string;
  S: number;
  A: number;
  U: number;
  D: number;

  //backid: number;
  isshow: number;
}
/*---------------*/



/*---------------*/
//登录信息实体类
export class Auth {
  hasError: boolean;
  errMsg: string;
  redirectUrl: string;
}

//浏览 1  新增 5  修改10  删除20
export enum Determine {
  Select = 1, //浏览
  Insert = 5, //新增
  Update = 10,//修改
  Delete = 20,//删除
}
//   token        令牌
//   userid       用户ID
//   usergroup    用户组ID
//   pid          页面的ID
//   determine    四种里的某个权限，一个不是四个。 浏览 1  新增 5  修改10  删除20  这个可以从http状态里获取


//   token        令牌
//   userid       用户ID
//   pid          页面的ID

//===================================================================================


//索引信息模块类
export class ModuleIndexNews {
  id: string;
  mname: string;
  murl: string;
  orderid: number;
  cssname: string;
  Pages: Map<PagesNews>;

  backid: number;
}


