<template>
  <div class="box">
    <div class="box-header">
      <h3>上传头像</h3>
    </div>
    <form class="form new-form">
      
    </form>
  </div>
  <div class="box">
    <div class="box-header">
      <h3>修改资料</h3>
    </div>
    <form class="form new-form" v-on="submit: handleSubmitProfile">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" class="form-control" id="username" value="{{ username }}" disabled>
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" class="form-control" value="{{ profile.email }}" v-model="profile.email" id="email" v-validate="required, email">
      </div>
      <div class="form-group">
        <label for="signature">签名</label>
        <textarea v-autosize id="signature" class="form-control" v-model="profile.signature" rows="2"></textarea>
      </div>
      <div class="form-group">
        <label for="introduction">个人介绍</label>
        <textarea v-autosize id="introduction" class="form-control" v-model="profile.introduction" rows="4"></textarea>
      </div>
      <div class="alert alert-warning" v-if="error">
        {{ error.message }}
      </div>
      <div class="alert alert-success" v-if="success">
        {{ success }}
      </div>
      <button class="btn btn-info" type="submit" disabled="{{ valid && !submitting ? false : true  }}">{{ submitting ? '正在提交' : '更新' }}</button>
    </form>
  </div>
</template>

<script>
  const _ = require('../util')
  export default {
    data () {
      const userdata = _.userdb.get()
      return {
        profile: {
          email: userdata.email,
          signature: userdata.signature || '',
          introduction: userdata.introduction || ''
        },
        error: null,
        success: null,
        submitting: false
      }
    },
    computed: {
      username () {
        return _.userdb.get('username')
      }
    },
    methods: {
      handleSubmitProfile (e) {
        e.preventDefault()
        this.submitting = true
        this.error = null
        this.success = null
        const profile = {
          ...this.profile,
          _id: _.userdb.get('objectId')
        }
        this.$http.post(_.api('settings/profile'), {profile: profile, api_key: _.userdb.get('api_key')}, data => {
          this.submitting = false
          if (data.error) {
            this.error = data
            return
          }
          this.success = '已经成功更新你的个人资料!'
          _.userdb.override(data.user)
        })
      }
    },
    validator: {
      validates: {
        email: require('../helpers/validators').email
      }
      
    },
    directives: {
      'autosize': require('../directives/autosize')
    }
  }
</script>