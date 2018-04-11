import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'indexBox',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  title = 'false';
  ngOnInit() { }
  /*定义参数*/
  public weixin;
}
