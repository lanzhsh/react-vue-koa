<template>
  <div class="upload-img">
    <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}最多{{valT.maxNum}}张</div>
    <div class="upload">
      <nut-imagepicker
        @imgMsg="imgMsg"
        :ismultiple="true"
        :width="72"
        :height="72"
      >
      </nut-imagepicker>
    </div>
  </div>
</template>

<script>
export default{
  name: 'UploadImg',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      check: false
    }
  },
  methods: {
    imgMsg(data) {
      console.log(`data值为${data}`)
    }
  }
}
</script>

<style lang='scss' scoped>
.upload{
  padding: .08rem 0;
}
</style>
