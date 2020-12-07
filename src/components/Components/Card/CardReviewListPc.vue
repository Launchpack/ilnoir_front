<template>
<div class="unselect" :style="[brandBgColor.white, brandBorder.sub]" style="border-radius: 8px;">
<div @click="clickCard" class="flex">
  <div class="flex">
    <!--<img :src="card.img" style="border-radius: 8px 0 0 8px; width:96px;height:96px;object-fit:cover">-->
    <e-image :isBg="false" :isLazy="false"
      :img="card.img" :useThumb="true" :width="96"
      :imageRates="imageRates" style="border-radius: 8px 0 0 8px"></e-image>
  </div>
  <div class="size-12 position-relative full-width" style="padding: 6px 15px 8px 16px" :style="[brandColor.main]">
    <div class="flex-between">
      <div class="size-12" :style="brandColor.brand">{{ card.product_info.partner.name }}</div>
      <rating :value="card.rate" :rateSize="10"
        rateColor="#f8d053"></rating>
    </div>
    <div class="size-12 position-relative">
      <div class="size-16 weight-500" :style="brandColor.main" style="width:100%">
        <div>{{ card.title }}</div>
      </div>
      <div class="size-12 ellipsis" :style="brandColor.sub" style="width:100%">{{ card.content }}</div>
      <div class="size-12" :style="brandColor.sub">{{ dateFormat(card.created_time, 'ago') }}</div>
    </div>
  </div>
    
</div>
</div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CardReviewListPc',
  components: {

  },
  mixins: [
    CardMixin,
    PageMixin
  ],
  props: {
    idx: {
      type: Number,
      required: true,
    },
    card: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      "imageRates": {
        "type": "post_card",
        "ratio": "1:1",
        "exception": []
      },
      "selectedId": undefined
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    clickCard() {
      this.$router.push(`/product_detail?id=${this.card.product_id}&tab=2`)
    }
  },
  computed: {
    reviewCount() {
      if (this.card.review_count!==undefined) return this.card.review_count;
      else if (this.card.reviews_count!==undefined) return this.card.reviews_count;
    },
    computedPrice() {
      if(this.card.price.discount_type===1) {
        return this.card.price.price - this.card.price.discount_price;
      }
      else if(this.card.price.discount_type===0) {
        return this.card.price.price * (1 - (this.card.price.discount_rate / 100));
      }
    },
    lineStyle() {
      return {
        height: '1px',
        backgroundColor: this.getColor('기본 테두리선 색상')
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.icon {
  font-size: 16px;
  margin-right: 4px;
}
.iphonePadding{
  padding:0 16px;
}
  @media(max-width:360px){
    .iphonePadding{
      padding:0 8px;
    }
  }
</style>

