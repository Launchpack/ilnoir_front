<template>
<div :style="[pageBg]">
  <header-title-mobile>훈련 사진 및 영상</header-title-mobile>
  <block-training-detail></block-training-detail>
</div>
</template>
<script>
import BlockTrainingDetail from "@/components/Components/Block/BlockTrainingDetail"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'TrainingDetail',
  components: {
    BlockTrainingDetail,
    HeaderTitleMobile
  },
  mixins: [
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


