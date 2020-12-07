<template>
<div :style="pageBg">
  <div class="flex-justify full-width">
    <block-like-pc></block-like-pc>
  </div>
</div>
</template>
<script>
import BlockLikePc from "@/components/Components/Block/BlockLikePc"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'LikePc',
  components: {
    BlockLikePc
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


