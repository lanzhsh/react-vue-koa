<template>
  <div class="text-editor">
    <vue-editor v-model="content"></vue-editor>
    <span>{{content}}</span>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import $ from "jquery";
export default {
  name: "UE",

  components: { VueEditor },

  data() {
    return {
      content: "<h1>我是标题1</h1>"
    };
  },

  mounted() {},

  methods: {
  destroyed() {}
  }
};
</script>

<style lang="scss">
.text-editor {
  .save-editor {
    margin-left: 70%;
  }
  .editor-text {
    text-align: left;
  }
}
</style>