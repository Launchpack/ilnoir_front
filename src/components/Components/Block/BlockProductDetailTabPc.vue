<template>
<div class="flex-justify">
    <div v-if="detail" :style="pcMaxWidth">
      <div class="size-16 text-center weight-500" style="padding:12px 0"
        :style="brandColor.white">상세 설명</div>
      <div style="margin-top:16px;padding: 16px 16px 40px;margin-bottom:120px"
        :style="[brandBgColor.white, radius]">
        <e-editor :html="detail.info" v-if="detail"></e-editor>
      </div>
      
      <div :style="brandColor.white" v-if="relatedList.length>0"
        class="text-center">
        <div class="size-16 bold" :style="wrapStyle">함께 보면 좋은 상품</div>
        <div class="flex">
          <div v-for="item in relatedList" :key="'key-'+item.id"
            class="col-3 unselect" style="padding:0 4px;margin-top:20px"
            @click="clickCard(item)">
            <img :src="item.img" :style="imgStyle">
            <div class="full-width" style="padding:12px 0">
              <div class="weight-500 size-14 margin-bottom-4">{{ item.name }}</div>
              <div class="size-16 bold">{{ item.price.sale_price | currency }}</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import CardReviewTotalRegPc from "@/components/Components/Card/CardReviewTotalRegPc"
import CardReviewPc from "@/components/Components/Card/CardReviewPc"
import CardInquiryTotalRegPc from "@/components/Components/Card/CardInquiryTotalRegPc"
import CardInquiryPc from "@/components/Components/Card/CardInquiryPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockProductDetailTabPc',
  components: {
    CardReviewTotalRegPc,
    CardReviewPc,
    CardInquiryTotalRegPc,
    CardInquiryPc
  },
  mixins: [
    BlockMixin
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
        "height": "240px",
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
    getData() {
      this.$axios.get(`/user/${this.user.user_id}/mapping/product/${this.$route.query.id}?fields=id,img,name,simple_desc,tags,form,
      order_conversion_type,category1,category2,category3,rate,stock,input,like_count,reviews_count,visit,price,partner,
      address,dong,distance,params,imgs,info,operating_time,phone,params,related_products`)
      .then(res => {
          this.detail = res.data;
          this.getRelate();
        });
      },
    getRelate() {
      this.relatedList = [];
        if(this.detail.related_products&&this.detail.related_products.length>0) {
          let list = this.detail.related_products.slice(0,4);
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
        
      this.review_list_self = [];
      this.review_list_other = [];
      this.$axios.get(this.url).then(res => {
        res.data.data.forEach(item => {
          if(Number(item.author_id) === this.user.user_id) {
            item.self = true;
            this.review_list_self.push(item);
          }
          else {
            this.review_list_other.push(item);
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
        
      this.inquiry_list_self = [];
      this.inquiry_list_other = [];
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
    }
  },
  computed: {
    wrapStyle() {
      return {
        padding: '32px 0',
        borderBottom: `2px solid ${this.getColor('보조 테두리선 색상')}`
      }
    },
    selectedTabStyle() {
      return {
        color: `${this.getColor('Primary Color')}`,
        padding: '14px 16px',
        fontSize: '14px',
        backgroundColor: 'white',
        marginRight: '8px',
        borderRadius: '8px'
      }
    },
    unselectedTabStyle() {
      return {
        color: `${this.getColor('기본 내용 색상')}`,
        padding: '14px 16px',
        fontSize: '14px',
        marginRight: '8px',
      }
    }
  },
  watch: {
    $route(n, o) {
      if(n.path === o.path) {
        this.getData();
      }
    }
  }
}
</script>


