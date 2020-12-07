<template>
<div :style="pageBg">
  <pattern-img>
    <block-program-pc></block-program-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockProgramPc from "@/components/Components/Block/BlockProgramPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ProgramPc',
  components: {
    BlockProgramPc,
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
          "link": "notice",
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


