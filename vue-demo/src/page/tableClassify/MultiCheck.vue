<template>
  <div class="multi-check">
    <multi-check-com :oneCheckData="oneCheckData" :oneCheckInit="oneCheckInit"></multi-check-com>
  </div>
</template>

<script>
import multiCheckCom from 'vue-multiple-check';
export default {
  name: "multiCheck",

  components:{multiCheckCom},

  data() {
    return {
      oneCheckData:[
        {
          id: 1,
          name: "湖北省",
          content: [
            { id: 1, name: "武汉市" },
            { id: 2, name: "黄冈市" },
            { id: 3, name: "荆门市" }
          ]
        },
        {
          id: 2,
          name: "广东省",
          content: [
            { id: 1, name: "广州市" },
            { id: 2, name: "深圳市" },
            { id: 3, name: "佛山市" }
          ]
        },
        {
          id: 3,
          name: "江西省",
          content: [
            { id: 1, name: "南昌市" },
            { id: 2, name: "赣州市" },
            { id: 3, name: "九江市" }
          ]
        }
      ], //一级复选数组
      oneCheckInit:[
        {
          id: 1,
          name: "湖北省",
          content: [
            { id: 1, name: "武汉市" },
            { id: 2, name: "黄冈市" },
            { id: 3, name: "荆门市" }
          ]
        },
        {
          id: 2,
          name: "广东省",
          content: [{ id: 1, name: "广州市" }, { id: 2, name: "深圳市" },{ id: 3, name: "佛山市" }]
        }
      ],
    };
  },

  methods: {}
};
</script>

<style scoped lang='scss'>
</style>