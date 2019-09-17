<template>
<div class="static-map">
  <div id="container"></div>

</div>
</template>

<script>
export default {
  name: 'SingleMap',
  props: {
    val: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      map: ''
    }
  },
  mounted() {
    this.map = new AMap.Map('container', {
      resizeEnable: true
    })
    this.markLocation('container', '湖北省武汉市武汉大学')
  },
  methods: {
    markLocation(mapId, address) {
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder()
        geocoder.getLocation(address, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 经纬度
            var lng = result.geocodes[0].location.lng
            var lat = result.geocodes[0].location.lat

            // 地图实例
            var map = new AMap.Map(mapId, {
              resizeEnable: true, // 允许缩放
              center: [lng, lat], // 设置地图的中心点
              zoom: 15 // 设置地图的缩放级别，0 - 20
            })

            // 添加标记
            new AMap.Marker({
              map: map,
              position: new AMap.LngLat(lng, lat) // 经纬度
            })
          } else {
            console.log('定位失败！')
          }
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.static-map{
  width: 100%;
  height: 3.48rem;
}
#container {
  width: 100%;
  height: 3.48rem;
  border-radius: 4px;
}
</style>
