<template>
<div :style="pageBg">
  <div class="flex-justify">
    <block-inquiry-reg-pc></block-inquiry-reg-pc>
  </div>
</div>
</template>
<script>
import BlockInquiryRegPc from "@/components/Components/Block/BlockInquiryRegPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'InquiryRegPc',
  components: {
    BlockInquiryRegPc
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


