<template>
<div style="width:100%;max-height:70%;padding:24px 0 16px" :style="[brandBgColor.white, radius, pagePadding]">
  
  <div class="size-20 weight-500 margin-bottom-16" :style="brandColor.main">이용약관</div>
  
  <div :style="[scrollStyle, pageBg, radius]">
    <block-termsofservice></block-termsofservice>
  </div>
  
  <div class="full-width flex-center">
    <div class="full-width unselect flex-center weight-500" 
      :style="[brandBgColor.primary, brandColor.white, radius]" style="height:48px"
      @click.stop.prevent="$emit('closePage')">닫기</div>
  </div>
  
</div>
</template>
<script>
import BlockTermsofservice from "@/components/Components/Block/BlockTermsofservice"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'TermsofserviceModal',
  components: {
    BlockTermsofservice
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
    scrollStyle() {
      return {
        // margin: '12px',
        height: '280px',
        overflowY: 'auto',
        marginBottom: '32px'
      }
    },
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>


