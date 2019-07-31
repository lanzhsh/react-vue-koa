<template>
  <div class="cropper-modal">
    <div class="overlay"></div>
    <div class="modal">
      <!-- <div class="modal-head">
        <div class="head-wrap">请选择图片裁剪</div>
      </div> -->
      <div class="modal-content clearfix">
        <div class="img-clip-wrap">
          <h3>裁剪操作框</h3>
          <div class="container-bg" :class="[!img?'no_img':'']">
            <div class="img-container">
              <img id="clip_src_img" @load="srcImgLoaded" :src="img" v-show="img !== null">
              <div class="shadow-box" v-show="img !== null"></div>
              <select-box v-show="img !== null" ref="box" :srcSize="imgSize" :ratio="ratio" :img="img" @selectEnd="selectEnd" @selectChange="selectChange"></select-box>
            </div>
          </div>
          <div class="reset-img">
            <i class="icon-reset"></i>

            <label for="file_input">
              <a class="primary_a">选择图片</a>
            </label>
            <input type="file" id="file_input" ref="file_input" :accept="accept" @change="fileChange">
          </div>
        </div>
        <div class="img-preview-wrap">
          <h3>裁剪预览框</h3>
          <div class="pre-container" :style="{height:320/ratio+'px'}">
            <img id="clip_res_img" :src="img" v-show="img !== null" :style="{height:320/ratio+'px'}">
          </div>
          <!-- <div class="pre-info">预览效果</div> -->
        </div>
      </div>
      <div class="modal-footer">
        <el-button type="default" @click="closeIt">取消</el-button>
        <el-button type="primary" @click="saveToOss" :loading="loading">确认上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectBox from "./selectBox.vue";
