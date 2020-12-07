<template>
<div :style="[pageBg]">
  <header-title-mobile>어린이 축구 대회 리스트</header-title-mobile>
  <block-competition></block-competition>
</div>
</template>
<script>
import BlockCompetition from "@/components/Components/Block/BlockCompetition"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Competition',
  components: {
    BlockCompetition,
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


