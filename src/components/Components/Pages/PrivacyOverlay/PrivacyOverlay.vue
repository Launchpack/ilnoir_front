<template>
<div class="flex-justify wrap" :style="[containerStyle, pageBg]">
  <div class="header-title" style="padding-bottom:40px;font-size:20px;font-weight:600" :style="brandColor.main">개인정보 처리방침</div>
  <block-privacy></block-privacy>
</div>
</template>
<script>
import BlockPrivacy from "@/components/Components/Block/BlockPrivacy"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'PrivacyOverlay',
  components: {
    BlockPrivacy
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
    containerStyle() {
        return {
          backgroundColor: this.getColor('기본 배경 색상'),
        }
      }
  },
  watch: {
    
  }
}
</script>


