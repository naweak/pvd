<script>
  export default {
    name: "Logout",
    created () {
      this.$cookies.remove('token')
      this.$root.updateUserInfo()
      this.$router.push('/')
    }
  }
</script>
