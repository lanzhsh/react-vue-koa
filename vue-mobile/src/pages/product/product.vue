<template>
  <div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true"/>

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <van-button @click="onComfirmClick">确认</van-button>
    <van-button @click="onInfoClick">提示</van-button>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  originCondition: 0,
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000
}

export default {
  name: 'Product',

  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      items: [],
      loadNext: false
    }
  },

  mounted() {
    for (var i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.')
    }
    this.top = 1
    this.bottom = 20
  },

  methods: {
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange(code) {
      this.coupons.push(coupon)
    },
    onComfirmClick() {
      this.$confirm({
        confirmTxt: '确定',
        cancelTxt: '取消',
        onConfirm: () => {
          console.log('确认执行')
        }
      })
    },
    onInfoClick() {
      this.$messageBox({
        diaData: ['这是提示']
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.row {
  height: 50px;
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #444;
  background-color: #fff;
}

</style>
