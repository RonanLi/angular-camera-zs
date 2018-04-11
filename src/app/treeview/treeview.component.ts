import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
  constructor(public cameraService: CameraService) { }
  ngOnInit() { }
}
