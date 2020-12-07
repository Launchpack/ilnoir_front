<template>
<div :style="pageBg">
  <block-review-reg-pc></block-review-reg-pc>
</div>
</template>
<script>
import BlockReviewRegPc from "@/components/Components/Block/BlockReviewRegPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ReviewRegPc',
  components: {
    BlockReviewRegPc
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


