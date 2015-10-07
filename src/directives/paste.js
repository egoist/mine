export default {
  bind () {
    this.el.addEventListener('paste', this.vm[this.expression])
  },
  unbind () {
    this.el.removeEventListener('paste', this.vm[this.expression])
  }
}