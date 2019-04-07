<template>
  <div id="chat">
    <h2>Говночат наху</h2>
    <div id="create" v-if='$root.userInfo'>
      <form v-on:submit.prevent='createChatMessage()'>
        <div>
          <textarea v-model='text' placeholder="вставить текст"></textarea>
        </div>
        <div>
          <button type="submit">Аыыы</button>
        </div>
      </form>
    </div>
    <div v-else>
      <router-link :to="{ name: 'login' }">войдите</router-link> чотбы срать в чятик
    </div>
    <div>
      <button v-if='autoupdateEnabled' v-on:click='disableAutoupdate()'>вырубить автоапдейт</button>
      <button v-else v-on:click='enableAutoupdate()'>врубить автоапдейт</button>
    </div>
    <div id="error" class="error" v-if="hasError">{{ hasError.data }}</div>
    <div id="messages">
      <div class="message" v-for='message in messages'>
        <div class="text" v-html='parser(message.text)'></div>
        <div class='autograph'>
          {{ message.author }}, {{ date(message.createDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'chat',
    data () {
      return {
        messages: [],
        autoupdate: {
          enabled: false,
          interval: 500
        },
        hasError: false,
        text: '',
        autoupdateEnabled: false
      }
    },
    methods: {
      fetchMessages () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          data: {
            method: 'chatMessages'
          },
          success (data) {
            if (data.success) {
              that.messages = flipArray(data.success)
            }
            else {
              that.hasError = data.error
            }
          }
        })
      },
      createChatMessage () {
        var that = this
        var vm = that.$root
        $.ajax({
          url: vm.config.api,
          type: 'post',
          data: {
            method: 'createChatMessage',
            text: that.text,
            token: that.$cookies.get('token')
          },
          success (data) {
            if (data.success) {
              that.fetchMessages()
              that.text = ''
            }
            else {
              that.hasError = data.error
            }
          }
        })
      },
      enableAutoupdate () {
        window.polling = setInterval(() => this.fetchMessages(), 1300)
        this.autoupdateEnabled = true
      },
      disableAutoupdate () {
        clearInterval(polling)
        this.autoupdateEnabled = false
      },
      parser (text) {
        text = this.$markdown.render(text)
        return text
      },
      load () {
        this.fetchMessages()
      }
    },
    created () {
      this.load()
    }
  }
</script>

<style scoped>
  #chat {
    padding: 10px;
    margin: 15px;
    border: 1px solid black;
  }
  #messages {
    max-height: 350px;
    overflow: auto;
  }
  #create form textarea {
    width: 100%;
    height: 90px;
  }
  .message {
    padding: 5px;
    margin: 10px;
    border: 1px solid black;
  }
  .text, .autograph {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
