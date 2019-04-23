<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <div class="container-fluid">
      <h1>Песков взрывает дома</h1>
      <div class="row">
        <ul class="col-md-2 nav flex-column">
          <li class="nav-item" v-for="item in menu.all">
            <router-link class="nav-link" :to="item.link" v-html="item.text"></router-link>
          </li>
          <li class="nav-item" v-if="$root.userInfo" v-for="item in menu.logged">
            <router-link class="nav-link" :to="item.link" v-html="item.text"></router-link>
          </li>
          <li class="nav-item" v-else v-for="item in menu.notLogged">
            <router-link class="nav-link" :to="item.link" v-html="item.text"></router-link>
          </li>
        </ul>
        <div class="col-md-6">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </div>
        <div class="col-md-2" id="peskov">
          <img :src="peskovUri" class="img-fluid img-thumbnail" :alt="peskov" v-on:click="randomPeskov()">
        </div>
      </div>
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
  import peskov_vstavit_text from './assets/img/peskov/peskov_vstavit_text.jpg'
  import sobak from './assets/img/peskov/sobak.jpg'
  import _012secs from './assets/img/peskov/012secs.jpg'
  import want_to_be from './assets/img/peskov/want_to_be.jpg'
  import _1870_200dollars from './assets/img/peskov/1870_200dollars.jpg'
  import life_passport_vk from './assets/img/peskov/life_passport_vk.jpg'
  import _420 from './assets/img/peskov/420.jpg'
  import peskov_police from './assets/img/peskov/peskov_police.jpg'
  import tale from './assets/img/peskov/tale.jpg'
  import fanta from './assets/img/peskov/fanta.jpg'
  import ovulyaha from './assets/img/peskov/ovulyaha.jpg'
  import great_peskov_dima from './assets/img/peskov/great_peskov_dima.jpg'
  import peskov_dima_ibal_trampa_kadilom from './assets/img/peskov/peskov_dima_ibal_trampa_kadilom.jpg'
  import _choice from './assets/img/peskov/choice.jpg'
  import kakoi from './assets/img/peskov/kakoi.jpg'
  import run from './assets/img/peskov/run.jpg'
  import odmen from './assets/img/peskov/odmen.jpg'
  import clock from './assets/img/peskov/clock.jpg'
  import america from './assets/img/peskov/america.jpg'
  import vibraton from './assets/img/peskov/vibraton.jpg'
  import Vue from 'vue'
  import VueProgressBar from 'vue-progressbar'
  Vue.use(VueProgressBar, {
    color: '#33cccc',
    failedColor: '#cc3333',
    thickness: '2px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  })
  export default {
    name: "app",
    data () {
      return {
        title: "Песков взрывает дома",
        peskovUri: '',
        menu: {
          all: [
            { link: '/', text: 'домик блять' },
            { link: '/chat', text: 'чят во весь рост' }
          ],
          notLogged: [
            { link: '/login', text: 'логин блять' },
            { link: '/register', text: 'рега блять' },
          ],
          logged: [
            { link: '/logout', text: 'логаут наху' }
          ]
        }
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
          zefirov_elda,
          peskov_vstavit_text,
          sobak,
          _012secs,
          want_to_be,
          _1870_200dollars,
          life_passport_vk,
          _420,
          peskov_police,
          tale,
          fanta,
          ovulyaha,
          great_peskov_dima,
          peskov_dima_ibal_trampa_kadilom,
          _choice,
          kakoi,
          run,
          odmen,
          clock,
          america,
          vibraton
        ]
        this.peskovUri = choice(peskov)
      }
    },
    created () {
      this.randomPeskov()
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        this.randomPeskov()
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        this.$Progress.start()
        next()
      })
      this.$router.afterEach((to, from) => {
        this.$Progress.finish()
      })
    }
  }
</script>

<style>
  #peskov img {
    max-width: 100%;
  }
  .smiley {
    max-width: 32px !important;
    margin: 3px;
  }
  button {
    margin: 10px !important;
  }
  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
