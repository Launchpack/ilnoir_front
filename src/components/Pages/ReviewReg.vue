<template>
<div :style="[pageHeight, pageBg]">
  <block-review-reg></block-review-reg>
</div>
</template>
<script>
import BlockReviewReg from "@/components/Components/Block/BlockReviewReg"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ReviewReg',
  components: {
    BlockReviewReg
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
      return {
        backgroundColor: 'rgba(255,255,255,1)'
      }
    }
  },
  watch: {
    
  }
}
</script>


