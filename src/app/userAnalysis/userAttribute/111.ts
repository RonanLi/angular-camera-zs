/*
/!*用户属性*!/
var data = [{
  name: "上海",
  value: 29780
},
  {
    name: "珠海",
    value: 2186
  },
  {
    name: "三亚",
    value: 1935
  },
  {
    name: "惠州",
    value: 1973
  },
  {
    name: "海口",
    value: 2568
  },
  {
    name: "合肥",
    value: 4039
  },
  {
    name: "南京",
    value: 6959
  },
  {
    name: "杭州",
    value: 5632
  },
  {
    name: "苏州",
    value: 6707
  },
  {
    name: "无锡",
    value: 3393
  },
  {
    name: "昆山",
    value: 1894
  },
  {
    name: "广州",
    value: 15769
  },
  {
    name: "深圳",
    value: 8259
  },
  {
    name: "佛山",
    value: 5741
  },
  {
    name: "东莞",
    value: 3030
  },
  {
    name: "福州",
    value: 4542
  },
  {
    name: "厦门",
    value: 3329
  },
  {
    name: "南宁",
    value: 3157
  },
  {
    name: "郑州",
    value: 6690
  },
  {
    name: "武汉",
    value: 8678
  },
  {
    name: "长沙",
    value: 5303
  },
  {
    name: "南昌",
    value: 3025
  },
  {
    name: "北京",
    value: 20259
  },
  {
    name: "长春",
    value: 3016
  },
  {
    name: "大连",
    value: 3202
  },
  {
    name: "沈阳",
    value: 4540
  },
  {
    name: "哈尔滨",
    value: 3141
  },
  {
    name: "天津",
    value: 8626
  },
  {
    name: "济南",
    value: 4361
  },
  {
    name: "青岛",
    value: 6667
  },
  {
    name: "太原",
    value: 4080
  },
  {
    name: "石家庄",
    value: 6137
  },
  {
    name: "西安",
    value: 6991
  },
  {
    name: "成都",
    value: 13873
  },
  {
    name: "重庆",
    value: 13283
  },
  {
    name: "昆明",
    value: 4633
  },


];

var geoCoordMap = {
  "上海": [121.48, 31.22],
  "珠海": [113.52, 22.3],
  "三亚": [109.31, 18.14],
  "惠州": [114.4, 23.09],
  "海口": [110.35, 20.02],
  "合肥": [117.27, 31.86],
  "南京": [118.78, 32.04],
  "杭州": [120.19, 30.26],
  "苏州": [120.62, 31.32],
  "无锡": [120.29, 31.59],
  "昆山": [120.95, 31.39],
  "广州": [113.23, 23.16],
  "深圳": [114.07, 22.62],
  "佛山": [113.11, 23.05],
  "东莞": [113.75, 23.04],
  "福州": [119.3, 26.08],
  "厦门": [118.1, 24.46],
  "南宁": [108.33, 22.84],
  "郑州": [113.65, 34.76],
  "武汉": [114.31, 30.52],
  "长沙": [113, 28.21],
  "南昌": [115.89, 28.68],
  "北京": [116.46, 39.92],
  "长春": [125.35, 43.88],
  "大连": [121.62, 38.92],
  "沈阳": [123.38, 41.8],
  "哈尔滨": [126.63, 45.75],
  "天津": [117.2, 39.13],
  "济南": [117, 36.65],
  "青岛": [120.33, 36.07],
  "太原": [112.53, 37.87],
  "石家庄": [114.48, 38.03],
  "西安": [108.95, 34.27],
  "成都": [104.06, 30.67],
  "重庆": [106.54, 29.59],
  "昆明": [102.73, 25.04],
};

var convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

var convertedData = [
  convertData(data),
  convertData(data.sort(function(a, b) {
    return b.value - a.value;
  }).slice(0, 6))
];

var selectedItems = [];
var categoryData = [];
var barData = [];
var sum = 0;
var count = data.length;
for (var i = 0; i < data.length; i++) {
  categoryData.push(data[i].name);
  barData.push(data[i].value);
  sum += data[i].value;
}
option = {
  title: [{
    text: '全国36城“无人区”数',
    link: 'http://pages.anjuke.com/expert/newexpert.html',
    subtext: 'data from Anjuke',
    sublink: 'http://pages.anjuke.com/expert/newexpert.html',
    left: 'center',
    textStyle: {
      color: '#fff' //标题颜色
    }
  }, {
    id: 'statistic',
    // text: count ? '平均: ' + parseInt((sum / count).toFixed(4)) : '',
    right: 120,
    top: 40,
    width: 100,
    textStyle: {
      color: '#fff', //平均值颜色
      fontSize: 16
    }
  }],
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#fff' //工具颜色
      },
      emphasis: {
        borderColor: '#b1e4ff'
      }
    },
    feature: {
      dataZoom: {},
      brush: {
        type: ['rect', 'polygon', 'clear']
      },
      saveAsImage: {
        show: true
      }
    }
  },
  brush: {
    outOfBrush: {
      color: '#abc'
    },
    brushStyle: {
      borderWidth: 2,
      color: 'rgba(0,0,0,0.2)',
      borderColor: 'rgba(0,0,0,0.5)',
    },
    seriesIndex: [0, 1],
    throttleType: 'debounce',
    throttleDelay: 300,
    geoIndex: 0
  },
  geo: {
    map: 'china',
    left: '60%',
    right: '0%',
    center: [117.98561551896913, 31.205000490896193],
    zoom: 1.2,
    label: {
      emphasis: {
        show: false
      }
    },
    // roam: true,//是否缩放
    itemStyle: {
      normal: {
        areaColor: '#323c48', //地图颜色
        borderColor: '#111' //地图线颜色
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  tooltip: {
    trigger: 'item'
  },
  grid: {
    left: 150,
    top: 100,
    bottom: 40,
    width: '30%'
  },
  xAxis: {
    type: 'value',
    scale: true,
    position: 'top',
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
      margin: 2,
      textStyle: {
        color: '#aaa'
      },
    },
  },
  yAxis: {
    type: 'category',
    //  name: 'TOP 20',
    nameGap: 16,

    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    offset: 100,
    axisLabel: {
      interval: 0,
      textStyle: {
        color: '#333' //地名字颜色
      }
    },
    data: categoryData
  },
  series: [{
    //  name: 'Top 5',
    type: 'scatter',
    coordinateSystem: 'geo',
    data: convertedData[0],
    symbolSize: function(val) {
      return Math.max(val[2] / 1100, 8);
    },

    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    label: {
      normal: {
        formatter: '{b}',
        position: 'left', //修改地名在地图位置
        show: true
      }
    },
    itemStyle: {
      normal: {
        color: '#f4e925',
      }
    },
  },
    {
      id: 'bar',
      zlevel: 2,
      type: 'bar',
      symbol: 'none',
      barWidth: 5,
      itemStyle: {
        normal: {
          color: '#ddb926', //条形颜色,
          label: {
            show: true, //是否显示数据
            color: '#000',
            position: [-80, -3], //设置数据位置
            right: '0',


          }
        }
      },
      data: data
    }
  ]
};*/