import {fileUpdateCro} from "@/utils/fileUpdate";
// import { mapGetters } from "vuex";
export default {
  components: {
    SelectBox
  },
  props: {
    folder: "", //上传文件名
    ratio: {
      default: 5 / 4 // equal to SelectBox's width / height
    },
    maxSize: {
      // 防止上传过大图片，为0表示不限制
      type: Number,
      default: 2
    },
    accept: {
      // 限制上传资源类型
      type: String,
      default: "image/*"
    },
    keepPrue: {
      // 维持用户选择的图片类型及背景，原组件会填充白色背景 例如:上传的透明png图片希望维持透明状态
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      img: null,
      $srcImg: null,
      $resImg: null,
      $input: null,
      $imgContainer: null,
      $preContainer: null,
      loading: false,
      contentType: "image/jpeg",
      nw: 0,
      nh: 0,
      clipData: null,
      // ratio: 5 / 4,
      imgSize: { w: 0, h: 0 },
      containerTop: 0
    };
  },
  mounted() {
    this.$input = this.$el.querySelectorAll("#file_input")[0];
    this.$srcImg = this.$el.querySelectorAll("#clip_src_img")[0];
    this.$resImg = this.$el.querySelectorAll("#clip_res_img")[0];
    this.$imgContainer = this.$el.querySelectorAll(".img-container")[0];
    this.$preContainer = this.$el.querySelectorAll(".pre-container")[0];
    this.$containerBox = this.$el.querySelectorAll(".container-bg")[0];
  },
  methods: {
    selectChange() {
      const rec = this.$refs.box.rec;
      if (rec.w > 0 && rec.h > 0) {
        this.updatePreview();
      }
    },
    selectEnd() {
      const rec = this.$refs.box.rec;
      if (rec.w > 0 && rec.h > 0) {
        this.clip();
      }
    },
    fileChange() {
      // 限制图片大小
      if (this.maxSize) {
        let file = this.$input.files[0];
        let size = file.size;
        let maxSize = this.maxSize * 1024 * 1024;
        if (size > maxSize) {
          this.$input.value = "";
          return this.$message({
            message: `上传文件大小不能超过 ${this.maxSize}MB!`,
            type: "warning"
          });
        }
      }
      const me = this;
      const fd = new FileReader();
      fd.onloadend = function() {
        me.img = fd.result;
        me.contentType = fd.result.split(":")[1].split(";")[0];
      };
      if (this.$input.files && this.$input.files[0]) {
        fd.readAsDataURL(this.$input.files[0]);
      }
    },
    srcImgLoaded() {
      this.nw = this.$srcImg.naturalWidth;
      this.nh = this.$srcImg.naturalHeight;
      this.clearSelect();
      this.setImgSize();
      this.updatePreview();
      this.clip();
    },
    clearSelect() {
      const box = this.$refs.box;
      // console.log('box值为',box);
      box.clearRec();
      this.clipData = null;
    },
    setImgSize() {
      // image's naturalWidth naturalHeight ratio
      const nr = this.nw / this.nh;
      const scw = this.$containerBox.offsetWidth;
      const sch = this.$containerBox.offsetHeight;
      let rw = 0; // select box width
      let rh = 0; // select box height
      if (nr >= this.ratio) {
        this.imgSize.w = scw;
        this.imgSize.h = scw / nr;
        this.containerTop = (sch - this.imgSize.h) / 2;
        rh = this.imgSize.h;
        rw = rh * this.ratio;
      } else {
        this.imgSize.h = sch;
        this.imgSize.w = sch * nr;
        this.containerTop = 0;
        rw = this.imgSize.w;
        rh = rw / this.ratio;
      }
      this.$srcImg.setAttribute(
        "style",
        `width:${this.imgSize.w}px;height:${this.imgSize.h}px;`
      );
      this.$imgContainer.setAttribute(
        "style",
        `width:${this.imgSize.w}px;height:${this.imgSize.h}px;top:${
          this.containerTop
        }px;`
      );
      this.$refs.box.rec = { w: rw, h: rh, l: 0, t: 0 };
    },
    getComputedRec(r) {
      const cw = this.$imgContainer.offsetWidth;
      const ch = this.$imgContainer.offsetHeight;
      const wr = cw / this.nw;
      const hr = ch / this.nh;
      return {
        l: r.l / wr,
        t: r.t / hr,
        w: r.w / wr,
        h: r.h / hr
      };
    },
    updatePreview() {
      const rec = this.$refs.box.rec;
      const pcw = this.$preContainer.offsetWidth;
      const pch = this.$preContainer.offsetHeight;
      const wr = pcw / rec.w;
      const hr = pch / rec.h;
      const w = wr * this.$imgContainer.offsetWidth ;
      const h = hr * this.$imgContainer.offsetHeight;
      const l = -rec.l * wr ;
      const t = -rec.t * hr;
      this.$resImg.setAttribute(
        "style",
        `width:${w}px;height:${h}px;top:${t}px;left:${l}px;`
      );
    },
    clip() {
      let rec = this.$refs.box.rec;
      if (!rec.w || !rec.h) {
        return;
      }
      const bufferCanvas = document.createElement("canvas");
      const bfx = bufferCanvas.getContext("2d");

      const computedRec = this.getComputedRec(rec);
      
      if (!this.keepPrue) bfx.fillStyle = "#fff";

      bufferCanvas.width = Math.ceil(computedRec.w);
      bufferCanvas.height = Math.ceil(computedRec.h);

      if (!this.keepPrue) {
        bfx.fillStyle = "#fff";
        bfx.fillRect(0, 0, rec.w, rec.h);
      }

      bfx.drawImage(
        this.$srcImg,
        -computedRec.l,
        -computedRec.t,
        this.nw + 5,
        this.nh + 5
      );
      // 将canvas的透明背景设置成白色
      // var imageData = bfx.getImageData(0, 0, rec.w, rec.h);
      // for(var i = 0; i < imageData.data.length; i += 4) {
      //     // 当该像素是透明的，则设置成白色
      //     if(imageData.data[i + 3] == 0) {
      //         imageData.data[i] = 255;
      //         imageData.data[i + 1] = 255;
      //         imageData.data[i + 2] = 255;
      //         imageData.data[i + 3] = 255;
      //     }
      // }
      // bfx.putImageData(imageData, 0, 0);

      this.clipData = bufferCanvas.toDataURL(
        this.keepPrue ? this.contentType : "image/jpeg",
        0.95
      );
    },
    saveToOss() {
      if (!this.clipData) {
        this.$message({
          message: "请选择图片",
          type: "warning"
        });
        return;
      }

      this.loading = true;
      setTimeout(() => {
        this.$refs.file_input.value = "";
        const block = this.clipData.split(";");
        // Get the content type of the image
        const contentType = block[0].split(":")[1]; // In this case "image/jpeg"
        // get the real base64 content of the file
        const realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."
        try {
          var blob = this.b64toBlob(realData, contentType);
          // blob转arrayBuffer
          var reader = new FileReader();
          reader.readAsArrayBuffer(blob);
        } catch (err) {
          this.$message({
            message: "上传失败，请检查您的图片是否大于2M",
            type: "warning"
          });
        }
        var that = this;
        reader.onload = function(event) {
          var data = event.target.result;
          //加载图片获取图片真实宽度和高度
          var image = new Image();
          image.onload = function() {
            let width = image.width;
            let height = image.height;

            that.loading = false;
            if (height > 4000 || width > 4000) {
              that.loading = false;
              return that.$message({
                message: "上传失败，裁剪过后图片宽高均不超过4000PX，请重新上传",
                type: "warning"
              });
            } else {
              that.fileUpload({
                target: data,
                blob: blob
              });
              
            }
          };
          image.src = `data:image/png;base64,${realData}`;
        };
      }, 300);
      // Convert it to a blob to upload

      // const formData = new FormData();
      // formData.append('blob', blob);
    },
    fileUpload(params) {
      let that = this;
      fileUpdateCro(
        "jiajiao/manage/" + that.folder + "/",
        params,
        res => {
          that.loading = false;
          if (!res) {
            return;
          }
          that.$emit("pushImg", res);
          // this.$srcImg  = null;
          that.img = null;
          that.clipData = "";
          $('input[type="file"]').val("");
        }
      );
    },
    closeIt() {
      this.img = null;
      this.clipData = "";
      // $('input[type="file"]').val("");
      document.getElementById('file_input').value='';
      this.$emit("closeIt");
    },
    b64toBlob(b64Data, contentType = "", sliceSize = 1) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    //自定义上传图片
    upImg(files) {
      var that = this;
      this.$basesocket.fileUpdateCro(2, files, res => {});
    }
  },
  // computed: {
  //   ...mapGetters(["getLoginInfo"])
  // }
};
</script>

