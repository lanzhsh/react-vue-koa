<template>
  <div class="multi-check">
    <div class="check-one">一级选项
      <ul class="one-list">
        <li v-for="(oneItem,oneIndex) in oneCheckData" :key="oneIndex">
          <input
            type="checkbox"
            @click="oneCheckAll(oneIndex)"
            v-model="oneCheckFlag[oneIndex].oneFlag"
          >
          <p class="one-text" @click="openTwoCheck(oneIndex)">
            <span class="text">{{oneItem[oneCheckKey]}}</span>
            <img src="../assets/right-arrow-sel.png" 
            v-if="oneCheckFlag[oneIndex].showTwoFlag" alt>
            <img src="../assets/right-arrow.png" v-else alt>
          </p>
          <div class="check-two" v-if="oneCheckFlag[oneIndex].showTwoFlag">二级选项
            <ul class="two-list">
              <li v-for="(twoItem,twoIndex) in oneCheckData[oneIndex][twoCheckKey]" :key="twoIndex">
                <input
                  type="checkbox"
                  @click="twoCheck(oneIndex,twoIndex)"
                  v-model="oneCheckFlag[oneIndex].twoFlag[twoIndex]"
                >
                {{twoItem[oneCheckKey]}}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="sel-three">选中的值
      <ul class="three-list" v-for="(threeItem,threeIndex) in twoCheckVal" :key="threeIndex">
        <li v-for="(fourItem,fourIndex) in threeItem.content" :key="fourIndex">{{fourItem.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "multiCheck",

  props:{
    oneCheckData:{
      type:Array,
      value:[]
    },

    oneCheckInit:{
      type:Array,
      value:[]
    }
  },

  data() {
    return {
      // oneCheckData: [
      //   {
      //     id: 1,
      //     name: "湖北省",
      //     content: [
      //       { id: 1, name: "武汉市" },
      //       { id: 2, name: "黄冈市" },
      //       { id: 3, name: "荆门市" }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     name: "广东省",
      //     content: [
      //       { id: 1, name: "广州市" },
      //       { id: 2, name: "深圳市" },
      //       { id: 3, name: "佛山市" }
      //     ]
      //   },
      //   {
      //     id: 3,
      //     name: "江西省",
      //     content: [
      //       { id: 1, name: "南昌市" },
      //       { id: 2, name: "赣州市" },
      //       { id: 3, name: "九江市" }
      //     ]
      //   }
      // ], //一级复选数组
      // oneCheckInit: [
      //   {
      //     id: 1,
      //     name: "湖北省",
      //     content: [
      //       { id: 1, name: "武汉市" },
      //       { id: 2, name: "黄冈市" },
      //       { id: 3, name: "荆门市" }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     name: "广东省",
      //     content: [{ id: 1, name: "广州市" }, { id: 2, name: "深圳市" }]
      //   }
      // ],
      oneCheckDataCopy: [], //中间值只包含一级id
      oneCheckKey: "name",
      twoCheckKey: "content",
      oneCheckFlag: [], //复选框flag值
      twoCheckVal: [] //二级选中的值
    };
  },

  created() {
    let checkFlag = [],
      oneCheckCopy = [];
      // console.log('this.oneCheckData值为',this.oneCheckData);
    this.oneCheckData.map((item, index) => {
      this.$set(checkFlag, index, {
        oneFlag: false,
        showTwoFlag: false,
        twoFlag: []
      });
      item[this.twoCheckKey].map((itemTwo, indexTwo) => {
        checkFlag[index].twoFlag.push(false);
      });

      this.$set(oneCheckCopy, index, {
        id: item.id,
        name: item.name,
        content: []
      });
    });
    // console.log("checkFlag值为", checkFlag);
    // console.log("oneCheckCopy值为", oneCheckCopy);

    //默认显示二级第一个值
    checkFlag[0].showTwoFlag = true;
    this.oneCheckFlag = checkFlag;
    this.oneCheckDataCopy = oneCheckCopy;

    //处理初始传入的值
    //过滤掉content为空的值
    let checkInit = [];
    this.oneCheckInit.length &&
      this.oneCheckInit.map((item, index) => {
        item.content.length && checkInit.push(item);
      });
    //将初始值状态绑定到复选框上
    this.oneCheckData.map((item, index) => {
      checkInit.map((itemTwo, indexTwo) => {
        if (item.id == itemTwo.id) {
          item.content.map((itemCon, indexCon) => {
            itemTwo.content.map((itemTwoCon, indexTwoCon) => {
              if (itemCon.id == itemTwoCon.id) {
                this.$set(this.oneCheckFlag[index].twoFlag, indexTwoCon, true);
              }
            });
          });
        }
      });
    });
    // console.log("this.oneCheckFlag值为", this.oneCheckFlag);
    //判断初始是否全选
    this.oneCheckFlag.map((item, index) => {
      let twoFlag = this.oneCheckFlag[index].twoFlag;
      //判断twoFlag是否全部为true
      let everyTwo = twoFlag.every(item => {
        return item;
      });
      this.oneCheckFlag[index].oneFlag = everyTwo;
    });
    //调用得到选中值
    this.getTwoCheckVal(this.oneCheckFlag);
  },

  methods: {
    //一级选中
    oneCheckAll(index) {
      //将所在项对应的二级项改为true
      let twoFlag = this.oneCheckFlag[index].twoFlag;
      this.oneCheckFlag[index].oneFlag = true;
      twoFlag.map((itemTwo, indexTwo) => {
        this.$set(twoFlag, indexTwo, true);
      });
      //打开二级
      this.openTwoCheck(index);
      //处理选中的值,输出选中的一级和二级id和name值
      this.getTwoCheckVal(this.oneCheckFlag);
      // console.log('twoFlag值为',twoFlag);
    },

    //一级打开二级
    openTwoCheck(index) {
      //将其他的showTwoFlag值设置为false
      this.oneCheckFlag.map((itemShow, indexShow) => {
        this.oneCheckFlag[indexShow].showTwoFlag = false;
      });
      this.oneCheckFlag[index].showTwoFlag = true;
    },

    //二级选中
    twoCheck(oneIndex, twoIndex) {
      let twoFlag = this.oneCheckFlag[oneIndex].twoFlag;
      this.$set(twoFlag, twoIndex, !twoFlag[twoIndex]);
      //判断twoFlag是否全部为true
      let everyTwo = twoFlag.every(item => {
        return item;
      });
      this.oneCheckFlag[oneIndex].oneFlag = everyTwo;
      //处理选中的值,输出选中的一级和二级id和name值
      this.getTwoCheckVal(this.oneCheckFlag);
      console.log(this.oneCheckFlag);
    },

    //得到二级选中值
    getTwoCheckVal(data) {
      // console.log("data值为", data);
      this.twoCheckVal = JSON.parse(JSON.stringify(this.oneCheckDataCopy));
      data.map((item, index) => {
        item.twoFlag.map((twoItem, twoIndex) => {
          if (twoItem) {
            this.twoCheckVal[index].content.push({
              id: this.oneCheckData[index].content[twoIndex].id,
              name: this.oneCheckData[index].content[twoIndex].name
            });
          }
        });
      });

      //过滤掉content为空的项
      let checkVal = [];
      this.twoCheckVal.map((itemFilter, indexFilter) => {
        itemFilter.content.length && checkVal.push(itemFilter);
      });
      this.twoCheckVal = JSON.parse(JSON.stringify(checkVal));
      // console.log("this.twoCheckVal值为", this.twoCheckVal);
    }
  }
};
</script>

<style scoped lang='scss'>
.multi-check {
  position: relative;

  input {
    cursor: pointer;
  }
  li {
    padding: 4px 0;
  }

  //第一个复选
  .check-one,
  .check-two,
  .sel-three {
    position: absolute;
    width: 160px;
    text-align: left;
    padding: 20px;
    border: 1px solid #d8dce5;
  }

  .one-list,
  .two-list {
    height: 300px;
    overflow: auto;
  }
  .one-text {
    display: inline-block;
    cursor: pointer;
    span {
      display: inline-block;
      width: 106px;
    }
    img {
      width: 12px;
      height: 12px;
    }
  }

  .check-two {
    left: 220px;
    top: 0 !important;
  }

  .sel-three {
    height: 320px;
    overflow: auto;
    left: 440px;
    top: 0 !important;
  }
}
</style>