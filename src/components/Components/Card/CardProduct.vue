<template>
<div @click="clickCard">
    <div class="card-product" :style="radius" ref="card">
      
      <!--<div v-if="$route.path!=='/like'" -->
      <!--  v-lazy:background-image="card.img" class="lazy-background-image-cover position-relative" style="height:128px;">-->
      <!--  <div class="position-absolute" style="top:14px;right:13px" v-if="$route.path==='/like'">-->
      <!--    <icon-btn-like likeType="product" :id="card.id"></icon-btn-like>-->
      <!--  </div>-->
      <!--</div>-->
      <e-image v-if="$route.path!=='/like'" :isBg="true" :isLazy="false"
        :img="card.img ? card.img : dummyImage.bg" :useThumb="true" :width="width"
        :imageRates="imageRates" class="lazy-background-image-cover position-relative">
        <!--<div slot="inner" class="position-absolute" style="top:14px;right:13px" v-if="$route.path==='/like'">-->
        <!--  <icon-btn-like likeType="product" :id="card.id"></icon-btn-like>-->
        <!--</div>-->
      </e-image>
      
      <!--<div v-if="$route.path==='/like'" :style="bgStyle" style="height:128px;" class="position-relative">-->
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
      
      <div :style="[brandBgColor.main, brandColor.white]" style="padding:8px" class="text-center">

        <div class="size-12 weight-500 ellipsis" style="width:100%; height:20px;">{{ card.name }}</div>
          
        <div class="size-15 bold text-center">{{ card.price.sale_price | currency }}</div>
        
      </div>
    </div>
  </div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"

export default {
  name: 'CardProduct',
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
          width: '165.5px',
          height: '128px',
          borderRadius: '8px'
        }
      }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.card-product {
  box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1);
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

