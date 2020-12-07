<template>
<div v-if="detail">
  
    <div class="size-12 bold text-center"
      :style="brandColor.white"
      style="padding: 16px 0">상세 설명</div>
    
    <!--정보-->
    <div class="margin-bottom-30">
      <e-editor :html="detail.info" v-if="detail" style="margin:0 16px;"
        :style="brandBgColor.white"></e-editor>
    </div>
    
    <div :style="brandColor.white" v-if="relatedList.length>0"
        class="text-center" style="padding:12px">
        <div class="size-12 bold">함께 보면 좋은 상품</div>
        <div class="flex">
          <div v-for="item in relatedList" :key="'key-'+item.id"
            class="col-6 unselect" style="padding:0 4px;margin-top:12px"
            @click="clickCard(item)">
            <img :src="item.img" :style="imgStyle">
            <div class="full-width" style="padding:4px 0">
              <div class="bold size-12 margin-bottom-2">{{ item.name }}</div>
              <div class="size-10 bold">{{ item.price.sale_price | currency }}</div>
            </div>
          </div>
        </div>
      </div>
      
</div>
</template>
<script>
import CardReviewTotalReg from "@/components/Components/Card/CardReviewTotalReg"
import CardReview from "@/components/Components/Card/CardReview"
import CardInquiryTotalReg from "@/components/Components/Card/CardInquiryTotalReg"
import CardInquiry from "@/components/Components/Card/CardInquiry"
import UpdownScroll from "@/components/Components/Button/UpdownScroll"

export default {
  name: 'BlockProductDetailTab',
  components: {
    CardReviewTotalReg,
    CardReview,
    CardInquiryTotalReg,
    CardInquiry,
    UpdownScroll
  },
  mixins: [

  ],
  props: {
    fixedState: {
      type: Boolean,
      required: false,
    },

  },
  data() {
    return {
      "menu": [
        {
          "id": 0,
          "name": "소개"
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
      "imgStyle": {
        "width": "100%",
        "height": "160px",
        "objectFit": "cover"
      },
      "relatedList": [],
      "review_list_self": [],
      "inquiry_list_self": [],
      "review_list_other": [],
      "inquiry_list_other": []
    }
  },
  created() {
    this.getData();
    this.getProductReview();
    this.getProductInquiry();
  },
  mounted() {

  },
  
  methods: {
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
      this.$axios.get(`/user/${this.user.user_id}/mapping/product/${this.$route.query.id}?fields=id,img,name,simple_desc,tags,form,order_conversion_type,category1,category2,category3,rate,stock,input,like_count,reviews_count,visit,price,partner,address,dong,distance,params,imgs,info,operating_time,phone,params,location,related_products`)
      .then(res => {
          res.data.info = res.data.info.replace(/<img /gi, '<img style="margin:0 -16px;max-width:100vw" ');
          this.detail = res.data;
          this.getRelate();
        });
      },
    getRelate() {
        if(this.detail.related_products&&this.detail.related_products.length>0) {
          let list = this.detail.related_products.slice(0,2);
          list.forEach(item => {
            this.$axios.get(`/user/${this.user.user_id}/mapping/product/${item}?fields=id,img,name,price`)
            .then(res => {
              this.relatedList.push(res.data);
            })
          })
        }
      },
    clickCard(item) {
        this.$emit('changeToggle', this.toggle);
        let query = cloneItem(this.$route.query);
        query.id = item.id;
        this.$router.replace({
          path: this.$route.path,
          query: query
        });
      },
    getProductReview() {
      this.review_list_self = [];
      this.review_list_other = [];
      let product_id = this.$route.query.id;
      this.url = `public/product/${product_id}/review?secret=true&page_num=1&page_length=8`;
      if(this.isLogin)
        this.url = `user/${this.user.user_id}/product/${product_id}/review?secret=true&page_num=1&page_length=8`;
      this.$axios.get(this.url).then(res => {
        res.data.data.forEach(item => {
          if(Number(item.author_id) === this.user.user_id) {
            item.self = true
            this.review_list_self.push(item);
          }
          else {
            this.review_list_other.push(item)
          }
        })
        this.menu[1].count = res.data.count;
      })
    },
    getProductInquiry() {
      this.inquiry_list_self = [];
      this.inquiry_list_other = [];
      let product_id = this.$route.query.id;
      this.url = `public/product/${product_id}/inquiry?secret=true&page_num=1&page_length=8`;
      if(this.isLogin)
        this.url = `user/${this.user.user_id}/product/${product_id}/inquiry?secret=true&page_num=1&page_length=8`;
      this.$axios.get(this.url).then(res => {
        res.data.data.forEach(item => {
          if(Number(item.author_id) === this.user.user_id) {
            item.self = true;
            this.inquiry_list_self.push(item);
          }
          else {
            this.inquiry_list_other.push(item);
          }
        })
        this.menu[2].count = res.data.count;
      })
    },
    delReview() {
      this.getProductReview();
    },
    delInquiry() {
      this.getProductInquiry();
    }
  },
  computed: {
    scrollStyle() {
      return {
        bottom: '148px',
        right: '24px'
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

