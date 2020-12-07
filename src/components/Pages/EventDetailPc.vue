<template>
<div :style="pageBg">
  <block-event-detail-pc></block-event-detail-pc>
</div>
</template>
<script>
import BlockEventDetailPc from "@/components/Components/Block/BlockEventDetailPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'EventDetailPc',
  components: {
    BlockEventDetailPc
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


