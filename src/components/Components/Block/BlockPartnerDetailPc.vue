<template>
<div class="flex-justify">
  <!--<div ref="cardHeight">-->
    <!--<bread-crumb-pc :breadcrumb="breadcrumb" :style="pcMaxWidth"></bread-crumb-pc>-->
  <!--</div>-->
  <div :style="pcMaxWidth" class="position-relative flex" style="margin-top: 32px; align-items: flex-start; justify-content: flex-start;">
    
    <tab :menu="menu" :selectedTabStyle="selectedTabStyle"
      :unselectedTabStyle="unselectedTabStyle" :dividerStyle="{}" style="width:66%">
      <div slot="0" style="margin-top:16px">
        <list-vertical>
        <div slot="card-grid" class="col-6"
          v-for="(item,idx) in product"
          :key="`card-prod-${item.id}-${idx}`"
          :style="cardStyle(idx)">
          <card-product-pc :card="item"></card-product-pc>
        </div>
        </list-vertical>
      </div>
      
      <div slot="1">
        <card-review-total-pc :product="partners" v-if="partners"></card-review-total-pc>
          <list-vertical v-if="review_list&&review_list.length>0">
            <card-review-pc
                slot="card"
                v-for="item in review_list"
                :key="item.id"
                @del="del"
                :card="item"></card-review-pc>
          </list-vertical>
          <div v-if="review_list&&review_list.length===0" class="empty-view" :style="brandColor.sub"
            style="font-family: 'Arita Dotum Medium';font-size:18px">후기가 없습니다.</div>
      </div>
      
      <div slot="2">
        <card-inquiry-total :inquiryCount="inquiryCount" v-if="inquiryCount!==undefined"></card-inquiry-total>
        <list-vertical v-if="inquiry_list&&inquiry_list.length>0">
            <card-inquiry-pc
                slot="card"
                v-for="item in inquiry_list"
                :key="item.id"
                @del="del"
                :card="item"></card-inquiry-pc>
          </list-vertical>
          <div v-if="inquiry_list&&inquiry_list.length===0" class="empty-view" :style="brandColor.sub"
            style="font-family: 'Arita Dotum Medium';font-size:18px">문의가 없습니다.</div>
      </div>
    </tab>
    
    <!--<div v-if="detail&&!fixedState" :style="[brandBgColor.white]" class="partner-style"-->
    <!--  style="margin-left:16px">-->
    <!--  <div class="size-12 flex-between" style="font-weight:500">-->
    <!--      <div class="flex-align">-->
    <!--        <div class="flex-align" style="border-radius:4px;padding:4px 6px;margin-right:8px" :style="brandBgColor.main">-->
    <!--          <i class="material-icons" style="color:#ffc351;font-size:18px;margin-right:6px">star</i>-->
    <!--          <div>{{ detail.rate ? detail.rate : '0' }}</div>-->
    <!--        </div>-->
    <!--        <div class="flex-align" style="border-radius:4px;padding:4px 6px;" :style="brandBgColor.main">-->
    <!--          <i class="material-icons" style="font-size:18px;margin-right:6px"-->
    <!--            :style="brandColor.brand">favorite</i>-->
    <!--          <div>{{ detail.like_count }}</div>-->
    <!--        </div>-->
    <!--      </div>-->
          <!--<div class="flex-align" style="border-radius:4px;padding:4px 6px;" :style="brandBgColor.main">-->
          <!--    <i class="material-icons" style="color:#ffc351;font-size:18px;margin-right:6px"-->
          <!--      :style="brandColor.sub">visibility</i>-->
          <!--    <div>{{ detail.visit }}</div>-->
          <!--  </div>-->
    <!--    </div>-->
    <!--  <div class="flex-justify">-->
    <!--    <div :style="imgStyle" style="margin:24px 0"></div>-->
    <!--  </div>-->
      
    <!--  <div style="margin-bottom:28px;text-align:center">-->
    <!--    <div class="size-20 weight-500 margin-bottom-16" :style="brandColor.primary">{{ detail.name }}</div>-->
    <!--    <div class="size-12 ellipsis-multiple" :style="brandColor.main" style="padding:0 36px; width:100%;">{{ detail.simple_desc }}</div>-->
    <!--  </div>-->
      
    <!--  <div style="padding:12px;border-radius:8px;margin-bottom:12px" :style="brandBgColor.main">-->
    <!--    <div class="size-14 weight-500 margin-bottom-4" :style="brandColor.main">주소</div>-->
    <!--    <div class="size-12" :style="brandColor.help">{{ detail.address }}</div>-->
    <!--  </div>-->
      
    <!--  <div style="padding:12px;border-radius:8px" :style="brandBgColor.main">-->
    <!--    <div class="size-14 weight-500 margin-bottom-4" :style="brandColor.main">대표전화</div>-->
    <!--    <div class="size-12" :style="brandColor.help">{{ detail.phone }}</div>-->
    <!--  </div>-->
      
    <!--  <div style="margin-top:24px">-->
    <!--    <div class="flex-between">-->
    <!--      <btn-pc styles="primary" width="176px">{{ detail.phone }}</btn-pc>-->
    <!--      <icon-circle-like likeType="partner" color="main" :id="detail.id" v-if="detail"></icon-circle-like>-->
    <!--      <icon-circle-share @share="emitShare" color="main"></icon-circle-share>-->
    <!--    </div>-->
    <!--  </div>-->
    
    <!--</div>-->
    
    <transition name="fade">
    <div v-if="detail&&fixedState" class="position-fixed" 
      :style="[fixStyle, brandBgColor.white]" style="border-radius:8px;padding:12px;">
      <div class="size-12 flex-between" style="font-weight:500">
          <div class="flex-align">
            <div class="flex-align" style="border-radius:4px;padding:4px 6px;margin-right:8px" :style="brandBgColor.main">
              <i class="material-icons" style="color:#ffc351;font-size:18px;margin-right:6px">star</i>
              <div>{{ detail.rate ? detail.rate : '0' }}</div>
            </div>
            <div class="flex-align" style="border-radius:4px;padding:4px 6px;" :style="brandBgColor.main">
              <i class="material-icons" style="font-size:18px;margin-right:6px"
                :style="brandColor.brand">favorite</i>
              <div>{{ detail.like_count }}</div>
            </div>
          </div>
          <!--<div class="flex-align" style="border-radius:4px;padding:4px 6px;" :style="brandBgColor.main">-->
          <!--    <i class="material-icons" style="color:#ffc351;font-size:18px;margin-right:6px"-->
          <!--      :style="brandColor.sub">visibility</i>-->
          <!--    <div>{{ detail.visit }}</div>-->
          <!--  </div>-->
        </div>
      <div class="flex-justify">
        <div :style="imgStyle" style="margin:24px 0"></div>
      </div>
      
      <div style="margin-bottom:28px;text-align:center">
        <div class="size-20 weight-500 margin-bottom-16" :style="brandColor.primary">{{ detail.name }}</div>
        <div class="size-12 ellipsis-multiple" :style="brandColor.main" style="padding:0 36px; width:100%;">{{ detail.simple_desc }}</div>
      </div>
      
      <div style="padding:12px;border-radius:8px;margin-bottom:12px" :style="brandBgColor.main">
        <div class="size-14 weight-500 margin-bottom-4" :style="brandColor.main">주소</div>
        <div class="size-12" :style="brandColor.help">{{ detail.address }}</div>
      </div>
      
      <div style="padding:12px;border-radius:8px" :style="brandBgColor.main">
        <div class="size-14 weight-500 margin-bottom-4" :style="brandColor.main">대표전화</div>
        <div class="size-12" :style="brandColor.help">{{ detail.phone }}</div>
      </div>
      
      <div style="margin-top:24px">
        <div class="flex-between">
          <btn-pc styles="primary" width="176px" @onClick="clickCall">{{ detail.phone }}</btn-pc>
          <icon-circle-like likeType="partner" color="main" :id="detail.id" v-if="detail"></icon-circle-like>
          <icon-circle-share @share="emitShare" color="main"></icon-circle-share>
        </div>
      </div>
    
    </div>
    </transition>
    
    <div class="position-fixed" v-if="fixedState" :style="fixStyles">
      <div :style="iconWrapStyle" class="flex-center margin-bottom-8"
        @click="clickUp">
        <i class="material-icons">keyboard_arrow_up</i>
      </div>
      <div :style="iconWrapStyle" class="flex-center"
        @click="clickDown">
        <i class="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
    
  </div>
