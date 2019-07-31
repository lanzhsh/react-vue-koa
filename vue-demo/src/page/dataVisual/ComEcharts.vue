<template>
<div>
  <div id="histogram"></div>
  <div id="pie-chart"></div>
  <div id="line-chart"></div>
</div>
</template>

<style lang="scss" scoped>
#histogram,
#pie-chart,
#line-chart {
  display: inline-block;
  width: 400px;
  height: 400px;
}
#pie-chart{
  width: 400px;
  height:200px;
}
</style>


<script>
import initEchart from '@/utils/mixin/chart';
export default {
  mixins:[initEchart],
  data() {
    return {}
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 柱状图
      this.drawbar(["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
       [5, 20, 36, 10, 10, 20], "histogram");

      //扇形图
      let pieArr=[
        { name: "男", percent: 40, number: 40 },
        { name: "女", percent: 40, number: 40 },
        { name: "未知", percent: 10, number: 10 },
      ]
      this.drawpie(...pieArr, 'pie-chart');

      //折线图
      this.drawline(["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
       [5, 20, 36, 10, 10, 20], "line-chart");
    }
  }
};

console.log('执行啦')
</script>
