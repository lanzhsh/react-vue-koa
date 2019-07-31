<template>
  <div class="upload-file">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传doc,xls,ppt文件，且不超过2MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "uploadFile",

  data() {
    return {};
  },

  methods: {
    beforeAvatarUpload(file) {
      console.log('file值为',file);
      console.log('file.name.substr(-3,3)值为',file.name.substr(-3,3));
      const isJPG = file.name.substr(-3,3) === "doc"
            ||file.name.substr(-3,3) === "xls"
            ||file.name.substr(-3,3) === "ppt"
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传文件只能是doc,xls,ppt文件!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped lang='scss'>
</style>