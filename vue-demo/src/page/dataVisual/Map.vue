<template>
  <div class="map">
    <div id="container"></div>
    <div class="button-group">
      <input type="button" class="button" value="鼠标绘制点" id="point"/>
      <input type="button" class="button" value="鼠标绘制线" id="line"/>
      <input type="button" class="button" value="鼠标绘制面" id="polygon"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map{
  width:100%;
  height:100%;
  #container{
    width:100%;
    height:100%;
    position:static;
  }
}
</style>

<script>
export default {
  mounted() {
    var map = new AMap.Map("container", {
      resizeEnable: true
    });
    //在地图中添加MouseTool插件
    var mouseTool = new AMap.MouseTool(map);
    AMap.event.addDomListener(
      document.getElementById("point"),
      "click",
      function() {
        mouseTool.marker({ offset: new AMap.Pixel(-14, -11) });
      },
      false
    );
    AMap.event.addDomListener(
      document.getElementById("line"),
      "click",
      function() {
        mouseTool.polyline();
      },
      false
    );
    AMap.event.addDomListener(
      document.getElementById("polygon"),
      "click",
      function() {
        mouseTool.polygon();
      },
      false
    );
  }
};
</script>
