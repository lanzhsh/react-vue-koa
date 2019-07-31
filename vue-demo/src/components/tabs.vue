<template>
<div :class="['tabs',{'tabs-collapse':isCollapse}]">

<el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSel" :collapse="isCollapse"
 background-color="rgb(48, 65, 86)" text-color="rgb(191, 203, 217)" active-text-color="rgb(64, 158, 255)" :collapse-transition="false">
  <div v-for="(item,index) in tabArr" :key="index">
  <el-submenu :index="String(index+1)" v-if="item.childFlag">
    <template slot="title">
      <i :class="['iconfont',item.icon]"></i>
      <span slot="title" v-if="!isCollapse">{{item.name}}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item :index="itemChild.index" v-for="(itemChild,indexChild) in item.tabChild" :key="indexChild">{{itemChild.content}}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item :index="String(index+1)" v-else>
    <i :class="['iconfont',item.icon]"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
  </div>
</el-menu>
</div>
</template>

<script>
import {isObjectEqual} from '@/utils/check'
export default {
  props:{
    isCollapse:{
      type:Boolean,
      value:true
    }
  },
  data() {
    return {
      // isCollapse: true,
      closeFlag: false,
      tabArr: [
        {
          name: "数据可视化",
          icon:"icon-shuju",
          childFlag: true,
          tabChild: [
            { index: "1-1", content: "普通echarts", routerData: "comEcharts" },
            { index: "1-2", content: "特殊echarts", routerData: "speEcharts" },
            { index: "1-3", content: "地图", routerData: "map" }
          ]
        },
        {
          name: "表格",
          icon:"icon-biaoge",
          childFlag: true,
          tabChild: [
            { index: "2-1", content: "普通表格", routerData: "comTable" },
            { index: "2-2", content: "可编辑表格", routerData: "speTable" },
            { index: "2-3", content: "表格合并", routerData: "mergeTable" },
            { index: "2-4", content: "拖拽", routerData: "drag" },
            { index: "2-5", content: "复选框", routerData: "multiCheck" },
          ]
        },
        //只有一级目录配置
        // { name: "富文本编辑器",icon:"icon-fuwenben", childFlag: false, routerData: "textEditor" },
        { name: "文本",icon:"icon-fuwenben", childFlag: true, 
        tabChild: [
            { index: "3-1", content: "富文本", routerData: "textEditor" },
            { index: "3-2", content: "自定义输入", routerData: "customEditor" }
          ]
        },
        { name: "文件和图片",icon:"icon-tupian", childFlag: true, 
        tabChild: [
            { index: "4-1", content: "传文件", routerData: "uploadFile" },
            // { index: "4-2", content: "传文件到云", routerData: "fileCloud" },
            // { index: "4-3", content: "传图片", routerData: "uploadImg" },
          ]
        },
      ],

      routeArr:[]
    };
  },
  mounted() {
    this.$router.push({ path: "/comEcharts" });
  },

  methods: {
    handleOpen(key, keyPath) {},

    handleClose(key, keyPath) {},

    handleSel(key, keyPath) {
      if (keyPath.length==1) {
        //判断是否新开
        if(this.tabArr[key-1].name!="新开一个页面"){
        this.$router.push({ path: "/"+this.tabArr[key-1].routerData });
        //贮存routeObj值
        this.pushRoute({name:this.tabArr[key-1].name,routerData:this.tabArr[key-1].routerData,type:"info"});
        this.$emit('presentRoute',[this.tabArr[key-1].name]);
        }else{
          window.open(window.location.origin+'/'+this.tabArr[key-1].routerData);
        }
      } else {
        this.tabArr[keyPath[0] - 1].tabChild.forEach(item => {
          if (item.index == keyPath[1]){
            this.pushRoute({name:item.content,routerData:item.routerData,type:"info"});
            this.$router.push({ path: "/" + item.routerData });
            this.$emit('presentRoute',[this.tabArr[keyPath[0] - 1].name,item.content]);
          }
        });
      }
    },

    changeTabs() {
      this.isCollapse ? (this.closeFlag = false) : (this.closeFlag = true);
      this.isCollapse = !this.isCollapse;
    },

    /**
     * 将页面改变的路由路径和名称放入数组
     * routeObj是一个对象,有name和routeData属性
     */ 
    pushRoute(routeObj){
      let routeFlag=this.routeArr.some((item,index)=>{
        let flag=isObjectEqual(item,routeObj);
        return flag;
      });
      if(!routeFlag) this.routeArr.push(routeObj);
      this.$emit('tabsRoute',this.routeArr);
    }
  }
};
</script>


<style lang="scss">
/*覆盖组件样式*/
.el-menu-vertical-demo {
  height: 600px;
  width: 54px;
  text-align: left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-item:hover,.el-submenu__title:hover{
  background-color: #1f2d3d!important;
}
.el-menu-item-group__title{
  display:none;
}

.tabs {
  .open-tabs {
    width: 180px;
    height: 56px;
    line-height: 56px;
    text-align: left;
    color: rgb(191, 203, 217);
    background-color: rgb(48, 65, 86);
    padding-left: 10px;
    cursor: pointer;
  }
  .close-tabs {
    width: 34px;
  }
  .tabs-content {
    margin-left: 10px;
  }
}
</style>