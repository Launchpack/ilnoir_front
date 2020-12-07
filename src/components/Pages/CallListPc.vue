<template>
<div class="flex-justify">
  <div :style="pcMaxWidth">
    <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
    <block-call-list style="margin-top: 32px"></block-call-list>
  </div>
</div>
</template>
<script>
import BlockCallList from "@/components/Components/Block/BlockCallList"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'CallListPc',
  components: {
    BlockCallList,
    BreadCrumbPc
  },
  mixins: [
    PageMixin,
    BlockMixin
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
          "link": "call_list",
          "name": "전화연결 내역"
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
    gnbStyle() {
      return {
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border
      }
    },
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>


