<template>
  <div id="login">
    <div id="error" class='error' v-if='hasError'>
      {{ hasError.data }}
    </div>
    <form v-on:submit.prevent='doLogin()'>
      <div><label>Логин: <input type="text" id='login' v-model='login'></label></div>
      <div><label>Пароль: <input type="password" id='password' v-model='password'></label></div>
      <div><button type="submit">ъъъъъ</button></div>
    </form>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "login",
    data () {
      return {
        login: '',
        password: '',
        passwordVerify: '',
        hasError: false
      }
    },
    methods: {
      doLogin () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          type: "POST",
          data: {
            login: that.login,
            password: that.password,
            method: 'getToken'
          },
          success (data) {
            if (data.success) {
              that.$cookies.set('token', data.success.code, new Date(data.success.expires))
              that.$root.updateUserInfo()
              that.$router.push({ name: 'home' })
            }
            else {
              that.hasError = data.error
            }
          }
        })
      }
    }
  }
</script>
