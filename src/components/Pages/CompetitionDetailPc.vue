<template>
<div :style="pageBg">
  <pattern-img>
    <block-competition-detail-pc style="padding-top: 32px"></block-competition-detail-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockCompetitionDetailPc from "@/components/Components/Block/BlockCompetitionDetailPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CompetitionDetailPc',
  components: {
    BlockCompetitionDetailPc
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


