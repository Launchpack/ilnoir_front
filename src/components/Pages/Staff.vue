<template>
<div :style="[pageBg]">
  <header-title-mobile>감독 및 팀원 소개</header-title-mobile>
  <block-staff></block-staff>
</div>
</template>
<script>
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import BlockStaff from "@/components/Components/Block/BlockStaff"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Staff',
  components: {
    HeaderTitleMobile,
    BlockStaff
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


