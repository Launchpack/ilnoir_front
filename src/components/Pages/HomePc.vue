<template>
<div :style="pageBg">
  <div class="divider-grident"></div>

  <block-banner @getBanner="afterBannerSet" :bannerId="1"></block-banner>
  
  <template lp-block-wrapper v-if="bannerSet">  
    <transition-group name="fade">
      <block-home-info key="home-info"></block-home-info>
      <block-home-about key="home-about"></block-home-about>
      <block-home-youtube key="home-youtube"></block-home-youtube>
      <block-home-news key="home-news"></block-home-news>
      <block-home-album key="home-album"></block-home-album>
    </transition-group>
  </template>
</div>
</template>
<script>
import BlockHomeInfo from "@/components/Components/Block/BlockHomeInfo"
import BlockHomeAbout from "@/components/Components/Block/BlockHomeAbout"
import BlockHomeYoutube from "@/components/Components/Block/BlockHomeYoutube"
import BlockHomeNews from "@/components/Components/Block/BlockHomeNews"
import BlockHomeAlbum from "@/components/Components/Block/BlockHomeAlbum"
import BlockBanner from "@/components/Components/Block/BlockBanner"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'HomePc',
  components: {
    BlockHomeInfo,
    BlockHomeAbout,
    BlockHomeYoutube,
    BlockHomeNews,
    BlockHomeAlbum,
    BlockBanner
  },
  mixins: [
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "bannerSet": false
    }
  },
  created() {
  },
  mounted() {

  },
  
  methods: {
    afterBannerSet() {
      this.bannerSet = true;
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
  height: 16px;
  background: linear-gradient(45deg, #b39f5a, #074A33);
}
</style>

