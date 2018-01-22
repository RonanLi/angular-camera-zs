import { Component ,OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'userAttributeBox',
  templateUrl: './userAttribute.component.html',
})
export class UserAttributeComponent {
  private data:any;
  private resultdata1 = [];
  private resultdata2 = [];
  private titledata = [];
  private titledata1 = [];
  private order =false;
  private option:any;
  constructor(private userNumHttp: HttpClient) { }

  ngOnInit() { this. mapNumF();}
  mapNumF(){
    this.userNumHttp.get('/v1.1/user/attribution').subscribe(req => {
      this.data= req['data'];
      this.resultdata();this.resultdataDown();this.orderFun(this.order)

    });

  }
  resultdata() {
      this.data.sort(function(a, b) { return a.value - b.value; }).slice(0, 6);
      for (var i = 0; i < this.data.length; i++) {
        var d1 = { name: this.data[i].name, value: this.data[i].value};
        this.titledata.push(this.data[i].name);
        this.resultdata1.push(d1);
      }
   }
  resultdataDown(){
    this.data.sort(function(a, b) { return b.value - a.value; }).slice(0, 6);
    for (var i = 0; i < this.data.length; i++) {
      var d1 = { name: this.data[i].name, value: this.data[i].value};
      this.titledata1.push(this.data[i].name);
      this.resultdata2.push(d1);
    }
  }

  orderFun(ele){
    this.option = {
      title: [
        {
          text: '销售量统计',
          subtext: '纯属虚构',
          left: 'center',
          show:false,
        },
      ],
      tooltip: { trigger: 'item'},
      legend: {
        orient: 'vertical',
        left: '0',
        top:'10',
        data: ['用户数', '用户数2'],
        selectedMode: 'single',
        show:false,
      },
      visualMap: {
        show: false,
        min: 0,
        max: 2500,
        calculable: true,
        colorLightness: [0.2, 100],
        color: ['#c05050', '#e5cf0d', '#5ab1ef'],
        dimension: 0
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false},
          restore: {},
          saveAsImage: {},
        }
      },
      grid: {
        left: 150,
        top: 0,
        bottom: 40,
        width: '30%'
      },
      xAxis: [
        {
          position: 'top',
          type: 'value',
          boundaryGap: false,
          splitLine: { show: false},
          axisLine: { show: false},
          axisTick: { show: false},
          axisLabel: {
            show: false,
            margin: 20,
            textStyle: { color: '#aaa'},
          },
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: ele?this.titledata1:this.titledata,
          offset: 100,
          axisLine: {show: false,},
          axisTick: {show: false,},
          axisLabel: {
            interval: 0,
            textStyle: { color: '#333' /*地名字颜色*/}
          },

        }
      ],
      series: [
        {
          z: 1,
          name: '用户数',
          type: 'map',
          map: 'china',
          right: '10%',
          width:'40%',
          top: '10%',
          zoom: 1.2,
          label: {
            normal: { show: true},
            emphasis: { show: true}
          },
          data:  this.resultdata1
        },
        {
          name: '用户数',
          z: 2,
          type: 'bar',
          barWidth:30,
          label: {
            normal: { show: true},
            emphasis: { show: true}
          },
          itemStyle: {
            normal: {
              label: {
                show: true, /*是否显示数据*/
                barBorderRadius: 0,
                color: '#000',
                position: [-80, 10], /*设置数据位置*/
                right: '0',
              }
            }
          },
          data: ele?this.resultdata2:this.resultdata1,
        },
      ]
    };
  }

}








