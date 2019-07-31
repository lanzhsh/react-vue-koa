<template>
  <div class="home">
    <div class="top">
      <div :class="['top-left',{'top-left-shrink':!shrinkFlag}]">
        <img class="top-img" src="../assets/avactor.png" alt>
        <span class="top-name">vue-ts-template</span>
      </div>
      <span class="top-shrink" @click="spreadShrink">
        <i v-if="shrinkFlag" class="iconfont icon-sidebar-toggle"></i>
        <i v-else class="iconfont icon-sanhengxian"></i>
      </span>
      <span class="top-crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) in crumbData" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </span>

      <div class="top-right">
        <!-- <div class="right-full" @click="fullScreen"><span class="iconfont icon-quanping"></span></div> -->
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <img class="login-img" src="../assets/avactor.png" alt>
            <span class="login-text">用户</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="loginOut">退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div :class="['tab',{'tab-collapse':!shrinkFlag}]">
      <tabs :isCollapse="!shrinkFlag" @tabsRoute="tabsRoute" @presentRoute="presentRoute"></tabs>
    </div>

    <div :class="['router-child',{'router-child-shrink':!shrinkFlag}]">
      <div class="nav-level">
        <span v-for="(tag,index) in tags" :key="index">
          <el-tag closable @close="handleClose(tag)" :type="tag.type" @click="clickTag(index)">{{tag.name}}</el-tag>
        </span>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator";
import tabs from "@/components/tabs.vue";

@Component({
  components: { tabs }
})
export default class Home extends Vue {
  private tags?: any;
  private shrinkFlag?: boolean;
  private crumbData?: any;
  private n?: number;

  public data() {
    return {
      tags: [{ name: "普通echarts", routerData: "comEcharts", type: "info" }],
      shrinkFlag: true,
      crumbData: ["数据可视化", "普通echarts"],
      n: 0
    };
  }

  private handleClose(tag: any) {
    let indexBegin;
    this.tags.map((item: string, index: number) => {
      if (item === tag) {
        indexBegin = index
      }
    });
    this.tags.splice(indexBegin, 1)
  }

  private spreadShrink() {
    this.shrinkFlag = !this.shrinkFlag;
  }

  //tabs组件传入全部选中记录
  @Emit('tabsRoute')
  private tabsRoute(routeArr: any) {
    this.tags = routeArr
  }

  //tabs组件传入当前选中路由
  private presentRoute(presentRoute: any) {
    this.crumbData = presentRoute
  }

  //点击tag
  private clickTag(index: number) {
    let routerData = this.tags[index].routerData
    this.$router.push({ path: "/" + routerData })
  }

  //退出登陆
  private loginOut() {}
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
.lt {
  float: left;
}
.home {
  width: 100%;
  height: 100%;
  .top {
    display: flex;
    width: calc(100% - 20px);
    height: 60px;
    font-size: 30px;
    line-height: 60px;
    text-align: left;
    color: rgb(64, 158, 255);
  }
  .top-name {
    float: left;
    width: 140px;
    text-align: left;
    font-size: 20px;
    margin-left: 4px;
  }
  .top-img {
    width: 30px;
    height: 30px;
    float: left;
    margin: 15px 0 0 10px;
    border-radius: 6px;
  }

  .tab {
    float: left;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 60px);

    //导航未折叠
    .tabs {
      width: 200px;
      height: 100%;
      .el-menu {
        height: 100%;
        min-height:400px;
      }
    }
    // 导航折叠
    .tabs-collapse {
      width: 55px;
    }
    .tab-collapse {
      width: 55px;
    }
  }

  .router-child {
    float: right;
    width: calc(100% - 251px);
    height: calc(100% - 100px);
    padding: 40px 0 0 40px;
    overflow: auto;
  }
  .router-child-shrink {
    width: calc(100% - 95px);
  }
  .el-tag {
    cursor: pointer;
  }
}

//顶部样式
.home {
  .top {
    position: relative;
  }

  //左侧标题和logo
  .top-left {
    width: 200px;
    background: #1f2d3d;
  }
  .top-left-shrink {
    width: 54px;
  }
  .top-name {
    color: #ffffff;
  }

  //收缩导航
  .top-shrink {
    margin-left: 8px;
    cursor: pointer;
    color: #303133;
    line-height: 60px;
    .more-sanhengxian {
      font-weight: 700;
    }
    .iconfont {
      font-size: 22px;
    }
  }

  //面包屑
  .top-crumbs {
    margin-left: 20px;
    .el-breadcrumb {
      line-height: 60px;
    }
  }

  //右侧内容
  .top-right {
    height: 60px;
    position: absolute;
    right: 0;
    .right-full {
      position: absolute;
      right: 100px;
      cursor: pointer;
      span {
        font-size: 26px;
        color: #909399;
      }
    }
    .login-img {
      position: absolute;
      right: 20px;
      width: 40px;
      height: 40px;
      margin-top: 8px;
      border-radius: 6px;
      cursor: pointer;
    }
    .login-text {
      color: #ffffff;
    }
  }
}

//横向导航
.nav-level {
  text-align: left;
  margin: -40px 0 40px -40px;
  border-bottom: 1px solid #d8dce5;
  border-top: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .el-tag {
    height: 26px;
    line-height: 26px;
    margin: 4px 0 4px 4px;
    .el-tag__close:hover {
      background: #409eff;
    }
  }
}
</style>