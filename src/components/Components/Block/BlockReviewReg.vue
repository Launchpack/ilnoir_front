<template>
<div class="full-width flex-justify" :style="[brandBgColor.main, pagePadding]">
  

    <!-- 후기 작성 -->
    <div class="full-width">
      <div style="margin-top:32px">
        <div class="size-20 margin-bottom-16 weight-500">리뷰 작성</div>
        <card-product-review
            style="margin-bottom:36px"
            slot="card"
            v-for="item in list_product"
            :key="`card-${item.id}`"
            :card="item"></card-product-review>
            
        <!--<card-product-review-->
        <!--    style="margin-bottom:36px"-->
        <!--    slot="card"-->
        <!--    v-for="item in list_product"-->
        <!--    :key="`card-2-${item.id}`"-->
        <!--    :card="item"></card-product-review>-->
      </div>
      <!-- 후기 폼 -->
      <component :is="form.elType" 
        v-for="(form,idx) in formData"
         :key="'review-form-'+idx"
         v-bind="form"
         :value.sync="form.value"
         :formType="formTypeCustomLabel"
         :containerCustomStyle="form.containerCustom"
         :labelCustomStyle="labelCustom"
         :inputCustomStyle="form.inputCustom"
         :buttonCustomStyle="buttonCustom"></component>
         

    <div :style="buttonCustom" style="margin: 48px 0 0;" @click="save">리뷰 작성</div>         
    <div :style="buttonCustomCancel" style="margin: 12px 0 20px;" @click="clickBack">취소</div>         

      <!--<div class="flex-end" style="margin:48px 0 12px">-->
      <!--  <btn :color="brandColor.white"-->
      <!--       :backgroundColor="brandBgColor.brand"-->
      <!--       @clicked="save">리뷰 작성</btn>-->
      <!--</div>-->
      <!--<div>-->
      <!--  <btn :backgroundColor="brandColor.sub" :color="brandColor.white"-->
      <!--    @clicked="clickBack">취소</btn>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
