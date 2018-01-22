import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'userEnvironmenBox',
  templateUrl: './userEnvironmen.component.html',
})
export class UserEnvironmenComponent {
  private chartTab=1;
  ngOnInit() {}
  /*用户温度分析数据*/
  option1 = {
    baseOption: {
      timeline: {
        x: 'left',
        y: 'top',
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
        data: ['室内', '室外'],
      },
      calculable: true,
      grid: {
        top: 80,
        bottom: 100
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        x: '95%',
        y: 'center',
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
      title: {
        x: 'center',
        y: 'top',
        top:'20px',
        text: '温度折线对比图',
        subtext: '数据来自公众号'
      },
      tooltip: { trigger: 'axis'},
      grid: { top: 150, bottom: 80},
      xAxis: {
        name: '时间',
        data: ["5-22", "5-29", "6-5", "6-12"],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
        name: '室内',
        type: 'line',
        label: {
          normal: { show: true, position: 'top',}
        },
        data: [12, 14, 23, 35]
        },
        {
          name: '室外',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top',
            }
          },
          data: [34, 23, -27, 19]
        }
      ]
    },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
          name: '室内',
          'data': [19, 25, 28, 21]
          },
          {
            name: '室外',
            'data': [-23, -32, -9, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
          name: '室内',
          'data': [22, 23, 24, 25]
          },
          {
            name: '室外',
            'data': [-23, -12, -29, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
          name: '室内',
          'data': [23, 21, 21.5, 25.5]
          },
          {
            name: '室外',
            'data': [-32, -29, -18, 17.5]
          }
        ]
      }
    ]
  };
  /*用户湿度*/
  option2 = {
    baseOption: {
      timeline: {
        x: 'left',
        y: 'top',
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
        data: ['室内', '室外'],
      },
      calculable: true,
      grid: {
        top: 80,
        bottom: 100
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        x: '95%',
        y: 'center',
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
        title: {
          x: 'center',
          y: 'top',
          top:'20px',
          text: '温度折线对比图',
          subtext: '数据来自公众号'
        },
        tooltip: { trigger: 'axis'},
        grid: { top: 150, bottom: 80},
        xAxis: {
          name: '时间',
          data: ["5-22", "5-29", "6-5", "6-12"],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %RH'
          }
        },
        series: [
          {
            name: '室内',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [12, 14, 23, 35]
          },
          {
            name: '室外',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [34, 23, -27, 19]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %RH'
          }
        },
        series: [
          {
            name: '室内',
            'data': [19, 25, 28, 21]
          },
          {
            name: '室外',
            'data': [-23, -32, -9, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %RH'
          }
        },
        series: [
          {
            name: '室内',
            'data': [22, 23, 24, 25]
          },
          {
            name: '室外',
            'data': [-23, -12, -29, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %RH'
          }
        },
        series: [
          {
            name: '室内',
            'data': [23, 21, 21.5, 25.5]
          },
          {
            name: '室外',
            'data': [-32, -29, -18, 17.5]
          }
        ]
      }
    ]
  };
  /*PM2.5*/
  option3 = {
    baseOption: {
      timeline: {
        x: 'left',
        y: 'top',
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
        data: ['室内', '室外'],
      },
      calculable: true,
      grid: {
        top: 80,
        bottom: 100
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        x: '95%',
        y: 'center',
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
        title: {
          x: 'center',
          y: 'top',
          top:'20px',
          text: '温度折线对比图',
          subtext: '数据来自公众号'
        },
        tooltip: { trigger: 'axis'},
        grid: { top: 150, bottom: 80},
        xAxis: {
          name: '时间',
          data: ["5-22", "5-29", "6-5", "6-12"],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} μg/m3'
          }
        },
        series: [
          {
            name: '室内',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [12, 14, 23, 35]
          },
          {
            name: '室外',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [34, 23, -27, 19]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} μg/m3'
          }
        },
        series: [
          {
            name: '室内',
            'data': [19, 25, 28, 21]
          },
          {
            name: '室外',
            'data': [-23, -32, -9, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} μg/m3'
          }
        },
        series: [
          {
            name: '室内',
            'data': [22, 23, 24, 25]
          },
          {
            name: '室外',
            'data': [-23, -12, -29, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} μg/m3'
          }
        },
        series: [
          {
            name: '室内',
            'data': [23, 21, 21.5, 25.5]
          },
          {
            name: '室外',
            'data': [-32, -29, -18, 17.5]
          }
        ]
      }
    ]
  };
  /*二氧化碳5*/
  option4 = {
    baseOption: {
      timeline: {
        x: 'left',
        y: 'top',
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
        data: ['室内', '室外'],
      },
      calculable: true,
      grid: {
        top: 80,
        bottom: 100
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        x: '95%',
        y: 'center',
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
        title: {
          x: 'center',
          y: 'top',
          top:'20px',
          text: '温度折线对比图',
          subtext: '数据来自公众号'
        },
        tooltip: { trigger: 'axis'},
        grid: { top: 150, bottom: 80},
        xAxis: {
          name: '时间',
          data: ["5-22", "5-29", "6-5", "6-12"],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} ppm'
          }
        },
        series: [
          {
            name: '室内',
            type: 'line',
            label: {
              normal: { show: true, position: 'top',}
            },
            data: [12, 14, 23, 35]
          },
          {
            name: '室外',
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [34, 23, -27, 19]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} ppm'
          }
        },
        series: [
          {
            name: '室内',
            'data': [19, 25, 28, 21]
          },
          {
            name: '室外',
            'data': [-23, -32, -9, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} ppm'
          }
        },
        series: [
          {
            name: '室内',
            'data': [22, 23, 24, 25]
          },
          {
            name: '室外',
            'data': [-23, -12, -29, -3]
          }
        ]
      },
      {
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} ppm'
          }
        },
        series: [
          {
            name: '室内',
            'data': [23, 21, 21.5, 25.5]
          },
          {
            name: '室外',
            'data': [-32, -29, -18, 17.5]
          }
        ]
      }
    ]
  };


}




