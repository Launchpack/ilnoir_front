<template>
<div :style="[pageBg]">
  <header-title-mobile>공지</header-title-mobile>
  <block-notice-detail></block-notice-detail>
</div>
</template>
<script>
import BlockNoticeDetail from "@/components/Components/Block/BlockNoticeDetail"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'NoticeDetail',
  components: {
    BlockNoticeDetail,
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


