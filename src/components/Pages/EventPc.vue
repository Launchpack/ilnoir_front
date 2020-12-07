<template>
<div :style="pageBg">
  <block-event-pc></block-event-pc>
</div>
</template>
<script>
import BlockEventPc from "@/components/Components/Block/BlockEventPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'EventPc',
  components: {
    BlockEventPc
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


