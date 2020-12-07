<template>
<div :style="pageBg">
    <block-drawer-login></block-drawer-login>
  </div>
</template>
<script>
import BlockDrawerLogin from "@/components/Components/Block/BlockDrawerLogin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MyPage',
  components: {
    BlockDrawerLogin
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
  
  methods: {
    
  },
  computed: {
    pageBg() {
      return this.brandBgColor.white;
    }
  },
  watch: {
    
  }
}
</script>


