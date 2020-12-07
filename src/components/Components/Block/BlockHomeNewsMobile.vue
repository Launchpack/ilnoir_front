<template>
<div :style="pagePadding" style="padding-top:40px">  
<div :style="brandColor.white" class="text-center bold margin-bottom-20 size-20">News</div>
    <card-img-txt-horizon
        v-for="(item,idx) in list"
        :key="`card-${item.id}`"
        :card="item"
        :idx="idx"
        :style="cardStyle(idx)"
        ></card-img-txt-horizon>
</div>
</template>
<script>
import CardImgTxtHorizon from "@/components/Components/Card/CardImgTxtHorizon"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockHomeNewsMobile',
  components: {
    CardImgTxtHorizon
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": []
    }
  },
  created() {
    this.getList();
  },
  mounted() {

  },
  
  methods: {
    getList() {
      this.$axios.get(`public/board/1/post`)
      .then(res => {
        this.list = res.data.data.slice(0,4);
      })
    },
    cardStyle(idx) {
      let obj = {
        paddingBottom: '12px'
      };

      return obj;
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