import CardProductReview from "@/components/Components/Card/CardProductReview"
import BlockMixin from "@/components/Mixins/BlockMixin"
import FormMixin from "@/components/Mixins/FormMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockReviewReg',
  components: {
    CardProductReview
  },
  mixins: [
    BlockMixin,
    FormMixin,
    HeaderMixin,
    FormCustomMixin
  ],
  props: {

  },
  data() {
    return {
      "formData": [
        {
          "name": "평점",
          "field": "rate",
          "label": "평점",
          "value": 5,
          "format": "CRating",
          "validate": {
            "required": false,
            "valid_required": false
          }
        },
        {
          "name": "제목",
          "field": "title",
          "label": "제목",
          "value": "",
          "format": "CInput_text",
          "validate": {
            "num": true,
            "alpha_g": true,
            "alpha_s": true,
            "special": true,
            "required": true,
            "max_length": 30,
            "min_length": 1,
            "valid_required": true
          },
          "placeholder": "제목을 입력하세요"
        },
        {
          "name": "내용",
          "field": "content",
          "label": "내용",
          "value": "",
          "format": "CInput_textarea",
          "validate": {
            "num": true,
            "alpha_g": true,
            "alpha_s": true,
            "special": true,
            "required": true,
            "max_length": 500,
            "min_length": 1,
            "valid_required": true
          },
          "placeholder": "내용을 입력하세요"
        },
        {
          "name": "비밀글",
          "field": "is_secret",
          "label": "비밀글로 작성합니다.",
          "value": false,
          "format": "CInput_checkbox",
          "validate": {
            "num": true,
            "alpha_g": true,
            "alpha_s": true,
            "special": true,
            "required": false,
            "valid_required": false
          },
          "placeholder": ""
        },
        {
          "name": "첨부파일 추가",
          "field": "imgs",
          "label": "",
          "format": "CImgUploaderArray",
          "validate": {
            "required": false,
            "valid_required": false
          },
          "placeholder": "+첨부파일 추가"
        }
      ],
      "list_product": [],
      "booking_order_id": undefined,
      "reservation_order_id": undefined,
      "list_product_my_review": []
    }
  },
  created() {
      this.review_id = this.$route.query.review_id;
      this.product_id = this.$route.query.product_id;
      this.getReviewDetail();
      this.getProductDetail();
      this.initForm();
    },
  
  methods: {
    initForm() {
      this.formData = this.setForm(this.formData);
      
      let title = find(this.formData, 'field', 'title');
      title.inputCustom = this.inputCustom;
      
      let content = find(this.formData, 'field', 'content');
      content.inputCustom = this.inputCustomTextarea;
    },
    async getProductDetail() {
      this.list_product =[];
        let url = `user/${this.user.user_id}/mapping/product/${this.product_id}?fields=id,order_conversion_type,img,name,partner.name,price,like_count,shared_count,reviews_count,simple_desc,rate`;
        await this.$axios.get(url).then(res => {
          this.list_product.push(res.data);
        })
        if(!this.$route.query.author_id && this.user.user_id !== Number(this.$route.query.author_id)) this.getMyreview();
      },
    async getMyreview() {
      this.list_product_my_review = [];
      this.booking_order_id = undefined;

      let id = this.list_product[0].id;
      let type = this.list_product[0].order_conversion_type;
      let type_str = type===10 ? 'reservation' : type===11 ? 'booking' : '';
      let list = [];
      await this.$axios.get(`user/${this.$store.getters.user.user_id}/${type_str}/order/review/${id}`)
      .then(res => {
        list = res.data.data;
      })
      this.list_product_my_review = list.filter(item => { return item.order_status_kor==='이용완료'});
      if(this.list_product_my_review.length>0) {
        if(type===10) this.reservation_order_id = this.list_product_my_review[0].id;
        if(type===11) this.booking_order_id = this.list_product_my_review[0].id;
      }
      else {
        this.toast('구매후 1회 후기 작성 가능합니다.')
        this.$router.back();
      }

    },
    save() {
        let result = this.getParamData(this.formData);
        
        
        // 주문상품의 후기일 경우
        if (this.$route.query.order_product!==undefined) result.params.order_product_id = this.$route.query.order_product;
        
        if(result.enable) {

          if(this.review_id===undefined) {
            console.log('200')
            this.$axios.post(`user/${this.user.user_id}/product/${this.product_id}/review`, result.params)
              .then(res => {
                
                if(res.status===200) {
                  
                  this.toast('후기글이 작성되었습니다.');
                  if (this.$route.query&&this.$route.query.partner_id!==undefined&&this.$route.query.partner_id!=='null') {
                    this.$router.replace(`/product_detail?id=${this.$route.query.partner_id}&tab=1`);
                  }
                  else this.$router.replace(`/product_detail?id=${this.product_id}&tab=1`);
                }
              }).catch(err=> {
              if(!err.response.data.message)
                this.toast(err.response.data.detail);
              else
                this.toast(err.response.data.message);
            })
          }
          else {
            this.$axios.patch(`user/${this.user.user_id}/product/${this.product_id}/review/${this.review_id}`, result.params)
              .then(res => {
                if(res.status===200) {
                  this.toast('후기글이 수정되었습니다.');
                  if (this.$route.query&&this.$route.query.partner_id!==undefined&&this.$route.query.partner_id!=='null') {
                    this.$router.replace(`/product_detail?id=${this.$route.query.partner_id}&tab=1`);
                  }
                  // if (this.$route.query&&this.$route.query.product_id) {
                  //   this.$router.replace(`/product_detail?id=${this.$route.query.product_id}`);
                  // }
                  else this.$router.replace(`/product_detail?id=${this.product_id}&tab=1`);
                }
              }).catch(err=> {
              if(!err.response.data.message)
                this.toast(err.response.data.detail);
              else
                this.toast(err.response.data.message);
            })
          }
        }
      },
    getReviewDetail() {
        if(this.review_id!==undefined) {
          this.$axios.get(`user/${this.user.user_id}/product/${this.product_id}/review/${this.review_id}`).then(res=>{
            let data = res.data;
            this.formData.forEach(item=>{
              item.value = data[item.field];
            })
          })
        }
      }
  },
  computed: {
    buttonCustomCancel() {
      let styles = this.cloneItem(this.buttonCustom);
      styles.backgroundColor = this.brandColor.sub.color;
      return styles;
    },
    inputCustomTextarea() {
      let styles = this.cloneItem(this.inputCustom);
      styles.height = '160px';
      return styles;
    }
  },
  watch: {
    
  }
}
</script>


