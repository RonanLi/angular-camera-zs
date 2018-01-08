import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import * as echarts from 'echarts';
@Component({
  selector: 'userChartBox',
  templateUrl: './userChart.componment.html',
  styleUrls: ['./userChart.componment.css'],
})
export class UserChartComponent {

  activeTab=0; chartTab=3;

  dataM= ['2017-08-30','2017-08-30','2017-08-30','2017-08-30','2017-08-30','2017-08-30','2017-08-30'];
  dataN=[5, 9, 2, 5, 3, 2, 7];

  apiKey=this.authService.apiKey;
  todayNum=[];
  newNum=[];
  activeNum=[];
  allNum=[];
  mapOption:any;
  constructor(private userNumHttp: HttpClient,public authService: AuthService) { }

  ngOnInit() { this.todayNumF(); this.mapNumF(); }

  todayNumF(){ this.userNumHttp.get('/v1.1/user/show').subscribe(req => { this.todayNum = req['data']; }); }
  mapNumF(){
    this.userNumHttp.get('/v1.1/user/attribution').subscribe(req => {
      return this.mapOption = {
        title : { text: '市场占有量', subtext: '地区分布图', x: 'center'},
        tooltip : { trigger: 'item'},
        legend: { orient: 'vertical', x: 'left', data: ['市场占有量']},
        dataRange: { min: 0, max: 500, x: 'left', y: 'bottom', text: ['高','低'], calculable : true},
        toolbox: {
          show: true, orient: 'vertical', x: 'right', y: 'center',
          feature: { mark: {show: true}, dataView: {show: true, readOnly: false}, restore: {show: true}, saveAsImage : {show: true}}
        },
        roamController: {
          show: true, x: 'right',
          mapTypeControl: { 'china': true}
        },
        series : [{
          name: '市场占有量', type: 'map', mapType: 'china',
            itemStyle:{ normal: {label:{show:true}}, emphasis: {label:{show:true}}},
            data: req['data']
        }]
      };
    });

  }

  newOption = {
  title : {
    text: '未来一周气温变化',
    subtext: '纯属虚构'
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['新增人数']
  },
  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : this.dataM
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLabel : {
        formatter: '{value}'
      }
    }
  ],
  series : [
    {
      name:'新增人数',
      type:'line',
      data:this.dataN,
      markLine : {
        data : [
          {type : 'average', name : '平均值'}
        ]
      }
    }
  ]
};
  activeOption = {
  title : {
    text: '未来一周气温变化',
    subtext: '纯属虚构'
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['最高气温','最低气温']
  },
  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : ['周一','周二','周三','周四','周五','周六','周日']
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLabel : {
        formatter: '{value} °C'
      }
    }
  ],
  series : [
    {
      name:'最高气温',
      type:'line',
      data:[11, 11, 15, 13, 12, 13, 10],
      markLine : {
        data : [
          {type : 'average', name: '平均值'}
        ]
      }
    },

  ]
};
  allOption = {
  title : {
    text: '某地区蒸发量和降水量',
    subtext: '纯属虚构'
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['蒸发量','降水量']
  },
  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      // data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      data : this.dataM
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'蒸发量',
      type:'bar',
      // data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      data : this.dataN,

      markPoint : {
        data : [
          {type : 'max', name: '最大值'},
          {type : 'min', name: '最小值'}
        ]
      },
      markLine : {
        data : [
          {type : 'average', name: '平均值'}
        ]
      }
    },
    {
      name:'降水量',
      type:'bar',
      data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      markPoint : {
        data : [
          {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
          {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
        ]
      },
      markLine : {
        data : [
          {type : 'average', name : '平均值'}
        ]
      }
    }
  ]
};


}
