<template>
<div>
  <page-header-mobile type="close" 
    :currentStatus="currentStatus"
    @currentStatus="currentStatus=false"
    :changePosition="changePosition" 
    @changePosition="changePosition=undefined"></page-header-mobile>
  <div :style="[wrapperStyle, pageHeight, pageBg]">
    <block-region 
      @setCurrent="currentStatus=true"
      @changePosition="region => changePosition=region"></block-region>
  </div>
</div>
</template>
<script>
import PageHeaderMobile from "@/components/Components/Common/PageHeaderMobile"
import BlockRegion from "@/components/Components/Block/BlockRegion"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Region',
  components: {
    PageHeaderMobile,
    BlockRegion
  },
  mixins: [
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "currentStatus": false,
      "changePosition": undefined
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


