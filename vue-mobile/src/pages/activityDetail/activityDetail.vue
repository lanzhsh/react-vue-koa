<template>
  <div class="activity-detail">
    <div
      class="activity-item"
      v-for="(item,index) in mockJson.controlInfoList"
      :key="index">
      <title-text v-if="item.type===1" :val="item"></title-text>
      <single-text v-if="item.type===2" :val="item"></single-text>
      <multiple-text v-if="item.type===3" :val="item"></multiple-text>
      <time-point v-if="item.type===4" :val="item"></time-point>
      <date-range v-if="item.type===5" :val="item"></date-range>
      <address-sel v-if="item.type===6" :val="item"></address-sel>
      <single-sel v-if="item.type===7" :val="item"></single-sel>
      <multiple-sel v-if="item.type===8" :val="item"></multiple-sel>
      <drop-box v-if="item.type===9" :val="item"></drop-box>
      <upload-img v-if="item.type===10" :val="item"></upload-img>
      <text-instruct v-if="item.type===12" :val="item"></text-instruct>
      <preview-img v-if="item.type===13" :val="item"></preview-img>
      <static-map v-if="item.type===14" :val="item"></static-map>
      <place-operat v-if="item.type===15" :val="item"></place-operat>
    </div>
    <div class="activity-bottom">
      <p class="bottom-info">如果遇到问题，可前往首页联系在线客服。</p>
      <div class="bottom-btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
const path = require('path')
const files = require.context('@/components/activityDetail', false, /\.vue$/)
const modules = {}
console.log(path)
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  modules[name] = files(key).default || files(key)
})

export default{
  name: 'ActivityDetail',
  components: modules,
  data() {
    return {
      mockJson: {
        theme: 7, // 主题
        headerTitle: '', // 表单名称
        headerTitleShow: 'show', // 表单名称是否显示
        headerDesc: '', // 表单描述
        headerImgCustor: '', // 自定义图片
        controlActiveIndex: null, // 当前被激活尝试操作的组件索引
        controlActiveType: '', // 当前被激活的组件类型
        controlInfoList: [ // 组件内容列表
          {
            name: '单行文本',
            type: 2,
            tip: '手机号',
            limit: 11,
            validType: 1, // 是否验证手机号
            required: true
          },
          {

            name: '多行文本',
            type: 3,
            tip: '多行文本',
            limit: 300, // 字数限制的初始值
            required: true
          },
          {
            name: '标题',
            type: 1,
            tip: '标题',
            unabled: true
          },
          {
            name: '时间',
            type: 4,
            tip: '时间',
            required: true
          },
          {
            name: '日期',
            type: 5,
            required: true,
            tip: '日期'
          },
          {
            name: '下拉框',
            type: 9,
            active: '1',
            tip: '下拉框',
            radio: [
              {
                id: '', name: '选项一'
              },
              {
                id: '', name: '选项二'
              }
            ],
            required: true
          },
          {
            name: '单项选择',
            type: 7,
            active: '1',
            tip: '性别/自定义',
            radio: [
              {
                id: '', name: '男/选项一'
              },
              {
                id: '', name: '女/选项二'
              }
            ],
            required: true,
            radioType: '1' // 1-自定义 2-性别
          },
          {
            name: '多项选择',
            type: 8,
            tip: '多项选择',
            radio: [
              {
                id: '1', name: '选项一'
              },
              {
                id: '2', name: '选项二'
              }
            ],
            required: true,
            active: '1'
          },
          {
            name: '上传图片',
            type: 10,
            active: '1',
            only_m: true,
            only_p: true,
            tip: '',
            maxNum: 4,
            required: true
          },
          {
            name: '地址',
            type: 6,
            active: '1',
            tip: '地址',
            type_a: 1,
            required: true
          },
          {
            name: '文字说明',
            type: 12,
            tip: ''
          },
          {
            name: '图片预览',
            type: 13,
            url: 'https://resource.aijiatui.com/ai-img/img/word_file.png'
          },
          {
            name: '静态地图',
            type: 14,
            address: '',
            companyAddress: '',
            size: 35,
            required: true
          },
          {
            name: '分隔符',
            type: 15,
            display: 'show',
            pos: 'center',
            height: 32
          }
        ],
        shareTitle: '', // 表单分享标题
        shareDesc: '', // 表单分享描述
        shareImgUrl: '' // 表单分享图片
      },
      formId: '',
      context: []
    }
  },
  mounted() {
    this.formListUser()
  },
  methods: {
    formListUser() {

    },

    submit() {
      this.$children.forEach(item => {
        // console.log(`item值为${item.check}`)
        item.check = true
      })
    }
  }
}
</script>

<style lang='scss'>
.activity-detail{
  padding:0 .24rem .43rem;
  input,textarea{
    font-size:.16rem;
  }
  .activity-bottom{
    padding-top:.08rem;
    .bottom-info{
      font-size: .14rem;
      color: #333333;
      text-align:center;
      line-height: .2rem;
    }
    .bottom-btn{
      width:3.27rem;
      height:.4rem;
      background: #3968D4;
      border-radius: 4px;
      border-radius: 4px;
      font-size: .16rem;
      line-height: .4rem;
      color: #FFFFFF;
      text-align: center;
    }
  }

  // 公共样式
  .two-title{
    padding: 0.08rem 0 0.06rem 0;
    font-size: .13rem;
    color: #777777;
    line-height: .18rem;
  }
  .inp{
    padding:0;
    border: 1px solid #D5D5D5;
    border-radius: 4px;
  }
  .multiple-area{
  width:100%;
  height:1.6rem;
  padding:0;
  border: 1px solid #D5D5D5;
  border-radius: 4px;
  }
  .text-req:before {
    content: "* ";
    color: #ff3939;
  }
  .text-inp {
    width: 100%;
    height: 0.76rem;
    margin-bottom: 0.08rem;
  }
  .sel-inp{
    position: relative;
  }
  .text-img{
    position:absolute;
    right: .16rem;
    bottom:.5rem;
    width:.32rem;
    height:.32rem;
  }
  .required-field{
    font-size: .12rem;
    color:#ff3939;
    margin:0;
    padding: .04rem 0 .04rem;
  }

  // 覆盖插件样式
  // 单选框
  .nut-radio.my-radio input:checked {
    background-image: -webkit-radial-gradient(circle,#fff 0,#fff 50%,#f0250f 60%);
    background-image: radial-gradient(circle,#fff 0,#fff 50%,#f0250f 60%);
    background-size: 50% 50%;
    border: none;
  }
  .nut-radio.my-radio.nut-radio-size-base input{
    width:.32rem;
    height:.32rem;
  }
  // 复选框
  .nut-checkbox.nut-checkbox-size-base input{
    width:.32rem;
    height:.32rem;
  }
  .nut-checkboxgroup{
    display:flex;
  }
  // 图片上传
  .nut-imagepicker .img-list .add-icon{
    border: 1px solid #D5D5D5;
    border-radius: 4px;
    border-radius: 4px;
  }
  .nut-imagepicker .img-list .add-icon i{
    width:12px;
    height: 12px;
    color:#999999;
  }
}

</style>
