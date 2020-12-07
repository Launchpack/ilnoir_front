<template>
<div :style="[brandBgColor.white]">
  <div @click="clickCard" class="flex">
    <div class="flex">
      <!--<img :src="card.img" style="border-radius: 8px 0 0 8px; width:96px;height:96px;object-fit:cover">-->
      <e-image :isBg="false" :isLazy="false"
        :img="card.img" :useThumb="true" :width="96"
        :imageRates="imageRates" style="border-radius: 8px 0 0 8px"></e-image>
    </div>
    <div class="size-12 position-relative full-width" style="padding: 10px 22px 16px 25px" :style="[brandColor.main]">
      <div class="flex-between size-14 weight-500 margin-bottom-2" :style="brandColor.brand">
        <div>{{ card.product_info.partner.name }}</div>
        <div>{{ card.answer ? "답변 완료" : "미답변" }}</div>
      </div>

      <div class="size-16 ellipsis weight-500" style="width:70%" :style="brandColor.main">{{ card.title }}</div>
      <div class="flex-between">
        <div class="size-14 ellipsis" :style="brandColor.sub" style="width:90%">{{ card.question_content }}</div>
        <div class="size-14" :style="brandColor.sub">{{ dateFormat(card.created_time, 'ago') }}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'CardInquiryListPc',
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

