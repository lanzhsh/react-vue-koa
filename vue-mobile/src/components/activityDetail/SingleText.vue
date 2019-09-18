<template>
  <div class="single-text">
    <div>
      <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
      <input class="text-inp inp" type="text" v-model="valT.value"/>
      <div class="tel-valid" v-show="valT.validType">
        <input class="code-inp inp" type="number" v-model="valT.code" placeholder=""/>
        <div class="code-btn" @click="handleSendSMS" v-if="this.countDownText==='获取验证码'">{{countDownText}}</div>
        <div class="code-btn" @click="handleSendSMS" v-else>{{countDownText}}</div>
      </div>
      <p v-if="check&&!valT.value&&valT.required" class="required-field">{{valT.tip}}必填</p>
      <p v-if="check&&!code&&valT.validType" class="required-field">验证码必填</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleText',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      check: false,
      code: '',
      countDownSec: ''
    }
  },
  computed: {
    countDownText() {
      return this.countDownSec <= 0 ? '获取验证码' : this.countDownSec + 'S' + '再发送'
    }
  },
  methods: {
    // 发送验证短信
    handleSendSMS() {
      if (this.countDownSec) {
        return
      }
      this.countDown()
    },
    countDown() {
      const me = this
      me.countDownSec = 60
      let timer = null
      function t() {
        if (me.countDownSec <= 0) {
          clearTimeout(timer)
        } else {
          me.countDownSec--
          timer = setTimeout(t, 1000)
        }
      }
      timer = setTimeout(t, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
.single-text {
  .text-inp {
    width: 100%;
    height: 0.76rem;
    margin-bottom: 0.16rem;
  }
  .tel-valid {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.16rem;
  }
  .code-inp {
    width: 50%;
    height: 0.76rem;
    margin-right: 0.16rem;
  }
  .code-btn {
    width: 50%;
    height: .76rem;
    font-size: .32rem;
    color: #1aad19;
    line-height: .76rem;
    text-align: center;
    border: 1px solid #1aad19;
    border-radius: 4px;
  }
}
</style>