</div>
</template>
<script>
import CardProductPc from "@/components/Components/Card/CardProductPc"
import CardReviewTotalPc from "@/components/Components/Card/CardReviewTotalPc"
import CardReviewPc from "@/components/Components/Card/CardReviewPc"
import CardInquiryTotal from "@/components/Components/Card/CardInquiryTotal"
import CardInquiryPc from "@/components/Components/Card/CardInquiryPc"
import BtnPc from "@/components/Components/Button/BtnPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockPartnerDetailPc',
  components: {
    CardProductPc,
    CardReviewTotalPc,
    CardReviewPc,
    CardInquiryTotal,
    CardInquiryPc,
    BtnPc,
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
      "detail": undefined,
      "product": undefined,
      "partners": undefined,
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "name": "파트너 상세 보기"
        }
      ],
      "fixedState": true,
      "layoutWidth": undefined,
      "review_list": undefined,
      "inquiryCount": undefined,
      "inquiry_list": undefined
    }
  },
  created() {
    this.getMaxWidth();
    this.getData();
    this.getDetail();
    this.getPartner();
    this.getPartnerReview();
    this.getPartnerInquiry();
    // this.detectClientHeight();
  },
  mounted() {
    // this.$nextTick(() => {
    //   window.addEventListener('scroll', this.detectClientHeight);
    // });
  },
  updated() {
    // this.detectClientHeight();
  },
  
  methods: {
    clickCall() {
      location.href = `tel:${this.detail.phone}`;
    },
    getMaxWidth() {
      this.$axios.get('public/ui/brand/admin').then(res => {
        this.layoutWidth = res.data.layout_maxwidth;
      })
    },
    detectClientHeight() {
      this.$nextTick(function() {
        if(this.$refs.cardHeight) {
          if (document.documentElement.scrollTop > this.$refs.cardHeight.clientHeight) {
            this.fixedState = true;
            this.$emit('fixedState', true);
          }
          else {
            this.fixedState = false;
            this.$emit('fixedState', false);
          }
        }
      })
    },
    emitShare() {
      this.$emit('share')
    },
    del() {
      this.$refs.delModal.open();
    },
    clickUp() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    },
    clickDown() {
      document.documentElement.scrollTop = document.body.scrollHeight;
    },
    getData() {
      this.$axios.get(`/user/0/mapping/product?partner_id=${this.$route.query.id}`)
      .then(res => {
        this.product = res.data.data;
      })
    },
    getDetail() {
      this.$api.PartnerDetail(this).then(res => {
        this.detail = res;
      })
    },
    getPartner() {
      this.$api.PartnerDetail(this).then(res => {
        this.partners = res;
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
    cardStyle(idx) {
      let obj = {}
      
      let gutters = 16;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.paddingBottom = `${gutters}px`;
      
      if(idx%2===0) obj.paddingLeft = 0;
      if(idx%2===1) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    fixStyle() {
      return {
        width: '320px',
        top: '96px',
        left: `calc(50% + ${this.layoutWidth * 16 / 100}px + 16px)`,
      }
    },
    fixStyles() {
      return {
        width: '320px',
        top: '85%',
        left: `calc(50% + ${this.layoutWidth * 16 / 100}px + 16px)`
      }
    },
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
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px'
      }
    },
    unselectedTabStyle() {
      return {
        color: `${this.getColor('기본 내용 색상')}`,
        textAlign: 'center',
        fontSize: '14px',
        padding: '16px'
      }
    },
    iconWrapStyle() {
      return {
        width: '32px',
        height: '32px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)'
      }
    },
    imgStyle() {
      return {
        width: '64px',
        height: '64px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("${this.detail.img}")`,
        borderRadius: '50%'
      }
    },
    partnerStyle() {
      return {
        padding: '16px',
        border: `1px solid ${this.getColor('기본 테두리선 색상')}`
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
.partner-style {
  border-radius:8px;
  padding:12px;
  width: 320px;
}
</style>

