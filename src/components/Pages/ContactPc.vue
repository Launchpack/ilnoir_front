<template>
<div class="flex-justify" :style="[pageBg]">
  <div :style="pcMaxWidth">
    <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
    <block-contact style="margin-top: 32px"></block-contact>
  </div>
</div>
</template>
<script>
import BlockContact from "@/components/Components/Block/BlockContact"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ContactPc',
  components: {
    BlockContact,
    BreadCrumbPc
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
          "link": "contact",
          "name": "1:1문의 목록"
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


