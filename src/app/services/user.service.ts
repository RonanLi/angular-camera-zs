import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { userDetial } from '../modules/login';
@Injectable()
export class UserService {
  public email:any;
  public userData=new userDetial();
  constructor(private userPublicHttp: HttpClient,) { this.userPublic();}

  userPublic(){
    this.userPublicHttp.get('/v1.1/application/info').subscribe(req => {
      this.userData = req['data'];
      this.email=this.userData['email'];
      return this.userData;
    });
  }
}

