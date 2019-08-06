<template>
<div class="shop-cart">
  <van-swipe-cell :right-width="65" :left-width="65" :on-close="onClose">
  <span class="cart-sel" slot="left">选择</span>
  <van-cell-group>
    <van-cell title="单元格" value="内容" />
  </van-cell-group>
  <span class="cart-del" slot="right">删除</span>
</van-swipe-cell>

<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  /> -->
  <div v-for="item in list" :key="item">{{item}}</div>
</van-list>
</van-pull-refresh>
</div>
</template>

<script>
export default {
  name: 'Shopcart',

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },

  mounted() {
    console.log('shopCart 的 mounted 触发了')
  },

  activated() {
    console.log('shopCart 的 mounted 触发了')
  },

  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
          })
          break
      }
    },

    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },

    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style scoped lang='scss'>
.cart-sel,.cart-del{
  width:65px;
  height: 44px;
  float:left;
  background:#F44d;
  color:#ffffff;
  font-size:26px;
  line-height:44px;
  text-align:center;
}
.van-list{
  margin-bottom:ptr(160);
  div{
    font-size:ptr(16);
    line-height:ptr(40);
    text-align:center;
  }
}
</style>
