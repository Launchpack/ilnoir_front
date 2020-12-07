<template>
<div @click="clickCard" class="unselect">
    <div class="card-product" :style="[radius, brandBgColor.white]">
      
      <div class="flex-justify position-relative" style="padding:24px 0 4px">
        <!--<div :style="imgStyle"></div>-->
        <e-image :isBg="true" :isLazy="false"
          :img="card.img ? card.img : dummyImage.bg" :useThumb="true" :width="64"
          :imageRates="imageRates" style="border-radius: 50%"></e-image>
        <div class="position-absolute" style="top:14px;right:13px">
          <icon-btn-like likeType="partner" :id="card.id"></icon-btn-like>
        </div>
      </div>
      
      <div style="padding:14px">

        <div class="size-14 weight-500 ellipsis" style="width:100%; height:22px; text-align:center"
          :style="brandColor.primary">{{ card.name }}</div>
          
        <div class="size-12 ellipsis-multiple" style="width:100%; height:64px; margin-bottom:32px; line-clamp:3;padding:10px 18px 0"
          :style="brandColor.main">{{ card.simple_desc }}</div>
          
        
        <div class="flex-between size-14" :style="brandColor.sub">
          
          <div class="flex-align size-14">
            <div class="flex-center wrap icon-wrap">
              <i class="material-icons size-16">star_rate</i>
              <span>{{ card.rate ? card.rate : 0 }}</span>
            </div>
            <div class="flex-center wrap icon-wrap">
              <i class="material-icons size-16">favorite</i>
              <span>{{ card.like_count }}</span>
            </div>
          </div>
          
          <div class="flex-center wrap icon-wrap" style="margin-right:0;">
            <i class="material-icons size-16">comment</i>
            <span>{{ card.reviews_count }}</span>
          </div>
          
        </div>        
        
      </div>
    </div>
  </div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"

export default {
  name: 'CardPartnerPc',
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
      "imageRates": {
        "type": "post_card",
        "ratio": "1:1",
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
        this.routerPush(`partner_detail?id=${this.card.id}`);

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
        let dim = 'rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)';

        return {
          backgroundImage: `linear-gradient(${dim}), url("${url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
      },
    imgStyle() {
        let url = this.card.img ? this.card.img : this.dummyImage.bg;
        return {
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundImage: `url("${url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
  margin-right: 14px;
}
.icon-wrap .material-icons {
  margin-right: 6px;
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

