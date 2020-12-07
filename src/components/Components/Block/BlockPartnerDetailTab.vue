<template>
<div class="position-relative">
  <tab :menu="menu" tabPosition="center" :selectedTabStyle="selectedTabStyle"
    :unselectedTabStyle="unselectedTabStyle" :dividerStyle="{}"
    :tabRadius="8">
    <div slot="0" style="margin-top:32px">
      <list-vertical>
      <div slot="card-grid" class="col-6"
        v-for="(item,idx) in product"
        style="margin-bottom:12px"
        :key="`card-prod-${item.id}-${idx}`">
        <card-product :card="item"
                      :first="idx%2===0"
                      :last="idx%2 ===1"
                      :style="{width:'100%'}"></card-product>
      </div>
      </list-vertical>
    </div>
    
    <div slot="1" :style="pagePadding">
      <card-review-total :product="partner" v-if="partner"></card-review-total>
        <list-vertical v-if="review_list&&review_list.length>0">
          <card-review
              slot="card"
              v-for="item in review_list"
              :key="item.id"
              @del="del"
              :card="item"></card-review>
        </list-vertical>
        <div v-if="review_list&&review_list.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:18px">후기가 없습니다.</div>
    </div>
    
    <div slot="2" :style="pagePadding">
      <card-inquiry-total :inquiryCount="inquiryCount" v-if="inquiryCount!==undefined"></card-inquiry-total>
      <list-vertical v-if="inquiry_list&&inquiry_list.length>0">
          <card-inquiry
              slot="card"
              v-for="item in inquiry_list"
              :key="item.id"
              @del="del"
              :card="item"></card-inquiry>
        </list-vertical>
        <div v-if="inquiry_list&&inquiry_list.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:18px">문의가 없습니다.</div>
    </div>
  </tab>
  
</div>
</template>
<script>
import CardProduct from "@/components/Components/Card/CardProduct"
import CardReviewTotal from "@/components/Components/Card/CardReviewTotal"
import CardReview from "@/components/Components/Card/CardReview"
import CardInquiryTotal from "@/components/Components/Card/CardInquiryTotal"
import CardInquiry from "@/components/Components/Card/CardInquiry"

export default {
  name: 'BlockPartnerDetailTab',
  components: {
    CardProduct,
    CardReviewTotal,
    CardReview,
    CardInquiryTotal,
    CardInquiry
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "menu": [
        {
          "id": 0,
          "name": "전체상품"
        },
        {
          "id": 1,
          "name": "리뷰",
          "count": 0
        },
        {
          "id": 2,
          "name": "문의",
          "count": 0
        }
      ],
      "partner": undefined,
      "product": undefined,
      "review_list": undefined,
      "inquiryCount": undefined,
      "inquiry_list": undefined
    }
  },
  created() {
    this.getData();
    this.getPartner();
    this.getPartnerReview();
    this.getPartnerInquiry();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.$axios.get(`/user/0/mapping/product?partner_id=${this.$route.query.id}`)
      .then(res => {
        this.product = res.data.data;
      })
    },
    getPartner() {
      this.$api.PartnerDetail(this).then(res => {
        this.partner = res;
      })
    },
    getPartnerReview() {
        let url = `public/partner/${this.$route.query.id}/review`;
        this.currentPage = 1;
        this.$axios.get(url).then(res => {
          this.totalPages = res.data.total_page;
          this.totalCount = res.data.count;
          this.menu[1].count = this.totalCount;
          this.currentPage = 2;
          this.review_list = res.data.data;
        })
      },
    getPartnerInquiry() {
      this.$axios.get(`public/partner/${this.$route.query.id}/inquiry`).then(res => {
        this.inquiry_list = res.data.data;
        this.menu[2].count = res.data.count;
        this.inquiryCount = res.data;
      })
    },
    del() {
      this.$refs.delModal.open();
    }
  },
  computed: {
    marginStyle() {
      return {
        padding: '16px 0 100px',
      }
    },
    normalStyle() {
      return {
        padding: '16px 0 100px'
      }
    },
    selectedTabStyle() {
      return {
        color: `${this.getColor('Primary Color')}`,
        width: '114px',
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
        width: '114px',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      }
    },
    iconWrapStyle() {
      return {
        width: '32px',
        height: '32px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.24)'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
</style>

