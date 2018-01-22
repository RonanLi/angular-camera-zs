
import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'userEnvironmenContrast',
  templateUrl: './userEnvironmenContrast.component.html',
})
export class UserEnvironmenContrastComponent {
  ngOnInit() {}

  /*用户环境分析对比图*/

  option = {
    baseOption: {
      timeline: {
        x: 'left',
        top:'20px',
        left:'30px',
        width:'200px',
        data: ['华东', '华北', '东北', '西北'],
        axisType: 'category',
        show: true,
        autoPlay: false,
        controlStyle:{ show: false,}
      },
      tooltip: {},
      legend: {
        x: '92%',
        y: '20px',
        orient: 'vertical',
        data: ['室内温度', '室外温度', '室内湿度', '室外湿度', '室内PM2.5', '室外PM2.5', '室内TVOC', '室外TVOC'],
        selected:{
          '室内温度':true,
          '室外温度':true,
          '室内湿度':true,
          '室外湿度':true,
          '室内PM2.5':true,
          '室外PM2.5':true,
          '室内TVOC':true,
          '室外TVOC':true,

        }
      },
      calculable: true,
      grid: { top: 100, bottom: 80,},
      toolbox: {
        show: true,
        orient: 'vertical',
        x: '95%',
        y: '60%',
        feature: {
          dataView: { readOnly: false},
          magicType: { type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
    },
    options: [
      {
        tooltip: { trigger: 'axis'},
        xAxis: {
          data: ["5-22", "5-29", "6-5", "6-12"],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '室内温度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [12, 13, 14, 15]
          },
          {
            name: '室外温度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [23, 23, 34, 15]
          },
          {
            name: '室内湿度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [25, 35, 16, 17]
          },
          {
            name: '室外湿度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [23, 34, 34, 29]
          },
          {
            name: '室内PM2.5',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [28, 26, 26, 20]
          },
          {
            name: '室外PM2.5',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [22, 33, 34, 56]
          },
          {
            name: '室内TVOC',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [64, 34, 78, 23]
          },
          {
            name: '室外TVOC',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [32, 31, 21, 10]
          },
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value}'}
        },
        series: [
          {
            name: '室内温度',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [34, 37, 35, 29]
          },
          {
            name: '室外温度',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [24, 25, 22, 21]
          },
          {
            name: '室内湿度',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [28, 18, 15, 13]
          },
          {
            name: '室外湿度',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [27, 28, 29, 19]
          },
          {
            name: '室内PM2.5',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [11, 22, 33, 23]
          },
          {
            name: '室外PM2.5',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [24, 32, 18, 26]
          },
          {
            name: '室内TVOC',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [12, 12, 34, 34]
          },
          {
            name: '室外TVOC',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [29, 23, 25, 23]
          },
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value}'}
        },
        series: [
          {
            name: '室内温度',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [16, 28, 29, 37]
          },
          {
            name: '室外温度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [34, 41, 36, 28]
          },
          {
            name: '室内湿度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [27, 25, 24, 22]
          },
          {
            name: '室外湿度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [11, 19, 16, 38]
          },
          {
            name: '室内PM2.5',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [10, 7, 3, 17]
          },
          {
            name: '室外PM2.5',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [7, 17, 35, 27]
          },
          {
            name: '室内TVOC',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [9, 12, 23, 32]
          },
          {
            name: '室外TVOC',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [11, 34, 26, 32]
          },
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value}'}
        },
        series: [
          {
            name: '室内温度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [15, 25, 35, 5]
          },
          {
            name: '室外温度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [19, 29, 39, 22]
          },
          {
            name: '室内湿度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [24, 14, 34, 25]
          },
          {
            name: '室外湿度',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [17, 27, 37, 28]
          },
          {
            name: '室内PM2.5',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [20, 10, 21, 30]
          },
          {
            name: '室外PM2.5',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [28, 27, 19, 30]
          },
          {
            name: '室内TVOC',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [23, 34, 26, 31]
          },
          {
            name: '室外TVOC',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [34, 32, 12, 34]
          },
        ]
      }
    ]
  };



}


