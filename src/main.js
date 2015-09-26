import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(validator)
if (location.hostname === 'localhost') {
  Vue.config.debug = true
}

require('./directives/paste')

var router = new VueRouter()
router.map({
  '/': {
    component: require('./views/home')
  },
  '/about': {
    component: require('./views/about')
  },
  '/signup': {
    component: require('./views/signup')
  },
  '/signin': {
    component: require('./views/signin')
  },
  '/user/:username': {
    name: 'user',
    component: require('./views/user')
  },
  '/new': {
    component: require('./views/new')
  }
})

const App = Vue.extend(require('./app'))
router.start(App, '#app')