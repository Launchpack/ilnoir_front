<template>
<div style="padding:32px 0 100px" :style="pagePadding">
  <tab :menu="menu" tabPosition="center" :selectedTabStyle="selectedTabStyle"
    :unselectedTabStyle="unselectedTabStyle" :dividerStyle="{}" :wrapRadius="true"
    :tabRadius="'8'">
    <div slot="0" style="margin-top:32px">
      <div class="size-20 weight-500 margin-bottom-8" :style="brandColor.main">찜 목록</div>
      <div class="size-14 margin-bottom-16" :style="brandColor.sub">상품 찜 목록</div>
      
      <list-vertical v-if="product">
        <transition-group name="fade" slot="card" tag="div" class="grid-box">
        <div class="col-6"
          v-for="(item,idx) in product"
          :key="`card-prod-${item.id}-${idx}`">
          <card-product :card="item"
                        :style="cardStyle(idx)"></card-product>
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
        <div class="col-6"
          v-for="(item,idx) in partnerList"
          :key="`card-prod-${item.id}-${idx}`">
          <card-partner :card="item"
                        :style="cardStyle(idx)"></card-partner>
        </div>
        </transition-group>
      </list-vertical>
      <div v-if="partnerList&&partnerList.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">찜한 파트너가 없습니다.</div>
    </div>
  </tab>
</div>
</template>
<script>
import CardProduct from "@/components/Components/Card/CardProduct"
import CardPartner from "@/components/Components/Card/CardPartner"
import ListMixin from "@/components/Mixins/ListMixin"

export default {
  name: 'BlockLike',
  components: {
    CardProduct,
    CardPartner
  },
  mixins: [
    ListMixin
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
      "partnerList": undefined
    }
  },
  created() {
    this.pageLoadType = 'infinite';
    this.getData();
    this.getPartner();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.pageLoadType = 'infinite';
      let url = `user/${this.user.user_id}/mapping/product?liked_user=${this.user.user_id}&fields=id,name,img,simple_desc,rate,partner,like_count,visit,reviews_count,price.price,is_like`
      this.currentPage = 1;
      this.loading = true;
      this.$axios.get(url)
      .then(res => {
        this.product = res.data.data;
        this.totalPages = res.data.total_page;      // 전체 페이지 수
        this.totalCount = res.data.count;           // 전체 수
        this.currentPage = 2;                       // 현재 페이지 2로 변경
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    getPartner() {
      this.pageLoadType = 'infinite';
      let url = `user/${this.user.user_id}/mapping/partner?liked_user=${this.user.user_id}&fields=id,name,img,simple_desc,rate,partner,like_count,visit,reviews_count,price.price,address,product_count`
      this.currentPage = 1;
      this.loading = true;
      this.$axios.get(url)
      .then(res => {
        this.partnerList = res.data.data;
        this.totalPages = res.data.total_page;      // 전체 페이지 수
        this.totalCount = res.data.count;           // 전체 수
        this.currentPage = 2;                       // 현재 페이지 2로 변경
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    cardStyle(idx) {
      let obj = {}
      
      let gutters = this.$store.getters.brand.layout_gutters;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.paddingBottom = `${gutters}px`;
      
      if(idx%2===0) obj.paddingLeft = 0;
      else if(idx%2===1) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    selectedTabStyle() {
      return {
        color: `${this.getColor('Primary Color')}`,
        width: '50%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: 'white',
      }
    },
    unselectedTabStyle() {
      return {
        color: `${this.getColor('기본 내용 색상')}`,
        width: '50%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      }
    }
  },
  watch: {
    
  }
}
</script>


