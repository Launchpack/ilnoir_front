<template>
<div class="flex-justify" :style="[pageBg]">
  <div style="width:600px">
    <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
    <block-contact-reg style="margin-top: 32px"></block-contact-reg>
  </div>
</div>
</template>
<script>
import BlockContactReg from "@/components/Components/Block/BlockContactReg"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'ContactRegPc',
  components: {
    BlockContactReg,
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
      "vDelay": false,
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
          "name": "1:1문의 작성"
        }
      ]
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.vDelay = true;
    }, 500);
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


