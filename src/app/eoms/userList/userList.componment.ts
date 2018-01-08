import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'userListBox',
  templateUrl: './userList.componment.html',
  styleUrls: ['./userList.componment.css'],
})
export class UserListComponent {
  title = 'userList';
  key='';
  apiKey=this.authService.apiKey;
  private userListData=[];
  constructor(private userListHttp: HttpClient,public authService: AuthService) { }

  ngOnInit() { this.userListF(this.key); }
  userListF(ele){
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const params = new HttpParams().set('key', ele);
    this.userListHttp.get('/v1.1/user/list',{params}).subscribe(req => {
      this.userListData = req['data'];
      console.log(this.userListData);
    });

  }


}
