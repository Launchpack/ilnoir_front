<template>
<div class="flex-center" :style="[pageBg]" style="height:100vh;">
  <div style="width: 360px;">
    <div class="flex-center">
      <img :src="$store.getters.brand.logo"
        class="object-fit-contain" style="height:40px;">
    </div>

    <div :style="pagePadding" style="margin-top:48px;">
      <block-signin-pc></block-signin-pc>
    </div>
  </div>
</div>
</template>
<script>
import BlockSigninPc from "@/components/Components/Block/BlockSigninPc"
import BlockPasswordEmail from "@/components/Components/Block/BlockPasswordEmail"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'SigninPc',
  components: {
    BlockSigninPc,
    BlockPasswordEmail
  },
  mixins: [
    PageMixin,
    HeaderMixin
  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    logo() {
      if (this.$store.getters.brand) return this.$store.getters.brand.logo;
    },
    service() {
        return this.$store.getters.service;
      },
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>

<style>
.sub-tip {
  margin-top: 12px;
  text-align: center;
  color: #777;
}
</style>
