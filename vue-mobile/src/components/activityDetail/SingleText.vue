<template>
  <div class="single-text">
    <div>
      <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
      <input class="text-inp inp" type="text" v-model="valT.value"/>
      <div class="tel-valid" v-show="valT.validType">
        <input class="code-inp inp" type="text" v-model="code"/>
        <div class="code-btn">获取验证码</div>
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
      code: ''
    }
  },
  methods: {}
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
