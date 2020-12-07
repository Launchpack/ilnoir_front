<template>
<div>
  <page-header :style="{borderBottom: `${brandBorder.main.border}`}">
    <div slot="left">
      <i class="material-icons unselect size-22" style="padding: 12px;" @click="closePage">arrow_back</i>
      <img :src="logo" style="height:36px" @click="clickLogo"/>
    </div>
  </page-header>
  
  <block-drawer-login style="margin-top:50px" @closePage="closePage"></block-drawer-login>
</div>
</template>
<script>
import BlockDrawerLogin from "@/components/Components/Block/BlockDrawerLogin"

export default {
  name: 'MenuLoginDrawer',
  components: {
    BlockDrawerLogin
  },
  mixins: [

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
    closePage() {
      this.$emit('closePage')
    },
    clickLogo() {
      this.closePage();
      this.routerPush('home');
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


