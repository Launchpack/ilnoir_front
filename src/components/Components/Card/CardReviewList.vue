<template>
<div :style="[brandBgColor.white]" class="iphonePadding">
<div class="flex-end">
  <div :style="lineStyle" style="width:78%" v-if="idx!==0"></div>
</div>
<div @click="clickCard" class="grid-box"
  style="padding:16px 0">
  <div class="flex" style="width:22%">
    <!--<img :src="card.img" :style="radius" style="width:64px;height:64px;object-fit:cover">-->
    <e-image :isBg="false" :isLazy="false"
      :img="card.img" :useThumb="true" :width="64"
      :imageRates="imageRates" :style="radius"></e-image>
  </div>
  <div style="width:78%">
    <div class="size-12 position-relative flex" :style="[brandColor.main]"
      style="justify-content:space-between">
      <div style="width:60%">
        <div class="size-12 ellipsis weight-500" style="width:100%">{{ card.title }}</div>
      </div>
      <div style="width:40%;padding-right:20px" class="flex-end">
        <rating :value="card.rate" :rateSize="10"
          rateColor="#f8d053"></rating>
      </div>
    </div>
    <div class="size-12 position-relative flex" :style="[brandColor.main]"
      style="justify-content:space-between">
      <div style="width:90%">
        
        <div class="size-12 margin-bottom-10" :style="brandColor.sub">{{ dateFormat(card.created_time, 'ago') }}</div>
        <div class="size-10" :style="brandColor.help" style="width:100%">
          <div>{{ card.content }}</div>
          <div v-if="card.imgs && card.imgs.length>0" style="margin-top:16px">
            <image-single :imgs="card.imgs" :width="100"></image-single>
          </div>
        </div>
      </div>
      
      <div >
        <i class="material-icons" :style="brandColor.sub"
          style="text-align:right">keyboard_arrow_right</i>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CardReviewList',
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
      this.$router.push(`/product_detail?id=${this.card.product_id}&tab=2`);
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

