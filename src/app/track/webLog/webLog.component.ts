import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'webLogBox',
  templateUrl: './webLog.component.html',
})
export class WebLogComponent {
  ngOnInit() {}
  private activeTab=0;
}
