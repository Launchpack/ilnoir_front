<template>
<div :style="pageBg">
  <pattern-img>
    <block-notice-pc style="padding-top: 32px"></block-notice-pc>
  </pattern-img>
</div>
</template>
<script>
import BlockNoticePc from "@/components/Components/Block/BlockNoticePc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'NoticePc',
  components: {
    BlockNoticePc
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


