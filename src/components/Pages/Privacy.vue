<template>
<div class="flex-justify wrap" :style="pageBg">
    <page-header>
      <span class="header-title" slot="center">개인정보 처리방침</span>
    </page-header>

    <div :style="wrapperStyle" class="position-relative full-width" style="padding:20px">
      <block-privacy></block-privacy>
    </div>
  </div>
</template>
<script>
import BlockPrivacy from "@/components/Components/Block/BlockPrivacy"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'Privacy',
  components: {
    BlockPrivacy
  },
  mixins: [
    PageMixin,
    HeaderMixin
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
    
  },
  watch: {
    
  }
}
</script>


