<template>
  <div class="link-item box" v-repeat="link in links">
    <link link="{{ link }}"/>
  </div>
</template>

<script>
  const _ = require('../util')
  export default {
    props: ['type', 'pagenavi'],
    data () {
      return {
        links: []
      }
    },
    ready () {
      this.$http.get(_.api(this.segment), {page: this.pagenavi.page, limit: this.pagenavi.limit}, (data) => {
        if (!data.error) {
          this.links = data.links
        }
      })
    },
    computed: {
      segment () {
        switch (this.type) {
          case 'home':
            return 'links'
            break 
          default: 
            return 'links'
            break
        }
      }
    },
    components: {
      Link: require('./link')
    }
  }
</script>