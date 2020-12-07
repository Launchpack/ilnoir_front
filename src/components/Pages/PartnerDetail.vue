<template>
<div>
  <div :style="pagePadding" style="padding:32px 0 24px;min-height: 480px">
    <transition name="fade">
      <block-partner-detail-card></block-partner-detail-card>
    </transition>
  </div>
  
  <div :style="pagePadding" style="padding-bottom: 100px">
    <transition name="fade">
      <block-partner-detail-tab></block-partner-detail-tab>
    </transition>
  </div>
</div>
</template>
<script>
import BlockPartnerDetailCard from "@/components/Components/Block/BlockPartnerDetailCard"
import BlockPartnerDetailTab from "@/components/Components/Block/BlockPartnerDetailTab"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'PartnerDetail',
  components: {
    BlockPartnerDetailCard,
    BlockPartnerDetailTab
  },
  mixins: [
    PageMixin
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
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>


