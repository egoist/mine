import localdb from 'localdb'
let userdb = new localdb('user', 'Object', false)

export default {
  api (segment) {
    const dev = 'http://dev.mine-api.avosapps.com/api/'
    const prod = 'https://mine-api.avosapps.com/api/'
    const local = 'http://localhost:3000/api/'
    return local + segment
  },
  userdb,
  prep_http (url) {
    if (url.substring (0, 4) !== 'http') {
      return 'http://' + url
    }
    return url
  },
  dev () {
    return location.hostname === 'localhost'
  }
}