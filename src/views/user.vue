<style lang="stylus">
  @import 'nib'
  avatarSize = 80px
  .user-box
    .user-avatar
      size avatarSize avatarSize
      display inline-block
      background-color #f9f9f9
      border-radius 50%
      line-height avatarSize
      font-size 50px
    h2.user-name
      margin 10px 0
      font-weight 400
      font-size 28px
    .user-signature
      color #778087
</style>


<template>
  <div class="box tc user-box">
  
    <div v-if="user">
      <div class="user-avatar">{{ $route.params.username.substring(0, 1) }}</div>
      <h2 class="user-name">{{ $route.params.username }}</h2>
      <div class="user-signature">{{ user.signature ? user.signature : '暂无签名' }}</div>
      <hr style="width:100px;margin: 20px auto;">
      <div class="user-introduction">{{ user.introduction ? user.introduction : '暂无个人介绍' }}</div>     
    </div>

  </div>
  
</template>

<script>
  const _ = require('../util')
  export default {
    data () {
      return {

        user: null

      }
    },
    ready () {
      this.$http.get(_.api(`user/${this.$route.params.username}`), data => {
        this.user = data.user
      })
    }
  }
</script>

