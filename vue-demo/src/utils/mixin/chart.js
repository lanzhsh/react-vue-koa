const initEchart=
{
  methods:{
  drawpie(data1, data2, data3,id) {
    data1 = data1 === undefined ? 0 : data1;
    data2 = data2 === undefined ? 0 : data2;
    data3 = data3 === undefined ? 0 : data3;
    let myChart = this.$echarts.init(document.getElementById(id));
    myChart.setOption({
      backgroundColor: "#fff",
      legend: {
        show: true,
        orient: "vertical",
        // left: "right",
        x:'50%',
        y:'center',
        itemWidth: 14,
        itemHeight: 14,
        // bottom: "5%",
        textStyle: {
          fontSize: 14,
          color: "#999999"
        },
        selectedMode:false,
        data: [
          {
            name: `${data1.name}  ${data1.percent}%  ${data1.number}`,
          },
          {
            name: `${data2.name}  ${data2.percent}%  ${data2.number}`,
          },
          {
            name: `${data3.name}  ${data3.percent}%  ${data3.number}`,
          }
        ]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "100%"],
          center: ["25%", "50%"],
          data: [
            {
              value: data1.number,
              name: `${data1.name}  ${data1.percent}%  ${data1.number}`,
              itemStyle: {
                normal: {
                  label: {
                    color: "#447FF7"
                  }
                }
              }
            },
            {
              value: data2.number,
              name:  `${data2.name}  ${data2.percent}%  ${data2.number}`,
              itemStyle: {
                normal: {
                  label: {
                    color: "#35D18D"
                  }
                }
              }
            },
            {
              value: data3.number,
              name: `${data3.name}  ${data3.percent}%  ${data3.number}`,
              itemStyle: {
                normal: {
                  label: {
                    color: "#F7D23B"
                  }
                }
              }
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            normal: {
              label: {
                show: false,
                position: "outer",
                formatter: "{d}%",
                textStyle: {
                  fontSize: 12,
                  color: "#000"
                }
              },
              labelLine: {
                show: false
              }
            }
          }
        }
      ],
      color: ["#447FF7", "#35D18D", "#F7D23B"]
    });
  },

  drawline(dataX, dataY, id) {
    // console.log("drawline执行啦");
    dataX = dataX === undefined ? [] : dataX;
    dataY = dataY === undefined ? [] : dataY;
    let myChart = this.$echarts.init(document.getElementById(id));
    myChart.setOption({
      backgroundColor: "#fff",
      grid: {
        left: "5%",
        right: "8%",
        top: "12%",
        bottom: "12%",
        containLabel: true
      },
      xAxis: {
        interval: 5000,
        type: "category",
        axisLabel: {
          // interval: 1
        },
        data: dataX,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: " #F7F8FA"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#EDEDED"],
            width: 1,
            type: "solid"
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {

        // min: 0,
        // max: 100,
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#EDEDED"],
            width: 1,
            type: "solid"
          }
        },
        axisLabel: {
          fontSize: 13
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#EDEDED"
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          id: "a",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          data: dataY,
          // showAllSymbol: true,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(88,195,128,0.2)" },
                { offset: 1, color: "rgba(88,195,128,0.03)" }
              ])
            }
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                fontSize: 15,
                color: "#58C380",
                fontWeight: "540",
                textBorderColor: "#fff",
                textBorderWidth: 2
              },
              borderColor: "rgb(255,255,255)",
              borderWidth: 1,
              color: " #58C380",
              lineStyle: {
                color: "#58C380",
                width: 2
              }
            }
          }
        }
      ],
      textStyle: {
        color: "#54657E"
      }
    });
  },

  drawbar(dataX, dataY,id) {
    console.log('drawBar执行啦12');
    dataX = dataX === undefined ? [] : dataX;
    dataY = dataY === undefined ? [] : dataY;
    let myChart = this.$echarts.init(document.getElementById(id));
    myChart.setOption({
      backgroundColor: "#fff",
      grid: {
        left: "-6%",
        right: "0%",
        bottom: "2%",
        top: "2%",
        containLabel: true
      },
      yAxis: {
        show: false,
        axisLabel: {
        },
        type: "value",
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: "#d3d3d3"
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "rgba(0,0,0,0)"
          }
        }
      },
      xAxis: {
        type: "category",
        axisLabel: {
          interval:0,
          // rotate:-20,
          // showMaxLabel:true,
          textStyle:{
            fontSize:10
          }
        },
        boundaryGap:true,
        data: dataX,
        axisLine: {
          lineStyle: {
            color: "#999999"
          }
        },

        axisTick: {
          show: false
        }
      },
      series: [
        {
          name: "2011年",
          type: "bar",
          data: dataY,
          barWidth: 21,
          itemStyle: {
            normal: {
              color: '#447FF7',
              label: {
                show: true,
                position: "top"
              }
            }
          }
        }
      ],
      textStyle: {
        color: "#54657E"
      }
    });
    // console.log("执行啦");
  },
  }

}

export default initEchart;