<template>
<div :style="[pageBg]">
  <header-title-mobile>교육관 및 사회공헌활동</header-title-mobile>
  <block-info style="min-height:70vh"></block-info>
</div>
</template>
<script>
import BlockInfo from "@/components/Components/Block/BlockInfo"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Info',
  components: {
    BlockInfo,
    HeaderTitleMobile
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


