<template>
<div>
  <pull-refresh>
    <van-card
    num="2"
    tag="标签"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    :thumb="imageURL"
    origin-price="10.00"
    v-for="(item,index) in classifyList"
    :key="index"
>
    <div slot="footer">
      <van-button size="mini">按钮</van-button>
      <van-button size="mini">按钮</van-button>
    </div>
    </van-card>
  </pull-refresh>
</div>
</template>

<script>
import pullRefresh from '@/components/pullRefresh'

export default {
  name: 'Classify',

  components: {
    pullRefresh
  },

  data() {
    return {
      classifyList: [1, 2, 3, 4, 5, 6],
      imageURL: require('@/pages/classify/img/classify1.jpg')
    }
  },

  methods: {
    btnClick() {
      console.log('执行啦')
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
