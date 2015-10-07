<style lang="stylus">
@import './shared'
</style>

<template>
  <header class="header">
    <div class="container">
      <h1 class="sitename">
        <a v-link="{ path: '/' }">Mine</a>
      </h1>
      <ul class="nav-right">

        <!--未登录-->
        <li v-if="!user"><a class="btn" v-link="{ path: '/signin' }">登录</a></li>
        <li v-if="!user"><a class="btn" v-link="{ path: '/signup' }">注册</a></li>

        <!--已登录-->
        <li v-if="user">
          <a class="btn nav-plus" v-link="{ path: '/new' }">
            <i class="fa fa-paper-plane"></i>
          </a>
        </li>
        <li v-if="user" class="nav-down-wrapper">
          <a class="btn nav-down fake-a" v-link="{ name: 'user', params: { username: user.username } }">
            {{ user.username }}
          </a>
          <ul class="nav-dropdown">
            <li><a v-link="{ name: 'user', params: { username: user.username } }">个人主页</a></li>
            <li><a v-link="{ path: '/settings' }">偏好设置</a></li>
            <li class="nav-sep"></li>
            <li><a v-on="click: handleExit">退出</a></li>
          </ul>
        </li>

      </ul>
    </div>
  </header>
  <div class="container" id="content">
    <router-view on-update-header="{{ updateHeaderCallback }}" class="view" v-transition="test" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
const _ = require('./util')
export default {
  data () {
    return {
      user: _.userdb.get()
    }
  },
  methods: {
    updateHeaderCallback (user) {
      this.user = user
    },
    handleExit () {
      this.user = null
      _.userdb.destroy()
      this.$route.router.go('/')
    }
  },
  components: {
  }
}
</script>