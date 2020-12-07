<template>
<div class="flex-justify">
    <div style="padding:32px 0 100px" :style="pcMaxWidth" class="full-width position-relative">
  <!--<div class="position-absolute" style="top:0">-->
  <!--  <bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
  <!--</div>-->
  
  <tab :menu="menu" :selectedTabStyle="selectedTabStyle" tabPosition="flex-end"
    :unselectedTabStyle="unselectedTabStyle" :dividerStyle="{}" :wrapRadius="true"
    :tabRadius="8">
    <div slot="0" style="margin-top:32px">
      <div class="size-20 weight-500 margin-bottom-8" :style="brandColor.main">찜 목록</div>
      <div class="size-14 margin-bottom-16" :style="brandColor.sub">상품 찜 목록</div>
      
      <list-vertical v-if="product">
        <transition-group name="fade" slot="card" tag="div" class="grid-box">
        <div class="col-3"
          v-for="(item,idx) in product"
          :key="`card-prod-${item.id}-${idx}`">
          <card-product-pc :card="item"
                        :style="cardStyle(idx)"></card-product-pc>
        </div>
        </transition-group>
      </list-vertical>
      
      <div v-if="product&&product.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">찜한 상품이 없습니다.</div>
    </div>
    
    <div slot="1" style="margin-top:32px">
      <div class="size-20 weight-500 margin-bottom-8" :style="brandColor.main">찜 목록</div>
      <div class="size-14 margin-bottom-16" :style="brandColor.sub">파트너 찜 목록</div>
      
      <list-vertical v-if="partnerList">
        <transition-group name="fade" slot="card" tag="div" class="grid-box">
        <div class="col-3"
          v-for="(item,idx) in partnerList"
          :key="`card-prod-${item.id}-${idx}`">
          <card-partner-pc :card="item"
                        :style="cardStyle(idx)"></card-partner-pc>
        </div>
        </transition-group>
      </list-vertical>
      
      <div v-if="partnerList&&partnerList.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">찜한 파트너가 없습니다.</div>
    </div>
  </tab>
</div>
  </div>
</template>
<script>
import CardProductPc from "@/components/Components/Card/CardProductPc"
import CardPartnerPc from "@/components/Components/Card/CardPartnerPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockLikePc',
  components: {
    CardProductPc,
    CardPartnerPc,
    BreadCrumbPc
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "menu": [
        {
          "id": 0,
          "name": "상품"
        },
        {
          "id": 1,
          "name": "파트너"
        }
      ],
      "product": undefined,
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "link": "like",
          "name": "찜 목록"
        }
      ],
      "partnerList": undefined
    }
  },
  created() {
    this.getData();
    this.getPartner();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      let url = `user/${this.user.user_id}/mapping/product?liked_user=${this.user.user_id}&fields=id,name,img,simple_desc,rate,partner,like_count,visit,reviews_count,price.price,is_like`
      this.$axios.get(url)
      .then(res => {
        this.product = res.data.data;
      })
    },
    getPartner() {
      let url = `user/${this.user.user_id}/mapping/partner?liked_user=${this.user.user_id}&fields=id,name,img,simple_desc,rate,partner,like_count,visit,reviews_count,price.price,address,product_count`
      this.$axios.get(url)
      .then(res => {
        this.partnerList = res.data.data;
      })
    },
    cardStyle(idx) {
      let obj = {}
      
      let gutters = 16;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.paddingBottom = `${gutters}px`;
      
      if(idx%4===0) obj.paddingLeft = 0;
      if(idx%4===3) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    selectedTabStyle() {
      return {
        color: `${this.getColor('Primary Color')}`,
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: 'white',
        width: '128px',
        height: '48px',
        lineHeight: '48px',
        fontWeight: '500'
      }
    },
    unselectedTabStyle() {
      return {
        color: `${this.getColor('기본 내용 색상')}`,
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
        width: '128px',
        height: '48px',
        lineHeight: '48px',
        fontWeight: '500'
      }
    }
  },
  watch: {
    
  }
}
</script>


