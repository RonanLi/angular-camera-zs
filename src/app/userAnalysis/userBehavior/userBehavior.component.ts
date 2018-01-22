import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'userBehaviorBox',
  templateUrl: './userBehavior.component.html',
})
export class UserBehaviorComponent {
  private activeTab=0;

  ngOnInit() {}

  optionDay = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x:'5%',
      y:'30px',
      orient: 'vertical',
      data:['常用功能','常用场景','故障设备'],
      selected: {
        '常用功能': true,
        '常用场景': false,
        '故障设备': false,
      }
    },
    grid: { top: 150, bottom: 80},
    toolbox: {
      show: true,
      orient: 'vertical',
      x: '95%',
      y: 'center',
      feature: {
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis:  {
      type: 'category',
      boundaryGap: false,
      data: ['0~2点','2~4点','4~6点','6~8点','8~10点','0~12点','12~14点','14~16点','16~18点','18~20点','20~22点','22~24点']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    series: [
      {
        name:'常用功能',
        type:'line',
        data:[11, 11, 15, 13, 12, 13, 10,20,18,8,10,23],
      },
      {
        name:'常用场景',
        type:'line',
        data:[11, -12, 12, 15, 13, 12, 10, 12, 13, 10,3,15],

      },
      {
        name:'故障设备',
        type:'line',
        data:[1, -2, 2, 5, 3, 2, 0,5,7,9,10,12],

      }

    ]
  };
  optionWeek = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x:'5%',
      y:'30px',
      orient: 'vertical',
      data:['常用功能','常用场景','故障设备'],
      selected: {
        '常用功能': true,
        '常用场景': false,
        '故障设备': false,
      }
    },
    grid: { top: 150, bottom: 80},
    toolbox: {
      show: true,
      orient: 'vertical',
      x: '95%',
      y: 'center',
      feature: {
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis:  {
      type: 'category',
      boundaryGap: false,
      data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    series: [
      {
        name:'常用功能',
        type:'line',
        data:[11, 11, 15, 13, 12, 13, 10],
      },
      {
        name:'常用场景',
        type:'line',
        data:[11, -12, 12, 15, 13, 12, 10],

      },
      {
        name:'故障设备',
        type:'line',
        data:[1, -2, 2, 5, 3, 10, 12],

      }

    ]
  };
  optionMonth = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x:'5%',
      y:'30px',
      orient: 'vertical',
      data:['常用功能','常用场景','故障设备'],
      selected: {
        '常用功能': true,
        '常用场景': false,
        '故障设备': false,
      }
    },
    grid: { top: 150, bottom: 80},
    toolbox: {
      show: true,
      orient: 'vertical',
      x: '95%',
      y: 'center',
      feature: {
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis:  {
      type: 'category',
      boundaryGap: false,
      data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    series: [
      {
        name:'常用功能',
        type:'line',
        data:[11, 11, 15, 13, 12, 13, 10,20,18,8,10,23],
      },
      {
        name:'常用场景',
        type:'line',
        data:[11, -12, 12, 15, 13, 12, 10, 12, 13, 10,3,15],

      },
      {
        name:'故障设备',
        type:'line',
        data:[1, -2, 2, 5, 3, 2, 0,5,7,9,10,12],

      }

    ]
  };


}
