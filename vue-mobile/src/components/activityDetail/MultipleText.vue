<template>
  <div class="multiple-text">
    <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
    <textarea v-model="valT.value" class="multiple-area" cols="30" rows="10"></textarea>
    <span>{{valT.value?valT.value.length:0 + '/'+ val.limit}}</span>
    <p v-if="check&&!valT.value&&valT.required" class="required-field">{{valT.tip}}必填</p>
  </div>
</template>

<script>
export default{
  name: 'MultipleText',
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
  }
}
</script>

<style lang='scss' scoped>
.multiple-text{
  position:relative;
}
span{
  position: absolute;
  bottom: .4rem;
  right:0;
  font-size: .28rem;
  color: #777777;
  line-height: .4rem;
}
</style>
