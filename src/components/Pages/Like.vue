<template>
<div :style="[pageBg]">
  <block-like></block-like>
</div>
</template>
<script>
import BlockLike from "@/components/Components/Block/BlockLike"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Like',
  components: {
    BlockLike
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


