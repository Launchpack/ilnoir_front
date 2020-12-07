<template>
<div :style="pageBg">
  <pattern-img>
    <div>
    <div class="size-12" :style="brandColor.white">
      <span>홈</span> > 
      <span>GRIT12</span> >
      <span>훈련 사진 및 영상</span> >
      <span>사진</span>
    </div>
    <div class="size-15 weight-500" :style="brandColor.brand">훈련 사진 및 영상</div>
  </div>
    <block-training-detail-pc></block-training-detail-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockTrainingDetailPc from "@/components/Components/Block/BlockTrainingDetailPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'TrainingDetailPc',
  components: {
    BlockTrainingDetailPc,
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


