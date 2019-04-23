<template>
  <div id="register">
    <h2>Рега</h2>
    <form v-on:submit.prevent='reg()'>
      <div class="login form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              логин
            </div>
          </div>
          <input type="text" v-model='login' class="form-control">
        </div>
      </div>
      <div>
        <div class="password form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                пароль
              </div>
            </div>
            <input type="password" v-model='password' class="form-control">
          </div>
        </div>
      </div>
      <div class="passwordVerify form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              подтвердитьпароль
            </div>
          </div>
          <input type="password" v-model='passwordVerify' class="form-control">
        </div>
      </div>
      <div>
        <button type=submit class="btn btn-primary">что делать то блядь</button>
      </div>
    </form>
    <div id='error' class='error alert alert-danger' v-if='hasError'>{{ hasError.data }}</div>
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
