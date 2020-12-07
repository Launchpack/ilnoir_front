<template>
<div :style="pageBg">
  <pattern-img>
    <div>
    <div class="size-12" :style="brandColor.white">
      <span>홈</span> > 
      <span>NEWS</span> >
      <span>공지</span>
    </div>
    <div class="size-15 weight-500" :style="brandColor.brand">공지</div>
  </div>
  
    <block-notice-detail-pc></block-notice-detail-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockNoticeDetailPc from "@/components/Components/Block/BlockNoticeDetailPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'NoticeDetailPc',
  components: {
    BlockNoticeDetailPc,
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
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "name": "공지사항"
        }
      ]
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


