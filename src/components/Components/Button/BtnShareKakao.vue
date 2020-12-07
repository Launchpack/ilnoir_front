<template>
  <btn
      id="kakao-link"
      :color="brandColor.white"
      :backgroundColor="{backgroundColor: 'rgb(251, 227, 0)'}"
      @clicked="clickShare">
    <div class="btn-txt">카카오톡</div>
  </btn>
</template>

<script>
  export default {
    name: "BtnShareKakao",

    props: {
      shareData: {
        type: Object,
        required: false
      }
    },

    head: {
      script() {
        return [
          {type: 'text/javascript', src: 'https:////developers.kakao.com/sdk/js/kakao.min.js', head: true}
        ];
      }
    },

    created() {
      setTimeout(() => {
        // 카카오톡 공유버튼 초기화
        Kakao.init(this.$store.getters.social_key.kakao.javascript_key);

        // 카카오 링크
        Kakao.Link.createDefaultButton({
          container: '#kakao-link',
          objectType: 'feed',
          content: {
            title: this.shareData.name,
            description: this.shareData.desc,
            imageUrl: this.shareData.img,
            link: {
              mobileWebUrl: this.shareData.link,
              webUrl: this.shareData.link
            }
          },
          /*social: {
            likeCount: 286,
            commentCount: 45,
            sharedCount: 845
          },*/
          buttons: [
            {
              title: '웹으로 보기',
              link: {
                mobileWebUrl: this.shareData.link,
                webUrl: this.shareData.link
              }
            },
            {
              title: '앱으로 보기',
              link: {
                mobileWebUrl: `${location.origin}/share_link?path=${location.pathname.substring(1) + location.search.replace('?','&')}`,
                webUrl: this.shareData.link
              }
            }
          ]
        });

      }, 2000);
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
