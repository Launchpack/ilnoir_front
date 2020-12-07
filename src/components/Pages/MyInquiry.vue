<template>
<div :style="[pageBg]">
    <div style="min-height:230px">
    <transition name="fade" tag="div">
      <list-my-inquiry></list-my-inquiry>
    </transition>
  </div>
</div>
</template>
<script>
import ListMyInquiry from "@/components/Components/List/ListMyInquiry"
import PageHeaderMobile from "@/components/Components/Common/PageHeaderMobile"
import CategoryGnb from "@/components/Components/Common/CategoryGnb"
import FooterMobile from "@/components/Components/Footer/FooterMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MyInquiry',
  components: {
    ListMyInquiry,
    PageHeaderMobile,
    CategoryGnb,
    FooterMobile
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
      return this.brandBgColor.main
    }
  },
  watch: {
    
  }
}
</script>


