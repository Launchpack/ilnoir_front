<template>
<div style="padding:48px 0 64px" :style="[containerStyle, pageBg]">
  
    <div class="flex-center">
      <img :src="$store.getters.brand.logo"
        class="object-fit-contain" style="height:40px;">
    </div>

    <div :style="pagePadding" style="margin-top:48px;">
      <block-signin></block-signin>
    </div>
  </div>
</template>
<script>
import BlockSignin from "@/components/Components/Block/BlockSignin"
import BlockPasswordEmail from "@/components/Components/Block/BlockPasswordEmail"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'Signin',
  components: {
    BlockSignin,
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
    containerStyle() {
        return {
          minHeight: '100vh'
        }
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
