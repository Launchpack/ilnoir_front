<template>
<div :style="[pageHeight, pageBg]">
  <header-title-mobile>수업 문의</header-title-mobile>
  <div :style="pagePaddingAll">
    <block-contact-reg></block-contact-reg>
  </div>
</div>
</template>
<script>
import BlockContactReg from "@/components/Components/Block/BlockContactReg"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ContactReg',
  components: {
    BlockContactReg,
    HeaderTitleMobile
  },
  mixins: [
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "vDelay": false
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.vDelay = true;
    }, 500);
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


