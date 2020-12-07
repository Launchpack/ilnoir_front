<template>
<div :style="[pageHeight, pageBg]">

  <block-inquiry-reg></block-inquiry-reg>
</div>
</template>
<script>
import BlockInquiryReg from "@/components/Components/Block/BlockInquiryReg"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'InquiryReg',
  components: {
    BlockInquiryReg
  },
  mixins: [
    PageMixin,
    HeaderMixin
  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {
      //this.login_required = true;
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


