<template>
<div :style="[pageBg]" style="margin-top:50px">
  <header-title-mobile>훈련 사진 및 영상</header-title-mobile>
  <block-training></block-training>
</div>
</template>
<script>
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import BlockTraining from "@/components/Components/Block/BlockTraining"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Training',
  components: {
    HeaderTitleMobile,
    BlockTraining
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


