<template>
<div :style="[pageBg]">
  <div style="min-height:560px">
    <transition name="fade" tag="div">
      <block-event></block-event>    
    </transition>
  </div>
</div>
</template>
<script>
import BlockEvent from "@/components/Components/Block/BlockEvent"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Event',
  components: {
    BlockEvent
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


