<template>
<div :id="`card-exhibition-${idx}`" class="overflow-hidden" @click="clickCard">
  
  <!--<img v-lazy="card.img" class="full-width object-fit-cover" :style="[radius]" style="height:192px" />-->
  <e-image :isBg="false" :isLazy="false" :img="card.img" :useThumb="true" :width="320" :imageRates="imageRates" :style="radius"></e-image>
  
  <div class="flex wrap" style="padding:12px">
    <div class="size-12" :style="brandColor.primary">{{ card.partner.name }}</div>
    <div class="size-16 weight-500 ellipsis" :style="brandColor.main" style="width:100%;height:26px;">{{ card.name }}</div>
    <div class="size-12 ellipsis" :style="brandColor.sub" style="width:100%;height:20px;">{{ card.simple_desc }}</div>
  </div>
  
</div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"

export default {
  name: 'CardProductExhibition',
  components: {

  },
  mixins: [
    CardMixin
  ],
  props: {
    idx: {
      type: Number,
    },
    card: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      "width": 0,
      "imageRates": {
        "type": "product_card",
        "ratio": "4:3",
        "exception": []
      }
    }
  },
  created() {

  },
  mounted() {
    
  },
  
  methods: {
    clickCard() {
      this.routerPush(`product_detail?id=${this.card.id}`);
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.overlay {
    background-color: rgba(0,0,0,0.2);
  }
</style>

