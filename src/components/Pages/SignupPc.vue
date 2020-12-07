<template>
<div class="flex-justify" :style="[pageBg]">
  <div :style="pcMaxWidth">
    <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
    <block-signup-pc></block-signup-pc>
  </div>
</div>
</template>
<script>
import BlockSignupPc from "@/components/Components/Block/BlockSignupPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'SignupPc',
  components: {
    BlockSignupPc,
    BreadCrumbPc
  },
  mixins: [
    HeaderMixin,
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
          "link": "signup",
          "name": "회원가입"
        }
      ]
    }
  },
  created() {

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


