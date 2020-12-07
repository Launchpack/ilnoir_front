<template>
<div :style="[pageBg]">
  <block-event-detail></block-event-detail>
</div>
</template>
<script>
import BlockEventDetail from "@/components/Components/Block/BlockEventDetail"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'EventDetail',
  components: {
    BlockEventDetail
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


