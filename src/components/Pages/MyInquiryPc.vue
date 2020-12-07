<template>
<div class="flex-justify">
  <div :style="pcMaxWidth">
    <transition name="fade" tag="div">
      <list-my-inquiry-pc></list-my-inquiry-pc>
    </transition>
  </div>
</div>
</template>
<script>
import ListMyInquiryPc from "@/components/Components/List/ListMyInquiryPc"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'MyInquiryPc',
  components: {
    ListMyInquiryPc
  },
  mixins: [
    PageMixin,
    BlockMixin
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


