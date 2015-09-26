<style lang="stylus">
@import './shared'
</style>

<template>
  <header class="header">
    <div class="container">
      <h1 class="sitename">
        <a v-link="{ path: '/' }">卖银</a>
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
        <li v-if="user">
          <a class="btn nav-down" v-link="{ name: 'user', params: { username: user.username } }">
            {{ user.username }}
          </a>
        </li>

      </ul>
    </div>
  </header>
  <div class="container" id="content">
    <router-view on-update-header="{{ updateHeaderCallback }}" class="view" v-transition="test" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
var _ = require('./util')
export default {
  data () {
    return {
      user: _.userdb.get()
    }
  },
  methods: {
    updateHeaderCallback (user) {
      this.user = user
    }
  }
}
</script>