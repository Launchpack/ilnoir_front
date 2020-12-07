<template>
<div :style="[pageBg]">
  <header-title-mobile>미디어 소개</header-title-mobile>
  <block-media></block-media>
</div>
</template>
<script>
import BlockMedia from "@/components/Components/Block/BlockMedia"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Media',
  components: {
    BlockMedia,
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


