import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import _ from './util'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(validator)
if (location.hostname === 'localhost') {
  Vue.config.debug = true
}

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
  },
  '/new_group': {
    component: require('./views/new_group')
  },
  '/settings': {
    component: require('./views/settings')
  }
})

router.beforeEach(({ to, next }) => {
  const user = _.userdb.get()
  if (to.path === '/signin' || to.path === '/signup') {
    if (!user) next()
    else router.go('/')
  } else {
    next()
  }
})

const App = Vue.extend(require('./app'))
router.start(App, '#app')