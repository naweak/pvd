<template>
  <div id="register">
    <form v-on:submit.prevent='reg()'>
      <div>
        <label>логин: <input type="text" v-model='login'></label>
      </div>
      <div>
        <label>пароль: <input type="password" v-model='password'></label>
      </div>
      <div>
        <label>подтвердитьпароль: <input type="password" v-model='passwordVerify'></label>
      </div>
      <div>
        <button type=submit>что делать то блядь</button>
      </div>
    </form>
    <div id='error' class=error v-if='hasError'>{{ hasError.data }}</div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'register',
    data () {
      return {
        login: '',
        password: '',
        passwordVerify: '',
        hasError: false
      }
    },
    methods: {
      reg () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          type: "post",
          data: {
            method: 'register',
            login: that.login,
            password: that.password,
            passwordVerify: that.passwordVerify
          },
          success (data) {
            if (data.success) {
              that.$router.push({ name: 'login' })
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
