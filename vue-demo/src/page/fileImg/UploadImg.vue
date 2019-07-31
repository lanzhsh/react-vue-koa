<template>
<div class="upload-img">
  <el-button @click="openCrop">点我上传图片</el-button>
  <h3>上传的图片为:</h3>
  <img :src="imgSrc" class="img-show" alt="">

  <el-dialog title="上传封面图" :visible.sync="dialogVisible" width="860px" :showClose="false">
      <cropper
        @pushImg="pushImg"
        @closeIt="dialogVisible = false"
        :ratio="375/210"
        folder="uploadImg"
      ></cropper>
    </el-dialog>
</div>
</template>

<script>
import cropper from "@/components/crop";

export default{

name:'uploadImg',

components:{cropper},

data(){
  return{
    dialogVisible: false,
    imgSrc:''
  }
},

methods:{
  openCrop(){
    this.dialogVisible = true;
  },

  //裁剪插件传过来的图片
  pushImg(img) {
    this.dialogVisible = false;
    this.imgSrc = img;
  },
}
}
</script>

<style scoped lang='scss'>
.upload-img{
.img-show{
  width: 300px;
}
}
</style>