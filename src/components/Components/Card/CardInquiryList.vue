<template>
<div :style="[brandBgColor.white]" class="iphonePadding">
<div class="flex-end">
  <div :style="lineStyle" style="width:78%" v-if="idx!==0"></div>
</div>
<div @click="clickCard" class="grid-box"
  style="padding:16px">
  <div class="flex" style="width:22%">
    <!--<img :src="card.img" :style="radius" style="width:64px;height:64px;object-fit:cover">-->
    <e-image :isBg="false" :isLazy="false"
      :img="card.img" :useThumb="true" :width="64"
      :imageRates="imageRates" :style="radius"></e-image>
  </div>
  <div class="size-12 position-relative" :style="[brandColor.main]"
    style="width:70%">
    <div class="flex-between">
      <div class="size-10 weight-500">{{ card.product }}</div>
      <div class="size-12" :style="brandColor.sub">{{ dateFormat(card.created_time, 'ago') }}</div>
    </div>

        <div class="size-12 ellipsis weight-500 margin-bottom-4" 
          style="width:70%">{{ card.title }}</div>
        <div class="size-10" :style="brandColor.help" v-if="selectedId===card.id"
          style="width:90%">{{ card.question_content }}</div>
        <div class="size-10 ellipsis" :style="brandColor.help" v-else
        style="width:70%">{{ card.question_content }}</div>

    
  </div>
  <div style="width:8%" class="flex-end">
    <i class="material-icons" :style="brandColor.sub">keyboard_arrow_right</i>
  </div>
</div>
</div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CardInquiryList',
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
      "openState": false,
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
      //this.selectedId = this.card.id;
      //this.openState = !this.openState;
      this.$router.push(`/product_detail?id=${this.card.product_id}&tab=3`)
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

