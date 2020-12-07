<template>
<div class="flex-justify">

  <div :style="pcMaxWidth">
    <transition name="fade" tag="div">
      <list-my-review-pc></list-my-review-pc>
    </transition>
  </div>

</div>
</template>
<script>
import ListMyReviewPc from "@/components/Components/List/ListMyReviewPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MyReviewPc',
  components: {
    ListMyReviewPc
  },
  mixins: [
    BlockMixin,
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


