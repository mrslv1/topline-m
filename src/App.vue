<template>
  <div id="app">
    <!-- 根路由出口 -->
    <van-button type="warning">登录按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'

}
</script>

<style>

</style>
