<template>
  <div class="custom-editor">
    <div class="editor-inp" id="editor-inp" ref="customEditor" contenteditable="true" @change="change"></div>

    <div class="editor-img">
      <el-upload
        class="upload-demo"
        action
        :before-upload="beforeAvatarUpload"
        :http-request="httpRequest"
      >
        <el-button class="img-btn" icon="el-icon-picture" size="small" type="primary">点击上传图片</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>

export default {
  name: "customEditor",

  data() {
    return {};
  },

  methods: {
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式或png格式!");
      }
      if (isJPG) {
        this.$refs.customEditor.innerHTML +=
        `<br><img src="/static/img/avactor.66c4498.png">`;
      }
      return isJPG;
    },

    httpRequest() {},

    change(){
      console.log('改变触发啦');
    }
  }
};
</script>

<style lang='scss'>
.custom-editor {
  width: 100%;
  height: 500px;

  //自定义输入框
  .editor-inp {
    text-align:left;
    height: 480px;
    border: 1px solid #dcdfe6;
    overflow: auto;
    img{
      width: 200px;
    }
  }

  //图片按钮
  .el-upload--text{
    width:100%;
    .img-btn{
      display:inline-block;
      width:100%;
    }
  }

  //去掉上传列表
  .el-upload-list{
    display:none;
  }
}
</style>