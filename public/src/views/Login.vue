<template>
  <div id="login">
    <h2>Логин</h2>
    <div id="error" class='error alert alert-danger' v-if='hasError'>
      {{ hasError.data }}
    </div>
    <form v-on:submit.prevent='doLogin()'>
      <div class="login form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              Логин
            </div>
          </div>
          <input type="text" class="form-control" v-model='login'>
        </div>
      </div>
      <div class="password form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              Пароль
            </div>
          </div>
          <input type="password" v-model='password' class="form-control">
        </div>
      </div>
      <div><button type="submit" class="btn btn-primary">ъъъъъ</button></div>
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
