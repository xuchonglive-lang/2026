<template>
  <view class='page-container'>
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">成果查看</block>
    </cu-custom>
    
    </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
.page-container {
  min-height: 100vh;
}
</style>
