<template>
  <div id="chat" class="card">
    <div class="card-body">
      <h2>Говночат наху</h2>
      <div id="create" v-if='$root.userInfo'>
        <form v-on:submit.prevent='createChatMessage()'>
          <div class="form-group">
            <textarea class="form-control" v-model='text' placeholder="вставить текст"></textarea>
          </div>
          <div id="smileys">
            <img v-for='smiley in smileys' v-on:click='appendText(`:${smiley}:`)' class='smiley clickable' :src="$root.config.smileys + '/' + smiley + '.png'" :alt="`:${smiley}:`" :title="`:${smiley}:`">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-sm">Аыыы</button>
            <button type="button" class="btn btn-danger btn-sm" v-if='autoupdateEnabled' v-on:click='disableAutoupdate()'>вырубить автоапдейт</button>
            <button type="button" class="btn btn-success btn-sm" v-else v-on:click='enableAutoupdate()'>врубить автоапдейт</button>
          </div>
        </form>
      </div>
      <div v-else>
        <router-link :to="{ name: 'login' }">войдите</router-link> чотбы срать в чятик
      </div>
      <div id="error" class="error alert alert-danger" v-if="hasError">{{ hasError.data }}</div>
      <div id="messages" :style='!fullHeight ? "max-height: 350px;" : ""'>
        <ChatMessage
          v-for='message in messages'
          :message='message'></ChatMessage>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import ChatMessage from './ChatMessage.vue'
  import config from '../config.js'
  export default {
    name: 'chat',
    components: { ChatMessage },
    data () {
      return {
        messages: [],
        autoupdate: {
          enabled: false,
          interval: 500
        },
        hasError: false,
        text: '',
        autoupdateEnabled: false,
        smileys: config.smileysList
      }
    },
    props: [ 'fullHeight' ],
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
      appendText (text) {
        this.text += text
      },
      load () {
        this.fetchMessages()
      }
    },
    created () {
      this.load()
      this.$root.$on('quote', (message) => {
        let newlines = this.text.length == 0 ||
        this.text.substr(this.text.length - 2) == '\n\n' ? '' : '\n\n'
        this.text += newlines + message + '\n\n'
      })
    }
  }
</script>

<style>
  #chat {
    margin: 10px;
  }
  #messages {
    overflow: auto;
  }
  .text, .autograph {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .text p img {
    max-width: 100%;
  }
  .clickable { cursor: pointer; }
</style>
