<template>
<div :style="pageBg">
  <pattern-img>
    <block-staff-pc></block-staff-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockStaffPc from "@/components/Components/Block/BlockStaffPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'StaffPc',
  components: {
    BlockStaffPc,
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


