<template>
<div :style="[pageHeight, pageBg]">
  <div class="divider-grident"></div>
  <block-banner-mobile @getBanner="afterBannerSet" style="margin-bottom:24px"></block-banner-mobile>
  <template lp-block-wrapper>  
    <transition-group name="fade">
      <block-home-info-mobile key="home-info-mobile"></block-home-info-mobile>
      <block-home-about-mobile key="home-about-mobile"></block-home-about-mobile>
      <block-home-youtube-mobile key="home-youtube-mobile" ></block-home-youtube-mobile>
      <block-home-news-mobile key="home-news-mobile" ></block-home-news-mobile>
      <block-home-album-mobile key="home-album-mobile" ></block-home-album-mobile>
    </transition-group>
  </template>
</div>
  </template>
</template>
<script>
import BlockHomeInfoMobile from "@/components/Components/Block/BlockHomeInfoMobile"
import BlockHomeYoutubeMobile from "@/components/Components/Block/BlockHomeYoutubeMobile"
import BlockHomeAboutMobile from "@/components/Components/Block/BlockHomeAboutMobile"
import BlockHomeNewsMobile from "@/components/Components/Block/BlockHomeNewsMobile"
import BlockHomeAlbumMobile from "@/components/Components/Block/BlockHomeAlbumMobile"
import BlockBannerMobile from "@/components/Components/Block/BlockBannerMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Home',
  components: {
    BlockHomeInfoMobile,
    BlockHomeYoutubeMobile,
    BlockHomeAboutMobile,
    BlockHomeNewsMobile,
    BlockHomeAlbumMobile,
    BlockBannerMobile
  },
  mixins: [
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "address": undefined,
      "showBanner": true
    }
  },
  created() {
  
  
},
  mounted() {
  },
  
  methods: {
    afterBannerSet() {
      this.showBanner = true;
    }
  },
  computed: {
    pageBg() {
          return this.brandBgColor.main;
        }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.divider-grident {
    width: 100%;
    height: 12px;
    background: linear-gradient(45deg, #b39f5a, #074A33);
  }
</style>

