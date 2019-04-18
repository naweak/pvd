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
        this.$root.config.smileysList.forEach((elem) => {
          text = text.replace(new RegExp(`:${elem}:`, 'ig'), `<img class='smiley' src='${this.$root.config.smileys}/${elem}.png' alt=':${elem}:' title=':${elem}:'/>`)
        })
        text = text.replace(/https:\/\/youtu.be\/(.*)<\/p>\s/i, `<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
        text = text.replace(/https:\/\/www.youtube.com\/watch\?v=(.*)<\/p>\s/i, `<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
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
