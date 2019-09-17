<template>
  <div>
    <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
    <nut-radiogroup v-model="radioGroupVal">
      <nut-radio v-for="(item,index) in val.radio" :key="index" class="my-radio" :label="item.name">{{item.name}}</nut-radio>
    </nut-radiogroup>
    <p v-if="check&&!valT.value&&valT.required" class="required-field">{{valT.tip}}必选</p>
  </div>
</template>

<script>
export default{
  name: 'SingleSel',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      radioGroupVal: '',
      check: false,
      radioSel: ''
    }
  },
  watch: {
    radioGroupVal(val) {
      this.valT.value = val
    }
  },
  methods: {}
}
</script>

<style>

</style>
