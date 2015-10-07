<template>

  <div class="link-item-recommend" v-if="link.recommend_words">
    {{ link.recommend_words }}
  </div>

  <a class="link-item-main" href="{{ link.url }}">
    <div class="link-item-left">
      <div class="link-item-image" style="{{ link.image | bgImage }}">
      
      </div>
    </div>
    
    <div class="link-item-content">
      <h2 class="link-item-title">{{ link.title }}</h2>
    </div>    
  </a>

  
</template>

<script>
  export default {
    props: ['link'],
    ready () {
      
    },
    filters: {
      bgImage: require('../filters/bgImage')
    }
  }
</script>