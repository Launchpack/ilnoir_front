<template>
<div class="flex-justify wrap" :style="[containerStyle, pageBg]">
    <page-header>
      <span slot="center">이용약관</span>
    </page-header>

    <div :style="wrapperStyle" class="position-relative full-width" style="padding:20px">
      <div class="lp-block-wrapper">
        <block-termsofservice></block-termsofservice>
      </div>
    </div>
  </div>
</template>
<script>
import BlockTermsofservice from "@/components/Components/Block/BlockTermsofservice"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'Termsofservice',
  components: {
    BlockTermsofservice
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
    containerStyle() {
        return {
          backgroundColor: this.getColor('기본 배경 색상'),
          // minHeight: '100vh'
        }
      }
  },
  watch: {
    
  }
}
</script>


