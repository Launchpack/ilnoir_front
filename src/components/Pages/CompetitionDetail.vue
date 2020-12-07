<template>
<div :style="pageBg">
  <header-title-mobile>상세 내역 및 신청</header-title-mobile>
  <block-competition-detail></block-competition-detail>
</div>
</template>
<script>
import BlockCompetitionDetail from "@/components/Components/Block/BlockCompetitionDetail"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CompetitionDetail',
  components: {
    BlockCompetitionDetail,
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


