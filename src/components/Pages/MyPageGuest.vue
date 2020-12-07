<template>
<div :style="pageBg">
    <block-drawer></block-drawer>
  </div>
</template>
<script>
import BlockDrawer from "@/components/Components/Block/BlockDrawer"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MyPageGuest',
  components: {
    BlockDrawer
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


