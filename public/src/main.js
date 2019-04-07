import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import dateFormat from 'dateformat'
Vue.prototype.date = dateFormat
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
const markdownPlugin = {
  install (Vue) {
    Vue.prototype.$markdown = md
  }
}
Vue.use(markdownPlugin)

Vue.config.productionTip = false

window.choice = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

window.random = (length = 64) => {
  if (typeof length != 'number') {
    throw "Length isn't number"
  }
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  let result = ''
  for (var i = 0; i < length; i++) {
    result += choice(chars)
  }
  return result
}

window.escapeHtml = (text) => {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

window.flipArray = (array) => {
  let newArray = []
  for (var item in array) {
    newArray.unshift(array[item])
  }
  return newArray
}

import $ from 'jquery'
new Vue({
  router,
  data: {
    config,
    userInfo: false
  },
  methods: {
    updateUserInfo () {
      var that = this
      $.ajax({
        url: that.config.api,
        data: {
          method: 'userInfo',
          token: this.$cookies.get('token')
        },
        success (data) {
          if (data.success)
            that.userInfo = data.success
          else
            that.userInfo = false
        }
      })
    }
  },
  created () {
    this.updateUserInfo()
  },
  render: h => h(App)
}).$mount('#app')
