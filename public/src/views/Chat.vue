<template>
  <Chat :fullHeight='true'></Chat>
</template>

<script>
  import Chat from '../components/Chat.vue'
  export default {
    name: 'chat-view',
    components: { Chat }
  }
</script>
