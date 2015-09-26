<template>
  <div class="box">
    <form v-on="submit: handleSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input class="form-control" type="text" v-validate="minLength: 1, maxLength: 20" v-model="user.username" id="username">
        
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" v-validate="minLength: 6, maxLength: 16" v-model="user.password" id="password">
      </div>
      <div v-if="error" class="alert alert-warning">
        你的操作出现了一些问题：{{ error }}
      </div>
      <button type="submit" class="btn btn-info" disabled="{{ valid ? false : true  }}">{{ login ? '正在提交' : '登录' }}</button>
    </form>
  </div>
</template>

<script>
// todo: vue-validator
var _ = require('../util')
export default {
  props: ['on-update-header'],
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      login: false,
      error: ''
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.login = true
      this.$http.post(_.api('signin'), {user: this.user}, (data, status) => {
        if (data.error) {
          this.error = data.message
          this.login = false
        }
        else if (data.user && typeof data.user === 'object') {
          _.userdb.override(data.user)
          this.onUpdateHeader(data.user)
          location.hash = '/'
        }
        
      })
    }
  }
}

</script>