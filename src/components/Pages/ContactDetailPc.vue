<template>
<div class="flex-justify" :style="[pageBg]">
  <div :style="pcMaxWidth">
    <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
    <block-contact-detail style="margin-top: 32px"></block-contact-detail>
  </div>
</div>
</template>
<script>
import BlockContactDetail from "@/components/Components/Block/BlockContactDetail"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ContactDetailPc',
  components: {
    BlockContactDetail,
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
        },
        {
          "link": "",
          "name": "1:1문의"
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


