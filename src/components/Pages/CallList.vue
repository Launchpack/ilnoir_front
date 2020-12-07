<template>
<div :style="[pageHeight, pageBg]">

  <transition name="fade">
    <block-call-list></block-call-list>
  </transition>
</div>
</template>
<script>
import BlockCallList from "@/components/Components/Block/BlockCallList"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CallList',
  components: {
    BlockCallList
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
          backgroundColor: this.brandBgColor.main.backgroundColor
        }
      }
  },
  watch: {
    
  }
}
</script>


