<template>
  <div class="link-list">
    <links pagenavi="{{ pagenavi }}" type="home" />
  </div>
</template>

<script>
const _ = require('../util')
export default {
  data () {
    return {
      title: '',
      pagenavi: {
        page: 1,
        limit: 20
      }
    }
  },
  ready () {
    
  },
  components: {
    Links: require('../components/links')
  }
}

</script>