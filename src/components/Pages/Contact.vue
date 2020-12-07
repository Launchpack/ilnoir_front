<template>
<div :style="[pageBg]">
  <div :style="pagePaddingAll">
    <block-contact></block-contact>
  </div>
</div>
</template>
<script>
import BlockContact from "@/components/Components/Block/BlockContact"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Contact',
  components: {
    BlockContact
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


