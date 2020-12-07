<template>
<div :style="pcMaxWidth">
  <!--<bread-crumb-pc v-if="vBread" :breadcrumb="breadcrumb"></bread-crumb-pc>-->

  <!-- 후기 작성 -->
  <div class="full-width" style="margin-top: 32px">
    <div>
      <div class="size-20 margin-bottom-28 weight-500">문의 작성</div>
    </div>
    <!-- 후기 폼 -->
    <component :is="form.elType" v-for="(form,idx) in formData"
               :key="'review-form-'+idx"
               v-bind="form"
               :value.sync="form.value"
       :formType="formTypeCustomLabel"
       :containerCustomStyle="form.containerCustom"
       :labelCustomStyle="labelCustom"
       :inputCustomStyle="form.inputCustom"
       :buttonCustomStyle="buttonCustom"></component>
       
  <div class="flex-align" style="margin-top:48px">
    <div :style="buttonCustomCancel" style="margin-right:16px" @click="clickBack" class="unselect">취소</div> 
    <div :style="buttonCustomPrimary" @click="save" class="unselect">문의 작성</div>         
  </div>
       

    <!--<div class="flex-end" style="margin:80px 0 12px">-->
    <!--  <btn :color="brandColor.white"-->
    <!--       :backgroundColor="brandBgColor.brand"-->
    <!--       @clicked="save">문의 작성</btn>-->
    <!--</div>-->
    <!--<div>-->
    <!--  <btn :backgroundColor="btnColor" :color="brandColor.white"-->
    <!--    @clicked="clickBack">취소</btn>-->
    <!--</div>-->
  </div>
</div>
</template>
<script>
import CardProductReview from "@/components/Components/Card/CardProductReview"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import FormMixin from "@/components/Mixins/FormMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockInquiryRegPc',
  components: {
    CardProductReview,
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
          "field": "question_content",
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
          "name": "비밀글 ",
          "field": "is_secret",
          "label": "비밀글로 작성하기",
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
        }
      ],
      "breadcrumb": [],
      "inquiry_id": undefined,
      "product_id": undefined,
      "list_product": undefined
    }
  },
  created() {
      this.inquiry_id = this.$route.query.inquiry_id;
      this.product_id = this.$route.query.product_id;
      this.getInquiryDetail();
      this.initForm();
      this.getProductDetail();
    },
  
  methods: {
    getProductDetail() {
      this.list_product =[];
        let url = `user/${this.user.user_id}/mapping/product/${this.product_id}?fields=`;
        this.$axios.get(url).then(res => {
          this.list_product.push(res.data);
          this.setBreadCrumb();
        })
      },
    setBreadCrumb() {
      this.breadcrumb.push({
        "link": "home",
        "name": "홈"
      });
      
      for(let i=0;i<this.categories.length;i++) {
        this.categories[i].link = `product?tab=${this.categories[i].id}`
        
        if(this.list_product[0].category1 === this.categories[i].id) {
          this.breadcrumb.push({
            name: this.categories[i].name,
            link: this.categories[i].link,
            list: this.categories
          })
        }
      }
      
      this.breadcrumb.push({
        name: this.list_product[0].name,
        link: `product_detail?id=${this.list_product[0].id}`
      });
      
      this.breadcrumb.push({
        name: '문의 작성'
      });
      
      this.vBread = true;
    },
    initForm() {
      this.formData = this.setForm(this.formData);
      
      let title = find(this.formData, 'field', 'title');
      title.inputCustom = this.inputCustom;
      
      let content = find(this.formData, 'field', 'question_content');
      content.inputCustom = this.inputCustomTextarea;
    },
    save() {
        let result = this.getParamData(this.formData);
        if(result.enable) {
          if(this.inquiry_id===undefined) {
            this.$axios.post(`user/${this.user.user_id}/product/${this.product_id}/inquiry`, result.params)
              .then(res => {
                if (res.status === 200) {
                  this.toast('문의글이 작성되었습니다.');
                  this.$router.replace(`/product_detail?id=${this.product_id}&tab=2`);
                }
              }).catch(err => {
              if (!err.response.data.message)
                this.toast(err.response.data.detail);
              else
                this.toast(err.response.data.message);
            })
          }
          else {
            this.$axios.patch(`user/${this.user.user_id}/product/${this.product_id}/inquiry/${this.inquiry_id}`, result.params)
              .then(res => {
                if (res.status === 200) {
                  this.toast('문의글이 수정되었습니다.');
                  this.$router.replace(`/product_detail?id=${this.product_id}&tab=2`);
                }
              }).catch(err => {
              if (!err.response.data.message)
                this.toast(err.response.data.detail);
              else
                this.toast(err.response.data.message);
            })
          }
        }
      },
    getInquiryDetail() {
        if(this.inquiry_id!==undefined) {
          let url = `user/${this.user.user_id}/product/${this.product_id}/inquiry/${this.inquiry_id}?secret=true`;
          this.$axios.get(url).then(res=>{
            let data = res.data;
            this.formData.forEach(item=>{
              item.value = data[item.field];
            })
          })
        }
      }
  },
  computed: {
    containerStyle() {
        let deco = this.brandBgColor.white;
        return deco;
      },
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


