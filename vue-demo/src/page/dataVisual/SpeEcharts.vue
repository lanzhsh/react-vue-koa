<template>
  <div>
    <div id="dial-one"></div>
    <div id="dial-two"></div>
    <div id="dial-three"></div>
    <div id="dial-four"></div>
  </div>
</template>

<style lang="scss" scoped>
#dial-one,
#dial-two,
#dial-three,
#dial-four {
  display: inline-block;
  width: 400px;
  height: 400px;
}
</style>


<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 仪表盘一
      let dialOne = this.$echarts.init(document.getElementById("dial-one"));
      let dialOneOpt = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      };

      //设置指针时间
      setInterval(function() {
        dialOneOpt.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
        dialOne.setOption(dialOneOpt, true);
      }, 2000);

      // 仪表盘二
      let dialTwo = this.$echarts.init(document.getElementById("dial-two"));
      let dialTwoOpt = {
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "速度",
            type: "gauge",
            z: 3,
            min: 0,
            max: 220,
            splitNumber: 11,
            radius: "50%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            axisLabel: {
              backgroundColor: "auto",
              borderRadius: 2,
              color: "#eee",
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: "#222"
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic"
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              formatter: function(value) {
                value = (value + "").split(".");
                value.length < 2 && value.push("00");
                return (
                  ("00" + value[0]).slice(-2) +
                  "." +
                  (value[1] + "00").slice(0, 2)
                );
              },
              fontWeight: "bolder",
              borderRadius: 3,
              backgroundColor: "#444",
              borderColor: "#aaa",
              shadowBlur: 5,
              shadowColor: "#333",
              shadowOffsetX: 0,
              shadowOffsetY: 3,
              borderWidth: 2,
              textBorderColor: "#000",
              textBorderWidth: 2,
              textShadowBlur: 2,
              textShadowColor: "#fff",
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              fontFamily: "Arial",
              width: 100,
              color: "#eee",
              rich: {}
            },
            data: [{ value: 40, name: "km/h" }]
          },
          {
            name: "转速",
            type: "gauge",
            center: ["20%", "55%"], // 默认全局居中
            radius: "35%",
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, "-30%"] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder"
            },
            data: [{ value: 1.5, name: "x1000 r/min" }]
          },
          {
            name: "油表",
            type: "gauge",
            center: ["77%", "50%"], // 默认全局居中
            radius: "25%",
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "E";
                  case "1":
                    return "Gas";
                  case "2":
                    return "F";
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: "gas" }]
          },
          {
            name: "水表",
            type: "gauge",
            center: ["77%", "50%"], // 默认全局居中
            radius: "25%",
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "H";
                  case "1":
                    return "Water";
                  case "2":
                    return "C";
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: "gas" }]
          }
        ]
      };

      //设置指针时间
      setInterval(function() {
        dialTwoOpt.series[0].data[0].value =
          (Math.random() * 100).toFixed(2) - 0;
        dialTwoOpt.series[1].data[0].value = (Math.random() * 7).toFixed(2) - 0;
        dialTwoOpt.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
        dialTwoOpt.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
        dialTwo.setOption(dialTwoOpt, true);
      }, 2000);

      //K线图
      let dialThree = this.$echarts.init(document.getElementById("dial-three"));

      var upColor = "#ec0000";
      var upBorderColor = "#8A0000";
      var downColor = "#00da3c";
      var downBorderColor = "#008F28";

      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      var data0 = this.splitData([
        ["2013/1/24", 2320.26, 2320.26, 2287.3, 2362.94],
        ["2013/1/25", 2300, 2291.3, 2288.26, 2308.38],
        ["2013/1/28", 2295.35, 2346.5, 2295.35, 2346.92],
        ["2013/1/29", 2347.22, 2358.98, 2337.35, 2363.8],
        ["2013/1/30", 2360.75, 2382.48, 2347.89, 2383.76],
        ["2013/1/31", 2383.43, 2385.42, 2371.23, 2391.82],
        ["2013/2/1", 2377.41, 2419.02, 2369.57, 2421.15],
        ["2013/2/4", 2425.92, 2428.15, 2417.58, 2440.38],
        ["2013/2/5", 2411, 2433.13, 2403.3, 2437.42],
        ["2013/2/6", 2432.68, 2434.48, 2427.7, 2441.73],
        ["2013/2/7", 2430.69, 2418.53, 2394.22, 2433.89],
        ["2013/2/8", 2416.62, 2432.4, 2414.4, 2443.03],
        ["2013/2/18", 2441.91, 2421.56, 2415.43, 2444.8],
        ["2013/2/19", 2420.26, 2382.91, 2373.53, 2427.07],
        ["2013/2/20", 2383.49, 2397.18, 2370.61, 2397.94],
        ["2013/2/21", 2378.82, 2325.95, 2309.17, 2378.82],
        ["2013/2/22", 2322.94, 2314.16, 2308.76, 2330.88],
        ["2013/2/25", 2320.62, 2325.82, 2315.01, 2338.78],
        ["2013/2/26", 2313.74, 2293.34, 2289.89, 2340.71],
        ["2013/2/27", 2297.77, 2313.22, 2292.03, 2324.63],
        ["2013/2/28", 2322.32, 2365.59, 2308.92, 2366.16],
        ["2013/3/1", 2364.54, 2359.51, 2330.86, 2369.65],
        ["2013/3/4", 2332.08, 2273.4, 2259.25, 2333.54],
        ["2013/3/5", 2274.81, 2326.31, 2270.1, 2328.14],
        ["2013/3/6", 2333.61, 2347.18, 2321.6, 2351.44],
        ["2013/3/7", 2340.44, 2324.29, 2304.27, 2352.02],
        ["2013/3/8", 2326.42, 2318.61, 2314.59, 2333.67],
        ["2013/3/11", 2314.68, 2310.59, 2296.58, 2320.96],
        ["2013/3/12", 2309.16, 2286.6, 2264.83, 2333.29],
        ["2013/3/13", 2282.17, 2263.97, 2253.25, 2286.33],
        ["2013/3/14", 2255.77, 2270.28, 2253.31, 2276.22],
        ["2013/3/15", 2269.31, 2278.4, 2250, 2312.08],
        ["2013/3/18", 2267.29, 2240.02, 2239.21, 2276.05],
        ["2013/3/19", 2244.26, 2257.43, 2232.02, 2261.31],
        ["2013/3/20", 2257.74, 2317.37, 2257.42, 2317.86],
        ["2013/3/21", 2318.21, 2324.24, 2311.6, 2330.81],
        ["2013/3/22", 2321.4, 2328.28, 2314.97, 2332],
        ["2013/3/25", 2334.74, 2326.72, 2319.91, 2344.89],
        ["2013/3/26", 2318.58, 2297.67, 2281.12, 2319.99],
        ["2013/3/27", 2299.38, 2301.26, 2289, 2323.48],
        ["2013/3/28", 2273.55, 2236.3, 2232.91, 2273.55],
        ["2013/3/29", 2238.49, 2236.62, 2228.81, 2246.87],
        ["2013/4/1", 2229.46, 2234.4, 2227.31, 2243.95],
        ["2013/4/2", 2234.9, 2227.74, 2220.44, 2253.42],
        ["2013/4/3", 2232.69, 2225.29, 2217.25, 2241.34],
        ["2013/4/8", 2196.24, 2211.59, 2180.67, 2212.59],
        ["2013/4/9", 2215.47, 2225.77, 2215.47, 2234.73],
        ["2013/4/10", 2224.93, 2226.13, 2212.56, 2233.04],
        ["2013/4/11", 2236.98, 2219.55, 2217.26, 2242.48],
        ["2013/4/12", 2218.09, 2206.78, 2204.44, 2226.26],
        ["2013/4/15", 2199.91, 2181.94, 2177.39, 2204.99],
        ["2013/4/16", 2169.63, 2194.85, 2165.78, 2196.43],
        ["2013/4/17", 2195.03, 2193.8, 2178.47, 2197.51],
        ["2013/4/18", 2181.82, 2197.6, 2175.44, 2206.03],
        ["2013/4/19", 2201.12, 2244.64, 2200.58, 2250.11],
        ["2013/4/22", 2236.4, 2242.17, 2232.26, 2245.12],
        ["2013/4/23", 2242.62, 2184.54, 2182.81, 2242.62],
        ["2013/4/24", 2187.35, 2218.32, 2184.11, 2226.12],
        ["2013/4/25", 2213.19, 2199.31, 2191.85, 2224.63],
        ["2013/4/26", 2203.89, 2177.91, 2173.86, 2210.58],
        ["2013/5/2", 2170.78, 2174.12, 2161.14, 2179.65],
        ["2013/5/3", 2179.05, 2205.5, 2179.05, 2222.81],
        ["2013/5/6", 2212.5, 2231.17, 2212.5, 2236.07],
        ["2013/5/7", 2227.86, 2235.57, 2219.44, 2240.26],
        ["2013/5/8", 2242.39, 2246.3, 2235.42, 2255.21],
        ["2013/5/9", 2246.96, 2232.97, 2221.38, 2247.86],
        ["2013/5/10", 2228.82, 2246.83, 2225.81, 2247.67],
        ["2013/5/13", 2247.68, 2241.92, 2231.36, 2250.85],
        ["2013/5/14", 2238.9, 2217.01, 2205.87, 2239.93],
        ["2013/5/15", 2217.09, 2224.8, 2213.58, 2225.19],
        ["2013/5/16", 2221.34, 2251.81, 2210.77, 2252.87],
        ["2013/5/17", 2249.81, 2282.87, 2248.41, 2288.09],
        ["2013/5/20", 2286.33, 2299.99, 2281.9, 2309.39],
        ["2013/5/21", 2297.11, 2305.11, 2290.12, 2305.3],
        ["2013/5/22", 2303.75, 2302.4, 2292.43, 2314.18],
        ["2013/5/23", 2293.81, 2275.67, 2274.1, 2304.95],
        ["2013/5/24", 2281.45, 2288.53, 2270.25, 2292.59],
        ["2013/5/27", 2286.66, 2293.08, 2283.94, 2301.7],
        ["2013/5/28", 2293.4, 2321.32, 2281.47, 2322.1],
        ["2013/5/29", 2323.54, 2324.02, 2321.17, 2334.33],
        ["2013/5/30", 2316.25, 2317.75, 2310.49, 2325.72],
        ["2013/5/31", 2320.74, 2300.59, 2299.37, 2325.53],
        ["2013/6/3", 2300.21, 2299.25, 2294.11, 2313.43],
        ["2013/6/4", 2297.1, 2272.42, 2264.76, 2297.1],
        ["2013/6/5", 2270.71, 2270.93, 2260.87, 2276.86],
        ["2013/6/6", 2264.43, 2242.11, 2240.07, 2266.69],
        ["2013/6/7", 2242.26, 2210.9, 2205.07, 2250.63],
        ["2013/6/13", 2190.1, 2148.35, 2126.22, 2190.1]
      ]);

      var option = {
        title: {
          text: "上证指数",
          left: 0
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"]
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: "dataMin",
          max: "dataMax"
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 50,
            end: 100
          },
          {
            show: true,
            type: "slider",
            y: "90%",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "日K",
            type: "candlestick",
            data: data0.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            },
            markPoint: {
              // label: {
              //   normal: {
              //     formatter: function(param) {
              //       return param != null ? Math.round(param.value) : "";
              //     }
              //   }
              // },
              data: [
                // {
                //   name: "XX标点",
                //   coord: ["2013/5/31", 2300],
                //   value: 2300,
                //   itemStyle: {
                //     normal: { color: "rgb(41,60,85)" }
                //   }
                // },
                // {
                //   name: "highest value",
                //   type: "max",
                //   valueDim: "highest"
                // },
                // {
                //   name: "lowest value",
                //   type: "min",
                //   valueDim: "lowest"
                // },
                // {
                //   name: "average value on close",
                //   type: "average",
                //   valueDim: "close"
                // }
              ],
              // tooltip: {
              //   formatter: function(param) {
              //     return param.name + "<br>" + (param.data.coord || "");
              //   }
              // }
            },
            markLine: {
              symbol: ["none", "none"],
              data: [
                [
                  {
                    name: "from lowest to highest",
                    type: "min",
                    valueDim: "lowest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  },
                  {
                    type: "max",
                    valueDim: "highest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  }
                ],
                // {
                //   name: "min line on close",
                //   type: "min",
                //   valueDim: "close"
                // },
                // {
                //   name: "max line on close",
                //   type: "max",
                //   valueDim: "close"
                // }
              ]
            }
          },
          {
            name: "MA5",
            type: "line",
            data: this.calculateMA(5, data0),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          }
          // {
          //     name: 'MA10',
          //     type: 'line',
          //     data: this.calculateMA(10,data0),
          //     smooth: true,
          //     lineStyle: {
          //         normal: {opacity: 0.5}
          //     }
          // },
          // {
          //     name: 'MA20',
          //     type: 'line',
          //     data: this.calculateMA(20,data0),
          //     smooth: true,
          //     lineStyle: {
          //         normal: {opacity: 0.5}
          //     }
          // },
          // {
          //     name: 'MA30',
          //     type: 'line',
          //     data: this.calculateMA(30,data0),
          //     smooth: true,
          //     lineStyle: {
          //         normal: {opacity: 0.5}
          //     }
          // },
        ]
      };

      dialThree.setOption(option, true);

      //第四个平滑折线图
      var dialFour=this.$echarts.init(document.getElementById("dial-four"));
      var zxBoxOption = {
            // 图例
            legend: {
                data: ['吃饺子', '吃面', '吃饭'],
                icon: 'rect',
                top: 22,
                right: 24,
                itemGap: 15,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    // padding: [0, 0, 0, 5],
                    color: 'rgba(255,255,255,0.87)'
                }
            },
            color: ['#289df5', '#fbc01b', '#ff5050'],
            grid: {
                left: 24,
                right: '6%',
                bottom: '30',
                containLabel: true
            },
            // X轴样式
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    length: 0 // 刻度线的长度
                },
                axisLabel: {
                    interval: 2, // 坐标轴刻度标签的显示间隔，在类目轴中有效。
                    textStyle: {
                        color: '#00c5d7'
                    }
                },
                name: '(时)',
                nameTextStyle: {
                    padding: [24, 0, 0, 0],
                    color: '#00c5d7'
                },
                nameGap: 0,
                data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '20', '23']
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    length: 0 // 刻度线的长度
                },
                splitLine: {
                    lineStyle: {
                        // color: ["#051d5f"],
                        color: ['#094386'],
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#a3a4b2',
                         interval:2,
                    }
                }
            },
            series: [{
                name: '吃饺子',
                type: 'line',
                symbol: 'circle', // 拐点类型
                smooth: true, // 当为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，下面的（吃饭）数据中设置smooth为false，这个就不是光滑的曲线了。
                symbolSize: 3, // 拐点圆的大小
                itemStyle: {
                    normal: {
                        color: '#0bb6db', // 折线条的颜色
                        borderColor: '#0bb6db', // 拐点边框颜色
                    }
                },
                data: ['162', '192', '140', '182', '162', '209', '186', '178', '230', '196', '219', '234', '256', '201', '172', '182', '192', '168', '176', '189', '167', '174', '152', '162', '182', '162']
            }, {
                name: '吃面',
                type: 'line',
                symbol: 'circle', // 拐点类型
                smooth: true,
                symbolSize: 3, // 拐点圆的大小
                itemStyle: {
                    normal: {
                        color: '#fbc016', // 折线条的颜色
                        borderColor: '#fbc016', // 拐点边框颜色
                    }
                },
                data: ['142', '152', '120', '152', '192', '179', '146', '158', '150', '126', '179', '204', '186', '177', '192', '182', '162', '178', '240', '209', '187', '164', '192', '182', '152', '92']
            }, {
                name: '吃饭',
                type: 'line',
                symbol: 'circle', // 拐点类型
                smooth: false,
                symbolSize: 3, // 拐点圆的大小
                itemStyle: {
                    normal: {
                        color: '#ff5050', // 折线条的颜色
                        borderColor: '#ff5050', // 拐点边框颜色
                    }
                },
                data: ['92', '72', '80', '92', '60', '89', '82', '68', '98', '86', '79', '84', '76', '87', '62', '72', '82', '98', '86', '79', '87', '74', '82', '62', '82', '62']
            }]
        };
        dialFour.setOption(zxBoxOption);
    },

    splitData(rawData) {
      var categoryData = [];
      var values = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },

    calculateMA(dayCount, data0) {
      var result = [];
      for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    }
  }
};
</script>
