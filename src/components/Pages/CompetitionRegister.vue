<template>
<div :style="pageBg">
  <header-title-mobile>상세 내역 및 신청</header-title-mobile>
  <block-competition-register></block-competition-register>
</div>
</template>
<script>
import BlockCompetitionRegister from "@/components/Components/Block/BlockCompetitionRegister"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CompetitionRegister',
  components: {
    BlockCompetitionRegister,
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


