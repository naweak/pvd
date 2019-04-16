<template>
  <div class="message">
    <div class="text" v-html='parser(message.text)'></div>
    <div class='autograph'>
      {{ message.author }}, {{ date(message.createDate) }}, <a href="javascript:void(0)" v-on:click="quote()">цитировать</a>
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
