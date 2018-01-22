import { Map, List } from './commonclass';

//登录信息实体类
export class LoginNews {
  userName: string;
  password: string;
  apiKey:string;
}

//登录信息返回实体类
export class LoginBackNews {
  usernews: UserNews;
  modulenews: ModuleNews[];
  backid: number;
}
//用户信息返回
export class userDetial {
  appId: string;
  appName: string;
  appAvatar: string;
  phone: string;
  email: string;
}
//添加菜单
export class MenuAdd {
  appId: string;
  annotation: string;
  englishName: string;
  vendorCode: string;
  productCode: string;
  groupOrder: string;
  versionLimit: string;
  version: string;
  categoryId: string;
  categoryClass:string;
  parentId:string;
}
//编辑菜单
export class MenuEdit {
  commodityId: string;
  appId: string;
  categoryId: string;
  vendorCode: string;
  productCode: string;
  englishName: string;
  templateId: string;
  annotation: string;
  recommendLevel: string;
  guidePicture: string;
  effectPicture: string;
  productAvatar: string;
  qrCodePicture: string;
  statusCode: string;
  versionLimit: string;
  actualPicture: string;
  groupOrder: string;
  categoryAvatar: string;
}

//用户信息类
export class UserNews {
  id: string;
  username: string;
  showname: string;
  sex: number;
  usergroup: string;//用户组ID
  picurl: string;
  gname: string;//用户组名称
  token: string;//用户ID和 用户组ID 联合生成，用于防止客户端改动

  backid: number;
}
//账户信息设置
export class UserUpdata {
  newphone: string;
  randomCode: string;
}
//账户安全设置
export class resetPwd {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
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

//检索返回类
export class Indexback {
  moduleNews: ModuleNews;
  pagesNews: PagesNews;
  userNews: UserNews;
}

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
  Delete = 20 //删除
};

//   token        令牌
//   userid       用户ID
//   usergroup    用户组ID
//   pid          页面的ID
//   determine    四种里的某个权限，一个不是四个。 浏览 1  新增 5  修改10  删除20  这个可以从http状态里获取


//   token        令牌
//   userid       用户ID
//   pid          页面的ID

//===================================================================================

//索引信息实体类
export class SystemIndexNews {
  usernews: UserNews;
  modulenews: Map<ModuleIndexNews>;
  backid: number;
}

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

/*
//用户新增人数
export class useAddNew {
  data: addNewData[];
  date: addNewDate[];
}

//用户活跃人数
export class useActive {
  data: useActiveData[];
  date: useActiveNewDate[];
}

//用户总人数
export class useAll {
  data: useAllData[];
  date: useAllDate[];
}
//用户属性
export class useHome {
  data: useHomeData[];
  date: useHomeDate[];
}
*/
