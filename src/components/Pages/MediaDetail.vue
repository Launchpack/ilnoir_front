<template>
<div :style="[pageBg]">
  <header-title-mobile>미디어 소개</header-title-mobile>
  <block-media-detail></block-media-detail>
</div>
</template>
<script>
import BlockMediaDetail from "@/components/Components/Block/BlockMediaDetail"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MediaDetail',
  components: {
    BlockMediaDetail,
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


