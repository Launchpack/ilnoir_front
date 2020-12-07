<template>
<div :style="[pageBg]">
  <header-title-mobile>그릿12 훈련 프로그램 상세</header-title-mobile>
  <block-program style="min-height:60vh"></block-program>
</div>
</template>
<script>
import BlockProgram from "@/components/Components/Block/BlockProgram"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Program',
  components: {
    BlockProgram,
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


