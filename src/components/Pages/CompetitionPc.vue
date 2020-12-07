<template>
<div :style="pageBg">
  <pattern-img>
    <block-competition-pc></block-competition-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockCompetitionPc from "@/components/Components/Block/BlockCompetitionPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CompetitionPc',
  components: {
    BlockCompetitionPc,
    BreadCrumbPc,
    PatternImg
  },
  mixins: [
    BlockMixin,
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "name": "공지사항"
        }
      ]
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


