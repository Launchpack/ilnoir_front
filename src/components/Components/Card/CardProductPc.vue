<template>
<div @click="clickCard" class="unselect">
    <div class="card-product" :style="radius" ref="card">
      
      <!--<div v-if="$route.path!=='/like'" -->
      <!--  v-lazy:background-image="card.img" class="lazy-background-image-cover position-relative" :style="imgCoverStyle">-->
      <!--  <div class="position-absolute" style="top:14px;right:13px" v-if="$route.path==='/like'">-->
      <!--    <icon-btn-like likeType="product" :id="card.id"></icon-btn-like>-->
      <!--  </div>-->
      <!--</div>-->
      
      <e-image v-if="$route.path!=='/like'" :isBg="true" :isLazy="false"
        :img="card.img ? card.img : dummyImage.bg" :useThumb="true" :width="width"
        :imageRates="imageRates" class="lazy-background-image-cover position-relative">
        <!--<div slot="inner" class="position-absolute" style="top:14px;right:13px">-->
        <!--  <icon-btn-like likeType="product" :id="card.id"></icon-btn-like>-->
        <!--</div>-->
      </e-image>
      
      <!--<div v-if="$route.path==='/like'" :style="bgStyle" class="position-relative">-->
      <!--  <div class="position-absolute" style="top:14px;right:13px" v-if="$route.path==='/like'">-->
      <!--    <icon-btn-like likeType="product" :id="card.id"></icon-btn-like>-->
      <!--  </div>-->
      <!--</div>-->
      
      <e-image v-if="$route.path==='/like'" :isBg="true" :isLazy="false"
        :img="card.img ? card.img : dummyImage.bg" :useThumb="true" :width="width"
        :imageRates="imageRates" class="position-relative">
        <div slot="inner" class="position-absolute" style="top:14px;right:13px" v-if="$route.path==='/like'">
          <icon-btn-like likeType="product" :id="card.id"></icon-btn-like>
        </div>
      </e-image>

      <div :style="[brandBgColor.main,brandColor.white]" style="padding:12px">

        <div class="size-15 weight-500 ellipsis text-center margin-bottom-4" 
          style="width:100%; height:24px;">{{ card.name }}</div>
          
        <div class="size-20 bold text-center">{{ card.price.sale_price | currency }}</div>
          
      </div>
    </div>
  </div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"

export default {
  name: 'CardProductPc',
  components: {

  },
  mixins: [
    CardMixin
  ],
  props: {
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
        "ratio": "1:1",
        "exception": []
      }
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.width = this.$refs.card.clientWidth;
    })
  },
  
  methods: {
    clickCard() {
        this.routerPush(`product_detail?id=${this.card.id}`);

        // // 검색 페이지의 경우, 상품의 파트너id로 넘김
        // if (this.$route.path.indexOf('search')>-1) {
        //   this.routerPush(`product_detail?id=${this.card.partner.id}`);
        // }
        // // 나머지는 기존 파트너 id
        // else {
        //   this.routerPush(`product_detail?id=${this.card.id}`);
        // }
      }
  },
  computed: {
    bgStyle() {
        let url = this.card.img ? this.card.img : this.dummyImage.bg;
        let dim = 'to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 98%';

        return {
          backgroundImage: `linear-gradient(${dim}), url("${url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          // height: `192px`,
          borderRadius: '8px'
        }
      },
    imgCoverStyle() {
        let url = this.card.img ? this.card.img : this.dummyImage.bg;
        let height = this.$route.path==='/partner_detail' ? 240 : 186;
        
        return {
          backgroundImage: `url("${url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: `${height}px`,
          // borderRadius: '8px'
        }
      },
    computedReviewCount() {
      if (this.card.reviews_count!==undefined) {
        return this.card.reviews_count;
      }
      else if (this.card.review_count!==undefined) {
        return this.card.review_count;
      }
      else {
        console.log('review count error');
        return undefined;
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.card-product {
  overflow: hidden;
}
.space {
  height: 140px;
}
.icon-wrap {
  margin-right: 10px;
}
.icon-wrap .material-icons {
  margin-right: 2px;
  width: 15px;
}
.line {
  background: rgba(255,255,255,0.4);
  height: 1px;
}
.desc {
  height: 34px;
}
</style>

