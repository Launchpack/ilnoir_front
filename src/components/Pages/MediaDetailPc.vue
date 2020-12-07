<template>
<div :style="pageBg">
  <pattern-img>
    <div>
    <div class="size-12" :style="brandColor.white">
      <span>홈</span> > 
      <span>NEWS</span> >
      <span>미디어 소개</span>
    </div>
    <div class="size-15 weight-500" :style="brandColor.brand">미디어 소개</div>
  </div>
    <block-media-detail-pc></block-media-detail-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockMediaDetailPc from "@/components/Components/Block/BlockMediaDetailPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MediaDetailPc',
  components: {
    BlockMediaDetailPc,
    PatternImg
  },
  mixins: [
    BlockMixin,
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
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


