<template>
  <btn
      :color="brandColor.white"
      :backgroundColor="{backgroundColor: 'rgb(46, 69, 135)'}"
      @clicked="clickShare">
    <div class="btn-txt">페이스북</div>
  </btn>
</template>

<script>
  export default {
    name: "BtnShareFacebook",

    props: {
      shareData: {
        type: Object,
        required: false
      }
    },

    created() {
      window.fbAsyncInit = () => {
        FB.init({
          appId: this.$store.getters.social_key.facebook.client_id,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.1'
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/ko_KR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },

    methods: {
      clickShare() {
        FB.ui({
          method: 'share',
          mobile_iframe: true,
          href: this.shareData.link,
        }, function () {});
        if(this.shareData.isProduct)
          this.$axios.post(`public/product/${this.$route.query.id}/share`);
        if(this.shareData.isPartner)
          this.$axios.post(`public/partner/${this.$route.query.id}/share`);
        if(this.shareData.isPost)
          this.$axios.post(`public/board/0/post/${this.$route.query.id}/share`);
        this.$emit('onShare');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .btn-txt
    color rgb(255, 255, 255)
    font-size 14.25px
</style>
