<template>
<div>
  <!-- <head-top titleText="支付成功" :arrowFlag="true"></head-top> -->

  <div class="pay-success">
    <div class="success-icon">
      <van-icon name="passed" />
    </div>
    <div>
      <p class="success-title">支付成功</p>
      <p class="success-content">即将为你跳转</p>
    </div>

  </div>
</div>
</template>

<script>
// import headTop from "@/components/headTop";
import { checkAgent } from '@/utils/check'
import { ImagePreview, Toast } from 'vant'
import wxQrcode from './img/wx-qrcode.png'
import { setTimeout } from 'timers'

export default {
  name: 'PaySuccess',

  components: {
  },

  data() {
    return {}
  },

  mounted() {
    const productType = this.$route.params.productType
    if (productType === 'TEACHER_CARD') {
      setTimeout(() => {
        const agent = checkAgent()
        if (agent === 'Android') {
          location.href =
            'https://cos-jiajiao.aijiatui.com/app/installer/android/IP_of_Teacher_V1.0.apk'
        } else if (agent === 'IOS') {
          location.href =
            'https://itunes.apple.com/cn/app/%E5%90%8D%E5%B8%88ip/id1440961370?mt=8'
        }
      }, 2000)
    } else if (productType === 'COURSE') {
      setTimeout(() => {
        ImagePreview({
          images: [wxQrcode],
          showIndex: false
        })
        setTimeout(() => {
          Toast('长按识别二维码进入小程序')
        }, 500)
      }, 2000)
    }
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
.pay-success {
  padding: ptr(60) ptr(15);
  text-align: center;
}
.success-icon .van-icon {
  color: #1aad16;
  font-size: 60px;
}

.success-title {
  font-size: ptr(40);
  font-weight: 700;
  line-height: ptr(80);
}

.success-content {
  font-size: ptr(30);
  line-height: ptr(40);
}
</style>
