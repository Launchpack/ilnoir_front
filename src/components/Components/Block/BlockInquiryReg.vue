<template>
<div class="full-width flex-justify" :style="[brandBgColor.main, pagePadding]" 
  style="padding:32px 0 100px">
    <!-- 후기 작성 -->
    <div class="full-width">
      <div>
        <div class="size-20 margin-bottom-16 weight-500">문의 작성</div>
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
         

    <div :style="buttonCustom" style="margin: 48px 0 0;" @click="save">문의 작성</div>         
    <div :style="buttonCustomCancel" style="margin: 12px 0 20px;" @click="clickBack">취소</div>         
         

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
import BlockMixin from "@/components/Mixins/BlockMixin"
import FormMixin from "@/components/Mixins/FormMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockInquiryReg',
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
      "inquiry_id": undefined,
      "product_id": undefined
    }
  },
  created() {
      this.inquiry_id = this.$route.query.inquiry_id;
      this.product_id = this.$route.query.product_id;
      this.getInquiryDetail();
      this.initForm();
    },
  
  methods: {
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


