<template>
<div :style="[pageBg]">
  
  <div style="min-height:230px">
    <transition name="fade" tag="div">
      <list-my-review></list-my-review>
    </transition>
  </div>

</div>
</template>
<script>
import PageHeaderMobile from "@/components/Components/Common/PageHeaderMobile"
import ListMyReview from "@/components/Components/List/ListMyReview"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MyReview',
  components: {
    PageHeaderMobile,
    ListMyReview
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


