<template>
  <div class="message-box">
    <div
      :class="{'data-dia':curMessageBoxFlag}"
      @touchmove.prevent
    >
      <div v-if="curMessageBoxFlag">
        <div class="dia-text">
          <p class="one-title">数据说明</p>
          <ul slot="text">
            <li
              v-for="(item,index) in diaData"
              :key="index"
            >
              <p class="two-title">{{item.title}}</p>
              <p class="text">{{item.text}}</p>
            </li>
          </ul>
        </div>
        <img
          slot="footer"
          class="dia-img"
          src="@/assets/img/overview_dia_close.png"
          alt
          @click="messageBoxFlag=false"
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MessageBox',

  props: {
    messageBoxFlag: {
      type: Boolean,
      value: false
    },

    diaData: {
      type: Array,
      value: []
    }
  },

  data() {
    return {
      curMessageBoxFlag: false
    }
  },

  watch: {
    messageBoxFlag(val) {
      this.curMessageBoxFlag = val
    }
  },

  methods: {
  }
}
</script>

<style scoped lang='scss'>
//数据说明弹窗
.data-dia {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 6;
  padding: 0 0.48rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  .dia-text {
    padding: 0.4rem 0.4rem 0.28rem;
    background: #ffffff;
    border-radius: 6px;
  }
  li {
    margin-bottom: 0.16rem;
  }
  .dia-img {
    display: block;
    width: 0.68rem;
    padding-top: 0.32rem;
    margin: 0 auto;
  }
  .one-title {
    text-align: center;
    font-size: 0.36rem;
    line-height: 0.5rem;
    font-weight: 700;
  }
  .two-title {
    font-size: 0.36rem;
    line-height: 0.5rem;
    font-weight: 700;
  }
  .text {
    font-size: 0.24rem;
    line-height: 0.34rem;
  }
}
</style>
