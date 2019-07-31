<template>
  <div>
    <head-top titleText="支付方式列表页" :arrowFlag="true"></head-top>

    <div class="pay">

      <van-cell-group>
        <van-cell title="订单编号：" :value="payInfo.orderId" />
        <van-cell title="订单内容：" :value="payInfo.productName" />
        <van-cell title="需支付：" :value="payInfo.payFee/100" />
        <van-cell title="已支付：" value="0.00" />
        <van-cell title="待支付：" :value="payInfo.payFee/100" />
      </van-cell-group>

      <div class="pay-limit clearfix">
        <div class="limit-left"><img src="./img/wx-pay-icon.jpg" alt=""></div>
        <div class="limit-right">
          <p>微信支付</p>
          <!-- <p>单笔限额10000元</p> -->
        </div>
      </div>

      <div class="pay-check">
        <van-checkbox v-model="checked" checked-color="#4b0">
        </van-checkbox>
        <div class="check-text">
          我已经阅读并同意
          <a class="pay-protocol" href="./static/protocol.pdf">《名师IP会员服务协议》</a>
        </div>
      </div>

      <div class="pay-btn">
        <van-button size="large" type="primary" @click="immediatePay">微信支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/headTop'
export default {
  name: 'Pay',

  components: {
    headTop
  },

  data() {
    return {
      payInfo: {
        orderId: '',
        productName: '',
        payFee: '',
        productType: ''
      },
      checked: false,
      prepay: {},
      action: '',
      actionLog: '',
      params: '',
      openIdPar: '',
      orderIdPar: ''
    }
  },

  mounted() {
    // 获取页面参数
    this.openIdPar = this.$route.query.openId || 'oCxqU0oIGabayAxUO2pMmFizzznU'
    this.orderIdPar = this.$route.query.orderId || '514041036532613120'
    this.$request({
      url: this.$api.orderInfo,
      method: 'get',
      params: { orderId: this.orderIdPar }
    }).then(res => {
      this.payInfo.orderId = res.data.orderId
      this.payInfo.productName = res.data.productName
      this.payInfo.payFee = res.data.payFee
      this.payInfo.productType = res.data.productType
    })
  },

  methods: {
    immediatePay() {
      if (!this.checked) {
        this.$toast('请先勾选名师IP服务协议')
        return false
      }

      this.$request({
        url: this.$api.orderPay,
        method: 'post',
        data: {
          openId: this.openIdPar,
          orderId: this.orderIdPar,
          tradeType: 'JSAPI'
        }
      }).then(res => {
        if (!res.code) {
          this.prepay = res.data.prepay
          if (!typeof WeixinJSBridge) {
            if (document.addEventListener) {
              document.addEventListener(
                'WeixinJSBridgeReady',
                this.onBridgeReady,
                false
              )
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
            }
          } else {
            this.onBridgeReady()
          }
        }
      })
    },

    onBridgeReady() {
      const _this = this
      const prepay = _this.prepay
      var params = {
        appId: prepay.appId, // 公众号名称，由商户传入
        timeStamp: prepay.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: prepay.nonceStr, // 随机串
        package: prepay.packageStr,
        signType: prepay.signType, // 微信签名方式：
        paySign: prepay.sign // 微信签名
      }
      WeixinJSBridge.invoke('getBrandWCPayRequest', params, function(res) {
        console.log(res)
        // this.actionLog = res;
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          _this.$router.push({
            name: 'PaySuccess',
            params: { 'productType': _this.payInfo.productType }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.pay {
  background: rgb(248, 249, 251);
}

.pay-limit {
  padding: 10px 15px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.limit-left{
  float: left;
  width: 50%;
}

.limit-left img {
  float: left;
  // width: ptr(80);
  // height: ptr(80);
  width:40px;
  height: 40px;
}

.limit-right {
  float: left;
  font-size: 14px;
  color: #333;
}

.limit-right p {
  line-height: 40px;
}

.pay-check {
  padding: ptr(140) ptr(15) ptr(10);
  font-size: 14px;
  color: #333;
}

.check-text{
  margin-left:ptr(30);
  float:left;
}

.pay-protocol {
  color: #1989fa;
}

.pay-btn {
  padding: 0 ptr(15);
}
</style>

<style lang="scss">
.pay .van-cell__value {
  text-align: left;
}

.pay-check .van-checkbox{
  float:left;
}
</style>