<style scoped>
.primary_a {
  color: #00b5e5;
}
.cropper-modal .modal {
  width: 100%;
  /*height: 482px;*/
  background-color: #fff;
}
.modal-head {
  position: relative;
  text-align: center;
  padding: 0 16px 0 40px;
}
.head-wrap {
  position: relative;
  font-size: 14px;
  color: #222;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e5e9ef;
}
.modal-content {
  padding: 30px 40px 40px;
}
.modal-content h3 {
  margin-bottom: 10px;
}
.modal-content h3 {
  text-align: left;
}
.img-clip-wrap {
  width: 400px;
  height: 320px;
  /* border-right: 1px solid #e5e9ef; */
  float: left;
}
.no_img :hover {
  color: #333;
  cursor: pointer;
}
.container-bg {
  width: 400px;
  height: 320px;
  background-color: #d6d6d6;
  border-radius: 4px;
  overflow: hidden;
}
.container-bg .tips {
  margin-top: 130px;
  text-align: center;
}
.container-bg .tips input[type="file"] {
  opacity: 0;
  height: 60px;
  margin-top: -60px;
  display: block;
  width: 100%;
}
.img-container {
  position: relative;
  height: 0;
  margin: auto;
}
.img-container img {
  position: relative;
  width: 100%;
  height: 100%;
}
.img-container .shadow-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.reset-img {
  position: relative;
  display: inline-block;
  margin-top: 16px;
  color: #6d757a;
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
}
.reset-img input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.reset-img:hover {
  color: #00b5e5;
}
.img-preview-wrap {
  width: 320px;
  float: right;
}
.pre-container {
  width: 320px;
  height: 271px;
  background-color: #d6d6d6;
  overflow: hidden;
  border-radius: 4px;
}
.pre-container img {
  position: relative;
  /* width: 100% !important; */
  height: 100%;
  border-radius: 4px;
}
.pre-info {
  margin-top: 20px;
  font-size: 12px;
  color: #99a2aa;
}
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.modal-footer {
  text-align: right;
  margin-top: 58px;
}
.modal-btn {
  display: inline-block;
  width: 110px;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}
.btn-confirm {
  border: 1px solid #1aad19;
  color: #fff;
  background-color: #1aad19;
}
.btn-confirm:hover {
  background-color: #1aad19;
}
</style>
