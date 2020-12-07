<template>
  <btn
      v-if="socialKey.apple && socialKey.apple.enable.login && enableApple"
      :color="brandColor.white"
      :backgroundColor="{backgroundColor: 'rgb(0, 0, 0)'}"
      @clicked="appleLogin">
    <div class="flex-center">
      <img class="btn-img" src="/static/image/icon/ic_apple.png">
      <div class="btn-txt">Apple로 로그인</div>
    </div>
  </btn>
</template>

<script>
  export default {
    name: "BtnSigninApple",
    computed: {
      socialKey() {
        return this.$store.getters.social_key;
      },
      enableApple() {
        return !( /Android/i.test(navigator.userAgent))
      }
    },

    methods: {
      async appleLogin() {
        const data = await AppleID.auth.signIn();
        // console.log(data)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .btn-img
    width 18px
    height 18px
    margin-right 4px
  .btn-txt
    color rgb(255, 255, 255)
    font-size 14.25px
</style>