<template>
<div>
  <draggable :list="tableData" @update="datadragEnd" :options = "{animation:500}">
    <transition-group>
      <div v-for="element in colors" :key="element.text" class = "drag-item">
        {{element.text}}
      </div>   
    </transition-group>
  </draggable>
</div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Drag",

  components: {
    draggable
  },

  data() {
    return {
      tableData:[],
      msg: "这是测试组件",
      colors: [
        {
          text: "Aquamarine12"
        },
        {
          text: "Hotpink"
        },
        {
          text: "Gold"
        },
        {
          text: "Crimson"
        },
        {
          text: "Blueviolet"
        },
        {
          text: "Lightblue"
        },
        {
          text: "Cornflowerblue"
        },
        {
          text: "Skyblue"
        },
        {
          text: "Burlywood"
        }
      ],
      startArr: [],
      endArr: [],
      count: 0
    };
  },

  methods: {
    getdata(evt) {
      console.log(evt.draggedContext.element.text);
    },

    datadragEnd(evt) {
      evt.preventDefault();
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      console.log(this.colors);
    },
  }
};
</script>

<style scoped lang='scss'>
</style>