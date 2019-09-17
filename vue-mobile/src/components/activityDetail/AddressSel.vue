<template>
  <div class="address">
    <div :class="['two-title',{'text-req':valT.required}]">{{valT.tip}}</div>
    <div class="sel-inp" @click="open">
      <input class="text-inp inp" type="text" v-model="city"/>
      <img class="text-img" src="@/assets/activityDetail/more-sel.png" alt="">
    </div>
    <textarea v-model="street" class="multiple-area" cols="30" rows="10" @change="change"></textarea>
    <p v-if="check&&!valT.value&&valT.required" class="required-field">{{valT.tip}}必填</p>
    <nut-picker
      :is-visible="isVisible"
      title="请选择城市"
      :list-data="listData"
      :default-value-data="defaultValueData"
      @close="switchPicker('isVisible')"
      @confirm="setChooseValue"
      @choose="updateChooseValue"
      @close-update="closeUpdateChooseValue"
    ></nut-picker>
  </div>
</template>

<script>
export default {
  name: 'AddressSel',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      valT: this.val,
      city: '',
      street: '',
      isVisible: false,
      check: false,
      data: {
        北京: [
          '东城区',
          '西城区',
          '崇文区',
          '宣武区',
          '朝阳区',
          '海淀区',
          '丰台区',
          '石景山区',
          '房山区',
          '通州区',
          '顺义区',
          '昌平区',
          '大兴区',
          '怀柔区',
          '平谷区',
          '门头沟区',
          '密云县',
          '延庆县'
        ],
        天津: [
          '和平区',
          '河东区',
          '河西区',
          '南开区',
          '河北区',
          '红桥区',
          '东丽区',
          '西青区',
          '北辰区',
          '津南区',
          '武清区',
          '宝坻区',
          '滨海新区',
          '静海县',
          '宁河县',
          '蓟县'
        ],
        上海: [
          '黄浦区',
          '卢湾区',
          '徐汇区',
          '长宁区',
          '静安区',
          '普陀区',
          '闸北区',
          '虹口区',
          '杨浦区',
          '闵行区',
          '宝山区',
          '嘉定区',
          '浦东新区',
          '金山区',
          '松江区',
          '青浦区',
          '奉贤区',
          '崇明县'
        ],
        重庆: [
          '渝中区',
          '大渡口区',
          '江北区',
          '南岸区',
          '北碚区',
          '渝北区',
          '巴南区',
          '长寿区',
          '双桥区',
          '沙坪坝区',
          '万盛区',
          '万州区',
          '涪陵区',
          '黔江区',
          '永川区',
          '合川区',
          '江津区',
          '九龙坡区',
          '南川区',
          '綦江县',
          '潼南县',
          '荣昌县',
          '璧山县',
          '大足县',
          '铜梁县',
          '梁平县',
          '开县',
          '忠县',
          '城口县',
          '垫江县',
          '武隆县',
          '丰都县',
          '奉节县',
          '云阳县',
          '巫溪县',
          '巫山县',
          '石柱土家族自治县',
          '秀山土家族苗族自治县',
          '酉阳土家族苗族自治县',
          '彭水苗族土家族自治县'
        ],
        河北: [
          '石家庄',
          '唐山',
          '秦皇岛',
          '邯郸',
          '邢台',
          '保定',
          '张家口',
          '承德',
          '沧州',
          '廊坊',
          '衡水'
        ],
        山西: [
          '太原',
          '大同',
          '阳泉',
          '长治',
          '晋城',
          '朔州',
          '晋中',
          '运城',
          '忻州',
          '临汾',
          '吕梁'
        ],
        辽宁: [
          '沈阳',
          '大连',
          '鞍山',
          '抚顺',
          '本溪',
          '丹东',
          '锦州',
          '营口',
          '阜新',
          '辽阳',
          '盘锦',
          '铁岭',
          '朝阳',
          '葫芦岛'
        ],
        吉林: [
          '长春',
          '吉林',
          '四平',
          '辽源',
          '通化',
          '白山',
          '松原',
          '白城',
          '延边朝鲜族自治州'
        ],
        黑龙江: [
          '哈尔滨',
          '齐齐哈尔',
          '鹤岗',
          '双鸭山',
          '鸡西',
          '大庆',
          '伊春',
          '牡丹江',
          '佳木斯',
          '七台河',
          '黑河',
          '绥化',
          '大兴安岭'
        ],
        江苏: [
          '南京',
          '苏州',
          '无锡',
          '常州',
          '镇江',
          '南通',
          '泰州',
          '扬州',
          '盐城',
          '连云港',
          '徐州',
          '淮安',
          '宿迁'
        ],
        浙江: [
          '杭州',
          '宁波',
          '温州',
          '嘉兴',
          '湖州',
          '绍兴',
          '金华',
          '衢州',
          '舟山',
          '台州',
          '丽水'
        ],
        安徽: [
          '合肥',
          '芜湖',
          '蚌埠',
          '淮南',
          '马鞍山',
          '淮北',
          '铜陵',
          '安庆',
          '黄山',
          '滁州',
          '阜阳',
          '宿州',
          '巢湖',
          '六安',
          '亳州',
          '池州',
          '宣城'
        ],
        福建: [
          '福州',
          '厦门',
          '莆田',
          '三明',
          '泉州',
          '漳州',
          '南平',
          '龙岩',
          '宁德'
        ],
        江西: [
          '南昌',
          '景德镇',
          '萍乡',
          '九江',
          '新余',
          '鹰潭',
          '赣州',
          '吉安',
          '宜春',
          '抚州',
          '上饶'
        ],
        山东: [
          '济南',
          '青岛',
          '淄博',
          '枣庄',
          '东营',
          '烟台',
          '潍坊',
          '济宁',
          '泰安',
          '威海',
          '日照',
          '莱芜',
          '临沂',
          '德州',
          '聊城',
          '滨州',
          '菏泽'
        ],
        河南: [
          '郑州',
          '开封',
          '洛阳',
          '平顶山',
          '安阳',
          '鹤壁',
          '新乡',
          '焦作',
          '濮阳',
          '许昌',
          '漯河',
          '三门峡',
          '南阳',
          '商丘',
          '信阳',
          '周口',
          '驻马店'
        ],
        湖北: [
          '武汉',
          '黄石',
          '十堰',
          '荆州',
          '宜昌',
          '襄樊',
          '鄂州',
          '荆门',
          '孝感',
          '黄冈',
          '咸宁',
          '随州',
          '恩施'
        ],
        湖南: [
          '长沙',
          '株洲',
          '湘潭',
          '衡阳',
          '邵阳',
          '岳阳',
          '常德',
          '张家界',
          '益阳',
          '郴州',
          '永州',
          '怀化',
          '娄底',
          '湘西'
        ],
        广东: [
          '广州',
          '深圳',
          '珠海',
          '汕头',
          '韶关',
          '佛山',
          '江门',
          '湛江',
          '茂名',
          '肇庆',
          '惠州',
          '梅州',
          '汕尾',
          '河源',
          '阳江',
          '清远',
          '东莞',
          '中山',
          '潮州',
          '揭阳',
          '云浮'
        ],
        海南: ['海口', '三亚'],
        四川: [
          '成都',
          '自贡',
          '攀枝花',
          '泸州',
          '德阳',
          '绵阳',
          '广元',
          '遂宁',
          '内江',
          '乐山',
          '南充',
          '眉山',
          '宜宾',
          '广安',
          '达州',
          '雅安',
          '巴中',
          '资阳',
          '阿坝',
          '甘孜',
          '凉山'
        ],
        贵州: [
          '贵阳',
          '六盘水',
          '遵义',
          '安顺',
          '铜仁',
          '毕节',
          '黔西南',
          '黔东南',
          '黔南'
        ],
        云南: [
          '昆明',
          '曲靖',
          '玉溪',
          '保山',
          '昭通',
          '丽江',
          '普洱',
          '临沧',
          '德宏',
          '怒江',
          '迪庆',
          '大理',
          '楚雄',
          '红河',
          '文山',
          '西双版纳'
        ],
        陕西: [
          '西安',
          '铜川',
          '宝鸡',
          '咸阳',
          '渭南',
          '延安',
          '汉中',
          '榆林',
          '安康',
          '商洛'
        ],
        甘肃: [
          '兰州',
          '嘉峪关',
          '金昌',
          '白银',
          '天水',
          '武威',
          '酒泉',
          '张掖',
          '庆阳',
          '平凉',
          '定西',
          '陇南',
          '临夏',
          '甘南'
        ],
        青海: ['西宁', '海东', '海北', '海南', '黄南', '果洛', '玉树', '海西'],
        内蒙古: [
          '呼和浩特',
          '包头',
          '乌海',
          '赤峰',
          '通辽',
          '鄂尔多斯',
          '呼伦贝尔',
          '巴彦淖尔',
          '乌兰察布',
          '锡林郭勒盟',
          '兴安盟',
          '阿拉善盟'
        ],
        广西: [
          '南宁',
          '柳州',
          '桂林',
          '梧州',
          '北海',
          '防城港',
          '钦州',
          '贵港',
          '玉林',
          '百色',
          '贺州',
          '河池',
          '来宾',
          '崇左'
        ],
        西藏: ['拉萨', '那曲', '昌都', '林芝', '山南', '日喀则', '阿里'],
        宁夏: ['银川', '石嘴山', '吴忠', '固原', '中卫'],
        新疆维吾尔自治区: [
          '乌鲁木齐',
          '克拉玛依',
          '吐鲁番',
          '哈密',
          '和田',
          '阿克苏',
          '喀什',
          '克孜勒苏',
          '巴音郭楞',
          '昌吉',
          '博尔塔拉',
          '伊犁',
          '塔城',
          '阿勒泰'
        ],
        香港: ['香港岛', '九龙东', '九龙西', '新界东', '新界西'],
        澳门: ['澳门半岛', '离岛'],
        台湾: ['台北', '高雄', '基隆', '新竹', '台中', '嘉义', '台南市']
      },
      listData: [
        [
          '北京',
          '天津',
          '上海',
          '重庆',
          '河北',
          '山西',
          '辽宁',
          '吉林',
          '黑龙江',
          '江苏',
          '浙江',
          '安徽',
          '福建',
          '江西',
          '山东',
          '河南',
          '湖北',
          '湖南',
          '广东',
          '海南',
          '四川',
          '贵州',
          '云南',
          '陕西',
          '甘肃',
          '青海',
          '内蒙古',
          '广西',
          '西藏',
          '宁夏',
          '新疆维吾尔自治区',
          '香港',
          '澳门',
          '台湾'
        ]
      ],
      defaultValueData: null
    }
  },
  created() {
    this.listData = [...[this.listData[0]], this.data[this.listData[0][0]]]
  },
  methods: {
    change() {
      this.valT.value = `${this.city}${this.street}`
    },

    switchPicker(param) {
      this[`${param}`] = !this[`${param}`]
    },

    setChooseValue(chooseData) {
      this.city = `${chooseData[0]}-${chooseData[1]}${
        chooseData[2] ? '-' + chooseData[2] : ''
      }`
      this.valT.value = `${this.city}${this.street}`
    },

    updateLinkage(self, value, index, chooseValue, cacheValueData) {
      if (!value) {
        return false
      }
      switch (index) {
        case 1:
          const i = this.listData[0].indexOf(value)
          this.listData.splice(index, 1, [...this.data[this.listData[0][i]]])
          chooseValue = chooseValue || this.listData[index][0]
          self && self.updateChooseValue(self, index, chooseValue)
          this.updateLinkage(
            self,
            chooseValue,
            2,
            cacheValueData && cacheValueData[2] ? cacheValueData[2] : null
          )
          break
      }
    },

    updateChooseValue(self, index, value, cacheValueData) {
      index < 2 && this.updateLinkage(self, value, index + 1, null)
    },

    closeUpdateChooseValue(self, chooseData) {
      this.updateLinkage(self, chooseData[0], 1, chooseData[1], chooseData)
    },

    open() {
      this.isVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
