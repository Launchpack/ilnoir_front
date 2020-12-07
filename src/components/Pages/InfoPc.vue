<template>
<div :style="pageBg">
  <pattern-img>
    <block-info-pc></block-info-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockInfoPc from "@/components/Components/Block/BlockInfoPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'InfoPc',
  components: {
    BlockInfoPc,
    PatternImg
  },
  mixins: [
    BlockMixin,
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


