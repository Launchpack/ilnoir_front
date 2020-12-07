<template>
  <div style="margin: 24px 0">
    <btn-signin-kakao style="margin-bottom:12px"></btn-signin-kakao>
    <btn-signin-facebook style="margin-bottom:12px"></btn-signin-facebook>
    <btn-signin-naver style="margin-bottom:12px"></btn-signin-naver>
    <btn-signin-apple></btn-signin-apple>
  </div>
</template>

<script>
  import BtnSigninKakao from "../Button/BtnSigninKakao";
  import BtnSigninFacebook from "../Button/BtnSigninFacebook";
  import BtnSigninNaver from "../Button/BtnSigninNaver";
  import AuthMixin from "@/components/Mixins/AuthMixin";
  import BtnSigninApple from "../Button/BtnSigninApple";
  export default {
    name: "CSnsSignin",
    mixins: [
      AuthMixin
    ],
    props: {
      startPage: {
        type: String,
        default: 'home'
      }
    },
    components: {
      BtnSigninApple,
      BtnSigninNaver,
      BtnSigninFacebook,
      BtnSigninKakao
    },
    created() {
      if (this.$route.query.user_id !== undefined) {
        this.$axios.post('auth/user/login/social', {
          username: this.$route.query.user_id,
          password: '',
          token: this.$route.query.token
        }).then(res => {
          this.setUserData(res.data);

          this.setAuthHeader();
          //this.$router.back();
          this.$router.replace(this.startPage);
        });
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>