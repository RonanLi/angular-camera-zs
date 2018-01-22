import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'userLogBox',
  templateUrl: './userLog.component.html',
})
export class UserLogComponent {
  ngOnInit() {}
  private activeTab=0;
  private userLogTab=0;
  private userLogDate=0;
  private deviceLogTab=0;
  private deviceLogDate=0;
}
