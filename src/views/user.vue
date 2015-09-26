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
    <div class="user-avatar">{{ $route.params.username.substring(0, 1) }}</div>
    <h2 class="user-name">{{ $route.params.username }}</h2>
    <hr style="width:100px;margin: 20px auto;">
    <div class="user-signature">暂无个人介绍</div>
  </div>
  
</template>

<script>
  export default {
    data () {
      return {



      }
    }
  }
</script>

