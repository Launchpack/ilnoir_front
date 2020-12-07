<template>
<div :style="[pageHeight,wrapperStyle, pageBg]">
  <div :style="[pagePadding]" style="padding-bottom: 1px;">
    <block-signup></block-signup>
  </div>
</div>
</template>
<script>
import BlockSignup from "@/components/Components/Block/BlockSignup"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Signup',
  components: {
    BlockSignup
  },
  mixins: [
    HeaderMixin,
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


