<template>
<div class="main">
  <pull-refresh>
    <div class="main-swiper">
      <van-swipe :autoplay="2000" @change="onChange" :width="750" :height="400">
        <van-swipe-item v-for="(item,index) in swiperList" :key="index">
          <img :src="item" @click="toShopDetail(index)">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="main-product">
      <div v-for="(item,index) in productList" :key="index">
        <img :src="item">
      </div>
    </div>

    <div class="my-pie">
      <div id="pie-chart"></div>
      <div class="clue-lengend chart-lengend">
          <ul class="lengend-one clue-lengend-list">
            <li class="one" v-for="(item,index) in pieConfigData.nameData" :key="index">
              <span :style="{background:pieConfigData.colorData[index]}"></span>
              <p>{{item}}</p>
            </li>
          </ul>
        </div>
    </div>

    <div class="line-box">
      <div id="my-line"></div>
    </div>

    <div class="bar-box">
      <div id="my-bar"></div>
    </div>
  </pull-refresh>
</div>
</template>

<script>
import pullRefresh from '@/components/pullRefresh'
import { drawpie, drawline, drawbar } from './echarts'
import bannerOne from '@/pages/main/img/banner1.jpg'
import bannerTwo from '@/pages/main/img/banner2.jpg'
import productOne from '@/pages/main/img/product1.jpg'
import productTwo from '@/pages/main/img/product2.jpg'
import productThree from '@/pages/main/img/product3.jpg'
import productFour from '@/pages/main/img/product4.jpg'
export default {
  name: 'MainPage',

  components: {
    pullRefresh
  },

  data() {
    return {
      swiperList: [bannerOne, bannerTwo],
      productList: [productOne, productTwo, productThree, productFour],
      pieConfigData: []
    }
  },

  mounted() {
    console.log(' main 的mounted执行啦')
    this.initPie()
    this.initLine()
    this.initBar()
  },

  methods: {
    onChange(index) {
    },

    // 去商品详情页
    toShopDetail(index) {
      console.log('index值为', index)
      this.$router.push({
        path: '/productDetail'
      })
    },

    initPie() {
      this.pieConfigData = {
        nameData: ['企业文章', '获客海报', '递名片', '活动分发', '其他'],
        legendData: [
          '企业文章占\n\n比30%',
          '获客海报占\n\n比20%',
          '递名片占\n\n比20%',
          '活动分发占\n\n比20%',
          '其他占比\n\n20%'
        ],
        numberData: [3, 2, 2, 2, 2],
        colorData: [
          '#447FF7',
          '#2edeff',
          '#8848ff',
          '#35d28d',
          '#f7d23b'
        ],
        formatter: '{b|{b}}\n\n',
        id: 'pie-chart',
        padding: -66
      }
      drawpie(this.pieConfigData)
    },

    initLine() {
      const xpoints = ['01', '02', '03', '04', '05', '06', '07']
      const ypoints = [10, 15, 52, 48, 48, 48, 48]
      drawline(xpoints, ypoints, 'my-line')
    },

    initBar() {
      const xpoints = ['01', '02', '03', '04', '05', '06', '07']
      const ypoints = [10, 15, 52, 48, 48, 48, 48]
      drawbar(xpoints, ypoints, 'my-bar')
    }
  }
}
</script>

<style scoped lang='scss'>
.main{
  margin-bottom:1.4rem;
}
.main-swiper{
  width:ptr(750);
  height:ptr(400);
}

.van-swipe{
  height:ptr(400);
}

.main-product{
  display:flex;
}

.main-product img{
  box-sizing: border-box;
  width:ptr(187.5);
  padding:ptr(10);
}

#pie-chart {
  width: 7.5rem;
  height: 5.4rem;
  margin-left: -0.3rem;
}

//图表公共样式
  .chart-lengend {
    position: relative;
    top: -0.7rem;
    margin-bottom: -0.8rem;
    z-index:2;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding:0 .2rem;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 0.24rem;
        span {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 0.04rem;
        }
        p {
          margin-left: 0.08rem;
          font-size: 0.24rem;
          color: #999999;
          line-height: 0.34rem;
        }
      }
    }
    li:nth-of-type(2),
      li:nth-of-type(5) {
        margin: 0 0.6rem 0.24rem;
      }
      p {
        width: 1.2rem;
      }
  }

.line-box{
  padding:.1rem .4rem;
}
#my-line {
  width: 6.4rem;
  height: 3.8rem;
  padding:0 0 .6rem;
  margin: 0 -0.25rem;
}

.bar-box{
  padding:.1rem .4rem;
}
#my-bar {
  width: 6.4rem;
  height: 3.8rem;
  padding:0 0 .6rem;
  margin: 0 -0.25rem;
}
</style>
