<template>
  <div id="app">
    <h2 style='max-width: 1000px'>{{ title }}</h2>
    <div id="menu">
      <ul>
        <li><router-link :to='{ name: "home" }'>домик блять</router-link></li>
        <li><a href='https://github.com/naweak/pvd' target="_blank">жидхаб</a></li>
        <li v-if='!$root.userInfo'><router-link :to='{ name: "login" }'>логин блять</router-link></li>
        <li v-if='!$root.userInfo'><router-link :to='{ name: "register" }'>рега блять</router-link></li>
        <li v-if='$root.userInfo'><a href='javascript:void(0)' v-on:click='logout()'>логаут наху</a></li>
      </ul>
    </div>
    <div id="peskov">
      <img v-on:click="randomPeskov()" :src="peskovUri" alt="peskov">
    </div>
    <div style='max-width: 1000px'>
      <router-view/>
    </div>
  </div>
</template>

<style>
.hidden {
  display: none;
}
</style>

<script>
  import ebobo from './assets/img/peskov/ebobo.jpg'
  import fan from './assets/img/peskov/fan.jpg'
  import fitil from './assets/img/peskov/fitil.jpg'
  import glazok from './assets/img/peskov/glazok.jpg'
  import nullchan from './assets/img/peskov/nullchan.jpg'
  import puten from './assets/img/peskov/puten.jpg'
  import sample_text from './assets/img/peskov/sample_text.jpg'
  import takoi from './assets/img/peskov/takoi.jpg'
  import tramp_elda from './assets/img/peskov/tramp_elda.jpg'
  import trigande from './assets/img/peskov/trigande.jpg'
  import vatani from './assets/img/peskov/vatani.jpg'
  import zefirov_elda from './assets/img/peskov/zefirov_elda.jpg'
  export default {
    name: "app",
    data () {
      return {
        title: "Песков взрывает дома",
        peskovUri: ''
      }
    },
    methods: {
      logout () {
        this.$cookies.remove('token')
        this.$root.updateUserInfo()
      },
      randomPeskov () {
        let peskov = [
          ebobo,
          fan,
          fitil,
          glazok,
          nullchan,
          puten,
          sample_text,
          takoi,
          tramp_elda,
          trigande,
          vatani,
          zefirov_elda
        ]
        this.peskovUri = choice(peskov)
      }
    },
    created () {
      this.randomPeskov()
      this.$router.beforeEach((to, from, next) => {
        this.randomPeskov()
        next()
      })
    }
  }
</script>

<style>
  .error {
    color: red;
  }
  #app {
    font-family: arial, sans-serif;
  }
  button {
    font-family: arial, sans-serif;
    font-size: 100%;
  }
  #peskov {
    float: right;
  }
  #peskov img {
    max-width: 425px;
  }
  #menu {
    max-width: 1000px;
  }
</style>
