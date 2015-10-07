<template>
  
  <div class="box">
    <form class="form new-form" v-on="submit: handleSubmit">
      <div class="form-group">
        <label for="name">起一个优雅准确的名字</label>
        <input type="text" class="form-control" v-model="group.name" v-validate="required">
        <p class="help-block">
          想不到好名字？试试这个"<a class="underline" v-on="click: makeName">{{ random_name }}</a>"
        </p>
      </div>
      <div class="form-group">
        <label for="description">添加一段好的描述</label>
        <textarea v-autosize class="form-control" v-model="group.description" v-validate="required"></textarea>
      </div>
      <button type="submit" class="btn btn-info" disabled="{{ valid && !submitting ? false : true  }}">创建</button>
    </form>
  </div>
  
</template>

<script>
  const _ = require('../util')
  const username = _.userdb.get() && _.userdb.get().username
  const random = [`${username} 的收藏夹`, `人生只此风景好`, `假装在日本`, `吃货经济学`]
  export default {
    data () {
      return {
        group: {
          name: '',
          description: ''
        }
      }
    },
    methods: {
      makeName (e) {
        e.preventDefault()
        this.group.name = e.target.innerHTML
      },
      handleSubmit (e) {
        e.preventDefault()
        const api_key = _.userdb.get().api_key
        this.$http.post(_.api('add_group'), {api_key: api_key, group: this.group}, data => {
          this.$route.router.go(`/group/${data.group.objectId}`)
        })
      }
    },
    computed: {
      random_name () {
        const index = Math.floor(Math.random() * random.length) + 0
        return random[index]
      }
    },
    directives: {
      'autosize': require('../directives/autosize')
    }
  }
</script>