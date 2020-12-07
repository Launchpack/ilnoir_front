<template>
  <btn
      id="kakaostory-share"
      :backgroundColor="{backgroundColor: 'rgb(251, 227, 0)'}"
      @clicked="clickShare">
    <div class="btn-txt">카카오스토리</div>
  </btn>
</template>

<script>
  export default {
    name: "BtnShareKakaostory",

    props: {
      shareData: {
        type: Object,
        required: false
      }
    },

    created() {
      setTimeout(() => {
        // 카카오스토리
        Kakao.Story.createShareButton({
          container: '#kakaostory-share',
          url: this.shareData.link,
          text: this.shareData.name + '\n\n'
        });
      }, 2000)
    },

    methods: {
      clickShare() {
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
    color rgb(59,30,30)
    font-size 14.25px
</style>

<style lang="stylus">
  #kakaostory-share img
    display none !important
  #kakaostory-share
    position relative
  #kakaostory-share a
    position absolute
    width 100%
    height 100%
    top 0
    left 0

</style>
