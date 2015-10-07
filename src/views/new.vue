<template>
  <div class="box">
    <form class="form new-form" v-on="submit: handleSubmitLink" autocomplete="off">
      <a class="no-groups alert alert-warning" v-if="!link.group" v-link="{ path: '/new_group' }">
        <i class="fa fa-arrow-circle-o-right "></i> 请先新建一个圈子！
      </a>
      <div class="form-group">
        <label for="url">网址</label>
        <input type="text" class="form-control" id="url" v-model="link.url" v-validate="required, minLength: 3, url" placeholder="包含在文本中的网址会自动获取第一个匹配到的，必填的" v-paste="handlePasteUrl" v-on="keydown: handleInputUrl">
        <p class="help-block" v-show="matchUrl">匹配到的网址: {{ matchUrl }}</p>
      </div>
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" class="form-control" id="title" v-model="link.title" placeholder="不填标题将自动获取">
      </div>
      <div class="form-group">
        <label for="recommend_words">推荐语</label>
        <textarea v-autosize class="form-control" id="recommend_words" v-model="link.recommend_words" placeholder="分享亮点、槽点和你的观点"></textarea>
      </div>
      
      <input type="hidden" v-validate="validGroup" v-model="link.group">
      <form-groups on-groups-fetched="{{ handleGroupsFetched }}" on-group-changed="{{ handleGroupChanged }}"></form-groups>
      
      <div class="form-group" style="display:none">
        <label class="control checkbox" v-on="click: handleTitieFirst">
          <input type="checkbox" checked="{{ yourTitleFirst }}">
          <span class="control-indicator"></span>优先使用我填写的标题</label>
      </div>

      <div class="alert alert-warning" v-if="error">
        你的操作出现了一些问题: {{ error == 'ETIMEDOUT' ? '网页响应时间过长' : error }}，请重试或手动填写标题 :(
      </div>
      <button type="submit" class="btn btn-info" disabled="{{ valid && !submitting ? false : true  }}">
        {{ buttonWord }}
      </button>
      <p>{{dev}}</p>
    </form>
  </div>
</template>

<script>
  var _ = require('../util')
  const urlRe = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  export default {
    data () {
      return {
        link: {
          type: 'link',
          url: '',
          title: '',
          image: '',
          recommend_words: '',
          group: true
        },
        submitting: false,
        fetchingMeta: false,
        error: '',
        virgin: true,
        yourTitleFirst: true
      }
    },
    methods: {
      handleSubmitLink (e) {
        e.preventDefault()
        
        this.fetchUrlMeta(() => {
          console.log('end fetch, to post form.')
          if (!this.link.title || !this.link.url) {
            return
          }
          this.submitting = true
          const api_key = _.userdb.get()['api_key']
          let link = {...this.link}
          link.url =  _.prep_http(this.matchUrl)
          this.$http.post(_.api('add'), {link: link, api_key: api_key}, (data) => {
            this.submitting = false
            console.log(data)
            if (data.error) {
              this.error = data.message
            } else {
              this.$route.router.go(`/story/${data.link.objectId}`)
            }
            
          })
        })
      },
      fetchUrlMeta (cb) {
        setTimeout(() => {
          if (this.matchUrl) {
            this.virgin = false
            console.log('fetchingMeta')
            if (this.error) {
              return
            }
            this.fetchingMeta = true
            this.$http.get(_.api('url_meta'), {url: this.matchUrl}, (data) => {
              if (data.error) {
                this.error = data.error
                this.fetchingMeta = false
              } else {
                console.log('you are fetching title ', data.meta.title)
                this.error = ''
                const shouldChangeTitle = !this.link.title || !this.yourTitleFirst
                if (shouldChangeTitle) {
                  this.link.title = data.meta.title.trim()
                }
                this.link.image = data.meta.image
                console.log(JSON.stringify(this.link))
                this.fetchingMeta = false
              }      
              // callback
              if (cb && typeof cb === 'function') {
                cb()      
              }
            })
            
          }
        }, 200)

      },
      handlePasteUrl () {
        if (!this.virgin) {
          this.link.title = ''
          this.link.image = ''
          this.link.recommend_words = ''
        } else {
          this.virgin = false
        }
      },
      handleInputUrl () {
        if (!this.virgin)
          this.link.title = ''

      },
      handleTitieFirst (e) {
        e.preventDefault()
        this.yourTitleFirst = this.yourTitleFirst ? false : true
        
      },
      handleGroupsFetched (groups) {
        this.link.group = groups.length > 0 ? true : false
      },
      handleGroupChanged (group_id) {
        this.link.group = group_id
      }
    },
    computed: {
      dev () {
        return JSON.stringify(this.$data)
      },
      matchUrl () {
        const match = this.link.url.match(urlRe)
        return match && match[0]
      },
      buttonWord () {
        if (this.fetchingMeta) 
          return '正在获取标题'
        else if (this.submitting) 
          return '正在提交'
        else
          return '提交'
      }
    },
    validator: {
      validates: {
        url (val) {
          const match = val.match(urlRe)
          return val && match && match.length > 0
        },
        validGroup (val) {
          return val && typeof val === 'string'
        }
      }
    },
    components: {
      'form-groups': require('../components/form-groups')
    },
    directives: {
      'autosize': require('../directives/autosize'),
      'paste': require('../directives/paste')
    }
  }
</script>