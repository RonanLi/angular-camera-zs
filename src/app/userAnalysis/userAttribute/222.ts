/*
private data = [
  { name: '北京', value1: this.randomData(), value2: this.randomData(),},
  { name: '天津', value1: this.randomData(), value2: this.randomData(),},
  { name: '上海', value1: this.randomData(), value2: this.randomData(),},
  { name: '重庆', value1: this.randomData(), value2: this.randomData(),},
  { name: '河北', value1: this.randomData(), value2: this.randomData(),},
  { name: '河南', value1: this.randomData(), value2: this.randomData(),},
  { name: '云南', value1: this.randomData(), value2: this.randomData(),},
  { name: '辽宁', value1: this.randomData(), value2: this.randomData(),},
  { name: '黑龙江',value1: this.randomData(), value2: this.randomData(),},
  { name: '湖南', value1: this.randomData(), value2: this.randomData(),},
  { name: '安徽', value1: this.randomData(), value2: this.randomData(),},
  { name: '山东', value1: this.randomData(), value2: this.randomData(),},
  { name: '新疆', value1: this.randomData(), value2: this.randomData(),},
  { name: '江苏', value1: this.randomData(), value2: this.randomData(),},
  { name: '浙江', value1: this.randomData(), value2: this.randomData(),},
  { name: '江西', value1: this.randomData(), value2: this.randomData(),},
  { name: '湖北', value1: this.randomData(), value2: this.randomData(),},
  { name: '广西', value1: this.randomData(), value2: this.randomData(),},
  { name: '甘肃', value1: this.randomData(), value2: this.randomData(),},
  { name: '山西', value1: this.randomData(), value2: this.randomData(),},
  { name: '内蒙古', value1: this.randomData(), value2: this.randomData(),},
  { name: '陕西', value1: this.randomData(), value2: this.randomData(),},
  { name: '吉林', value1: this.randomData(), value2: this.randomData(),},
  { name: '福建', value1: this.randomData(), value2: this.randomData(),},
  { name: '贵州', value1: this.randomData(), value2: this.randomData(),},
  { name: '广东', value1: this.randomData(), value2: this.randomData(),},
  { name: '青海', value1: this.randomData(), value2: this.randomData(),},
  { name: '西藏', value1: this.randomData(), value2: this.randomData(),},
  { name: '四川', value1: this.randomData(), value2: this.randomData(),},
  { name: '宁夏', value1: this.randomData(), value2: this.randomData(),},
  { name: '海南', value1: this.randomData(), value2: this.randomData(),},
  { name: '台湾', value1: this.randomData(), value2: this.randomData(),},
  { name: '香港', value1: this.randomData(), value2: this.randomData(),},
  { name: '澳门', value1: this.randomData(), value2: this.randomData(),}
];
private resultdata1 = [];
private resultdata2 = [];
private titledata = [];

ngOnInit() { this.resultdata() }

randomData() { return Math.round(Math.random() * 1000); }

resultdata() {
  for (var i = 0; i < this.data.length; i++) {
    var d1 = { name: this.data[i].name, value: this.data[i].value1};
    var d2 = { name: this.data[i].name, value: this.data[i].value2};
    this.titledata.push(this.data[i].name);
    this.resultdata1.push(d1);
    this.resultdata2.push(d2);
  }
  this.resultdata1.sort(function(a, b) { return a.value - b.value; });
  this.resultdata2.sort(function(a, b) { return a.value - b.value; });

}

option = {
  title: [
    {
      text: '销售量统计',
      subtext: '纯属虚构',
      left: 'center'
    },
  ],
  tooltip: { trigger: 'item'},
  legend: {
    orient: 'vertical',
    left: '0',
    top:'10',
    data: ['门板', '拼框门'],
    selectedMode: 'single',
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
    top: 100,
    bottom: 40,
    width: '30%'
  },
  xAxis: [
    {
      position: 'top',
      type: 'value',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        margin: 20,
        textStyle: {
          color: '#aaa'
        },
      },
    }
  ],
  yAxis: [
    {
      type: 'category',
      data:  this.titledata,
      offset: 100,
      axisLine: {show: false,},
      axisTick: {show: false,},
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#333' //地名字颜色
        }
      },

    }
  ],
  series: [
    {
      z: 1,
      name: '门板',
      type: 'map',
      map: 'china',
      right: '10%',
      width:'40%',
      top: '30%',
      zoom: 1.2,
      label: {
        normal: { show: true},
        emphasis: { show: true}
      },
      roam: true,
      data:  this.resultdata1
    },
    {
      z: 1,
      name: '拼框门',
      type: 'map',
      map: 'china',
      right: '10%',
      top: 100,
      zoom: 1.2,
      label: {
        normal: { show: true},
        emphasis: { show: true}
      },
      roam: true,
      data:  this.resultdata2
    },
    {
      name: '门板',
      z: 2,
      type: 'bar',
      barWidth:10,
      label: {
        normal: { show: true},
        emphasis: { show: true}
      },
      itemStyle: {
        normal: {
          label: {
            show: true, /!*是否显示数据*!/
            barBorderRadius: 0,
            color: '#000',
            position: [-80, -2], /!*设置数据位置*!/
            right: '0',
          }
        }
      },
      data:  this.resultdata1
    },
    {
      name: '拼框门',
      z: 2,
      type: 'bar',
      label: {
        normal: {show: true },
        emphasis: { show: true}
      },
      itemStyle: {
        normal: {
          label: {
            show: true, /!*是否显示数据*!/
            barBorderRadius: 0,
            color: '#000',
            position: [-80, -3], /!*设置数据位置*!/
            right: '0',
          }
        }
      },
      data:  this.resultdata2
    },
  ]
};*/
