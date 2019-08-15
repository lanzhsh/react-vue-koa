const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export function drawpie(configData) {
  const {
    colorData,
    legendData,
    numberData,
    // formatter,
    id,
    padding
  } = configData
  const myChart = echarts.init(document.getElementById(id))
  const seriesData = []
  numberData.map((item, index) => {
    seriesData.push({
      value: numberData[index],
      name: legendData[index],
      itemStyle: {
        normal: {
          label: {
            color: colorData[index]
          }
        }
      }
    })
  })

  myChart.setOption({
    backgroundColor: '#fff',
    legend: {
      show: false,
      orient: 'vertical',
      top: '85%',
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20,
      textStyle: {
        fontSize: 12,
        color: '#000000'
      },
      selectedMode: false
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['20%', '45%'],
        // minAngle: 60, // 设置最小角度会有 bug
        // startAngle: 270, // 起始角度
        avoidLabelOverlap: true, // 是否启用防止标签重叠策略
        center: ['50%', '50%'],
        data: seriesData,
        animation: false,
        labelLine: {
          normal: {
            length: 16,
            length2: 90,
            lineStyle: {
              width: 0.5
            }
          }
        },
        label: {
          // 此处为指示线文字
          normal: {
            formatter: '{b|{b}}\n\n',
            padding: [0, padding],
            borderWidth: 10,
            borderRadius: 4,
            rich: {
              b: {
                fontSize: 10,
                lineHeight: 6,
                align: 'center'
              }
            }
          }
        }
      }
    ],
    color: colorData
  })
}

export function drawline(dataX, dataY, id) {
  dataX = dataX === undefined ? [] : dataX
  dataY = dataY === undefined ? [] : dataY
  const myChart = echarts.init(document.getElementById(id))
  myChart.clear()
  myChart.setOption({
    backgroundColor: '#fff',
    grid: {
      left: '12',
      right: '14',
      top: '12%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      boundaryGap: false,
      interval: 5000,
      type: 'category',
      axisLabel: {
        color: '#999999',
        fontSize: 10
      },
      data: dataX,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#F7F8FA'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#F2F6F7'],
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#F2F6F7'],
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: {
        color: '#999999',
        fontSize: 10
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#F2F6F7'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: dataY,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(54,112,227,0.4)' },
              { offset: 1, color: 'rgba(54,112,227,0.03)' }
            ])
          }
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              fontSize: 10,
              color: '#3670E3',
              fontWeight: '540',
              textBorderColor: '#fff',
              textBorderWidth: 2
            },
            borderColor: '#3670E3',
            borderWidth: 0,
            color: '#626AF6',
            lineStyle: {
              color: '#626AF6',
              width: 1.5
            }
          }
        }
      }
    ],
    textStyle: {
      color: '#54657E'
    }
  })
}

export function drawbar(dataX, dataY, id) {
  // console.log('drawBar执行啦12');
  dataX = dataX === undefined ? [] : dataX
  dataY = dataY === undefined ? [] : dataY
  const myChart = echarts.init(document.getElementById(id))
  myChart.setOption({
    backgroundColor: '#F7F8FA',
    grid: {
      left: '-6%',
      right: '0%',
      bottom: '2%',
      top: '5%',
      containLabel: true
    },
    yAxis: {
      show: false,
      axisLabel: {},
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine: {
        lineStyle: {
          color: '#EEEEEE'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0)'
        }
      }
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        // rotate:-20,
        // showMaxLabel:true,
        textStyle: {
          fontSize: 10
        }
      },
      boundaryGap: true,
      data: dataX,
      axisLine: {
        lineStyle: {
          color: '#EEEEEE'
        }
      },

      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: dataY,
        barWidth: 21,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(128,109,248)' },
              { offset: 1, color: 'rgb(68,127,247)' }
            ]),
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgb(128,109,248)'
              }
            }
          }
        }
      }
    ],
    textStyle: {
      color: '#54657E'
    }
  })
  // console.log("执行啦");
}

// const get = function(e) {
//   let newStr = ' '
//   let start, end
//   const name_len = e.name.length // 每个内容名称的长度
//   const max_name = 7 // 每行最多显示的字数
//   const new_row = Math.ceil(name_len / max_name) // 最多能显示几行，向上取整比如2.1就是3行
//   if (name_len > max_name) {
//     // 如果长度大于每行最多显示的字数
//     for (let i = 0; i < new_row; i++) {
//       // 循环次数就是行数
//       let old = '' // 每次截取的字符
//       start = i * max_name // 截取的起点
//       end = start + max_name // 截取的终点
//       if (i == new_row - 1) {
//         // 最后一行就不换行了
//         old = e.name.substring(start)
//       } else {
//         old = e.name.substring(start, end) + '\n'
//       }
//       newStr += old // 拼接字符串
//     }
//   } else {
//     // 如果小于每行最多显示的字数就返回原来的字符串
//     newStr = e.name
//   }
//   return newStr
// }
