<template>
<div>
  <page-header :style="{borderBottom: `${brandBorder.main.border}`}">
    <div slot="left">
      <!--<img :src="logo" style="width:32px; margin: 0 10px;" @click="closeDrawer(); routerPush('home')"/>-->
      <img :src="logo" style="width:32px; margin: 0 10px;" @click="clickLogo"/>
    </div>
    <div slot="right">
      <!--<i class="material-icons unselect size-22" style="padding:10px;" @click="closeDrawer">close</i>-->
      <i class="material-icons unselect size-22" style="padding:10px;" @click="$emit('closePage')">close</i>
    </div>
  </page-header>
  
  <block-drawer style="margin-top:50px" @closePage="$emit('closePage')"></block-drawer>
</div>
</template>
<script>
import BlockDrawer from "@/components/Components/Block/BlockDrawer"

export default {
  name: 'MenuDrawer',
  components: {
    BlockDrawer
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
    clickLogo() {
      this.$emit('closePage');
      this.routerPush('home');
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


