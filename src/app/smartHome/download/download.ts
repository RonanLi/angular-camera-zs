import { Component ,OnInit} from '@angular/core';
import { CameraService } from '../../services/camera.service';
import {Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'downloadBox',
  templateUrl: './download.html',
})
export class DownloadComponent {
  constructor( private userService: CameraService, public router: Router) { }
  ngOnInit() { }
  /*定义参数*/
  public weixin;
}
