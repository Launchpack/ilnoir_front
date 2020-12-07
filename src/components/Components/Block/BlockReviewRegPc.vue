<template>
<div class="flex-justify">
  <div class="full-width" :style="pcMaxWidth" style="padding-bottom:100px">
    
    <!--<bread-crumb-pc :breadcrumb="breadcrumbs" v-if="vBread"></bread-crumb-pc>-->
    
    <!-- 후기 작성 -->
    <div class="full-width" style="margin-top: 32px">
      <div>
        <div class="size-20 margin-bottom-28 weight-500">리뷰 작성</div>
        <card-product-review-pc
            style="margin-bottom:36px"
            slot="card"
            v-for="item in list_product"
            :key="`card-${item.id}`"
            :card="item"></card-product-review-pc>
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
         
    <div class="flex-align" style="margin-top:48px">
      <div :style="buttonCustomCancel" style="margin-right:16px;cursor:pointer" @click="clickBack">취소</div>
      <div :style="buttonCustomPrimary" @click="save"
        style="cursor:pointer">리뷰 작성</div>         
    </div>
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
</div>
</template>
<script>
import CardProductReviewPc from "@/components/Components/Card/CardProductReviewPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import FormMixin from "@/components/Mixins/FormMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockReviewRegPc',
  components: {
    CardProductReviewPc,
    BreadCrumbPc
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
      "vBread": false,
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
          "format": "CFileUploaderSingle",
          "validate": {
            "required": false,
            "valid_required": false
          },
          "placeholder": "+첨부파일 추가"
        }
      ],
      "breadcrumbs": undefined,
      "list_product": []
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
    setBreadCrumb() {
      this.breadcrumbs = []
      this.breadcrumbs.push({
        "link": "home",
        "name": "홈"
      });

      
      for(let i=0;i<this.categories.length;i++) {
        this.categories[i].link = `product?tab=${this.categories[i].id}`
        
        if(this.list_product[0].category1 === this.categories[i].id) {
          this.breadcrumbs.push({
            name: this.categories[i].name,
            link: this.categories[i].link,
            list: this.categories
          })
        }
      }

      this.breadcrumbs.push({
        name: this.list_product[0].name,
        link: `product_detail?id=${this.list_product[0].id}`
      });
      

      this.breadcrumbs.push({
        name: '리뷰 작성'
      });
      this.vBread = true;
    },
    initForm() {
      this.formData = this.setForm(this.formData);
      
      let title = find(this.formData, 'field', 'title');
      title.inputCustom = this.inputCustom;
      
      let content = find(this.formData, 'field', 'content');
      content.inputCustom = this.inputCustomTextarea;
    },
    getProductDetail() {
      this.list_product =[];
        let url = `user/${this.user.user_id}/mapping/product/${this.product_id}?fields=`;
        this.$axios.get(url).then(res => {
          this.list_product.push(res.data);
          this.setBreadCrumb();
        })
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
                  //   this.$router.replace(`/product_detail?id=${this.$route.query.product_id}&tab=1`);
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
      styles.width = '192px'
      return styles;
    },
    buttonCustomPrimary() {
      let styles = this.cloneItem(this.buttonCustom);
      styles.backgroundColor = this.brandColor.primary.color;
      styles.width = '192px'
      return styles;
    },
    inputCustomTextarea() {
      let styles = this.cloneItem(this.inputCustom);
      styles.height = '160px';
      return styles;
    },
    categories() {
      return this.$store.getters.category;
    }
  },
  watch: {
    
  }
}
</script>


