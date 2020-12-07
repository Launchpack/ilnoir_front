<template>
<div :style="[pageBg]">
  <div :style="pagePaddingAll">
    <block-contact-detail></block-contact-detail>
  </div>
</div>
</template>
<script>
import BlockContactDetail from "@/components/Components/Block/BlockContactDetail"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ContactDetail',
  components: {
    BlockContactDetail
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


