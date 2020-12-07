<template>
<div :style="[pageBg]">
  <header-title-mobile>공지</header-title-mobile>
  <block-notice></block-notice>
</div>
</template>
<script>
import BlockNotice from "@/components/Components/Block/BlockNotice"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Notice',
  components: {
    BlockNotice,
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


