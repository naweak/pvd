<template>
  <div class="message card">
    <div class="card-body">
      <div class="text" v-html='parser(message.text)'></div>
      <div class='autograph'>
        {{ message.author }}, {{ date(message.createDate) }}<span v-if="$root.userInfo">, <a href="javascript:void(0)" v-on:click="quote()">цитировать</a></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chat-message',
    props: ['message'],
    methods: {
      parser (text) {
        text = this.$markdown.render(text)
        this.$root.config.smileysList.forEach((elem) => {
          text = text.replace(new RegExp(`:${elem}:`, 'ig'), `<img class='smiley' src='${this.$root.config.smileys}/${elem}.png' alt=':${elem}:' title=':${elem}:'/>`)
        })
        return text
      },
      quote () {
        let select = window.getSelection().toString() || this.message.text
        let message = `*${this.message.author}, ${this.date(this.message.createDate)}*:

>${select}`
        this.$root.$emit('quote', message)
      }
    }
  }
</script>

<style>
  .message {
    margin: 10px;
  }
</style>
