<template>
<div :style="pageBg">

  <transition name="fade">
    <div class="flex-justify">
      <block-partner-detail-pc
        @share="emitShare"></block-partner-detail-pc>
    </div>
  </transition>
  
  <share ref="share" v-if="detail" :product="detail"></share>
</div>
</template>
<script>
import BlockPartnerDetailPc from "@/components/Components/Block/BlockPartnerDetailPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'PartnerDetailPc',
  components: {
    BlockPartnerDetailPc
  },
  mixins: [
    BlockMixin,
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "detail": undefined
    }
  },
  created() {
    this.getDetail();
  },
  mounted() {

  },
  
  methods: {
    getDetail() {
      this.$api.PartnerDetail(this).then(res => {
        this.detail = res;
      })
    },
    emitShare() {
      this.$refs.share.share=true;
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


