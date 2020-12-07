<template>
<div class="full-width" :style="[brandBgColor.main, pagePadding]">
  <div class="text-center bold" :style="[titleStyle, brandColor.brand]">상세 내역 및 신청</div>

    <div class="bold text-center" :style="brandColor.primary"
      style="font-size:24px;padding:20px 0">{{ prodName }}</div> 
    
    <div>
      <component 
          v-for="form in formData"
          :key="form.name"
          :is="form.elType" 
          v-bind="form"
          :value.sync="form.value"
          :options="form.options"
          :formType="formTypeCustomLabel"
          :containerCustomStyle="form.containerCustom"
          :labelCustomStyle="labelCustom"
          :dropdownCustomStyle="form.dropdownCustom"
          :dropListCustomStyle="dropListCustomStyle"
          :dropItemCustomStyle="inputCustom"
          :inputCustomStyle="form.inputCustom"
          :buttonCustomStyle="buttonCustom"
          :iconCustomStyle="iconCustomStyle"
        ></component>
    </div>
    <div v-if="$store.getters.device === 'mobile'">
      <div :style="buttonCustom" style="margin: 48px 0 0;" @click="save">제출하기</div>         
      <!--<div :style="buttonCustomCancel" style="margin: 12px 0 20px;" @click="clickBack">취소</div>      -->
    </div>
    <div v-else class="flex-justify" style="margin-top:48px">
      <!--<div :style="buttonCustomCancel" style="margin-right:16px;" class="pc-style" @click="clickBack">취소</div>-->
      <div :style="buttonCustom" class="pc-style size-20 bold" @click="save">제출하기</div>         
    </div>
    

    <!--<div>-->
    <!--  <btn :color="brandColor.white"-->
    <!--    :backgroundColor="brandBgColor.brand"-->
    <!--    @clicked="register"-->
    <!--    style="margin: 48px 0 12px;">제출하기</btn>  -->
    <!--</div>-->
    <!--<div>-->
    <!--    <btn :backgroundColor="btnColor" :color="brandColor.white"-->
    <!--      @clicked="clickBack">취소</btn>-->
    <!--  </div>-->
  </div>
</template>
<script>
import FormMixin from "@/components/Mixins/FormMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockCompetitionRegister',
  components: {

  },
  mixins: [
    FormMixin,
    BlockMixin,
    HeaderMixin,
    FormCustomMixin
  ],
  props: {

  },
  data() {
    return {
      "terms": {
        "name": "이용약관 및 개인정보처리방침 동의",
        "items": [
          {
            "link": "termsofservice_overlay",
            "text": "이용약관",
            "styles": {
              "container": {
                "fontWeight": "bold"
              }
            },
            "linkType": "overlay"
          },
          {
            "text": " 및 ",
            "styles": {
              "container": {
                "padding": "0 4px"
              }
            }
          },
          {
            "link": "privacy_overlay",
            "text": "개인정보처리방침",
            "styles": {
              "container": {
                "fontWeight": "bold"
              }
            },
            "linkType": "overlay"
          },
          {
            "text": "에 동의하기"
          }
        ],
        "label": "",
        "value": false,
        "format": "CgCheckboxArray",
        "validate": {
          "valid_required": true
        }
      },
      "formData": [
        {
          "name": "첨부파일",
          "field": "file",
          "label": "",
          "value": "",
          "format": "CFileUploader",
          "validate": {
            "required": false,
            "valid_required": false
          },
          "placeholder": ""
        },
        {
          "name": "이름",
          "field": "name",
          "label": "",
          "value": "",
          "format": "CInput_text",
          "validate": {
            "required": true,
            "valid_required": false
          },
          "placeholder": "이름"
        },
        {
          "name": "연락처",
          "field": "name",
          "label": "",
          "value": "",
          "format": "CInput_text",
          "validate": {
            "required": true,
            "valid_required": false
          },
          "placeholder": "연락처"
        },
        {
          "name": "이메일",
          "field": "name",
          "label": "",
          "value": "",
          "format": "CInput_text",
          "validate": {
            "required": true,
            "valid_required": false
          },
          "placeholder": "이메일"
        },
        {
          "name": "문의 유형",
          "field": "title",
          "label": "",
          "value": "",
          "format": "CDropdown",
          "options": [
            {
              "label": "문의 유형 1",
              "value": "type1"
            },
            {
              "label": "문의 유형 2",
              "value": "type2"
            },
            {
              "label": "문의 유형 3",
              "value": "type3"
            }
          ],
          "validate": {
            "required": false,
            "valid_required": false
          },
          "placeholder": "문의 유형 선택"
        },
        {
          "name": "문의 제목",
          "field": "title",
          "label": "",
          "value": "",
          "format": "CInput_text",
          "validate": {
            "required": true,
            "valid_required": false
          },
          "placeholder": "문의제목을 입력해주세요"
        },
        {
          "name": "문의 내용",
          "field": "content",
          "label": "",
          "value": "",
          "format": "CInput_textarea",
          "validate": {
            "required": true,
            "valid_required": false
          },
          "placeholder": "문의내용을 입력해주세요"
        },
        {
          "name": "이용약관 및 개인정보처리방침 동의",
          "items": [
            {
              "link": "termsofservice_overlay",
              "text": "이용약관",
              "styles": {
                "container": {
                  "fontWeight": "bold"
                }
              },
              "linkType": "overlay"
            },
            {
              "text": " 및 ",
              "styles": {
                "container": {
                  "padding": "0 4px"
                }
              }
            },
            {
              "link": "privacy_overlay",
              "text": "개인정보처리방침",
              "styles": {
                "container": {
                  "fontWeight": "bold"
                }
              },
              "linkType": "overlay"
            },
            {
              "text": "에 동의하기"
            }
          ],
          "label": "",
          "value": false,
          "format": "CgCheckboxArray",
          "validate": {
            "valid_required": true
          }
        }
      ],
      "prodName": "",
      "formTitle": ""
    }
  },
  created() {
      // this.formData = this.setForm(this.formData);
      // this.getForm();
      this.$axios.get(`/user/${this.user.user_id}/mapping/product/${this.$route.query.id}?fields=id,name`)
      .then(res => {
        this.prodName = res.data.name;
      })
      this.getCounselForm();
    },
  
  methods: {
    getForm() {
        this.$axios.get('public/inquiry/personal/category')
        .then(res => {
          let categories = res.data;
          this.$axios.get('public/inquiry/personal/formdata')
          .then(res2 => {
            let result = [];
            res2.data.forEach(item => {
              if (item.field==='type_id') {
                item.options = categories;
              }

              result.push(item);
              
            })
            this.formData = this.setForm(result);

            let dropdown = find(this.formData, 'format', 'CDropdown');
            let dropStyle = this.cloneItem(this.inputCustom);
            dropStyle.color = this.brandColor.primary.color;
            dropStyle.fontWeight = '500';
            dropdown.dropdownCustom = dropStyle;
            
            let name = find(this.formData, 'field', 'name');
            name.inputCustom = this.inputCustom;
            
            let phone = find(this.formData, 'field', 'phone');
            phone.inputCustom = this.inputCustom;
            
            let email = find(this.formData, 'field', 'email');
            email.inputCustom = this.inputCustom;
            
            let content = find(this.formData, 'field', 'content');
            content.inputCustom = this.inputCustomTextarea;
            
          })
        })
      },
    register() {
        let result = this.getParamData(this.formData);
        if (result.enable) {
          let user_id = this.$store.getters.user.user_id;
          if (user_id)
            result.params.user_id = user_id;
          this.$axios.post('public/inquiry/personal', result.params)
          .then(res => {
            if (res.status === 200) {
              this.toast('문의글이 작성되었습니다.');
              this.$router.replace('home');
            }
          })
          .catch(err => {
            if(!err.response.data.message)
              this.toast(err.response.data.detail);
            else
              this.toast(err.response.data.message);
          })
        }
      },
    getCounselForm() {
        this.$axios.get(`public/counsel/form/1`)
        .then(res => {
          this.formTitle = res.data.title;
          res.data.forms.push(this.terms);
          this.formData = this.setForm(res.data.forms);

          this.formData.forEach(item => {
            if (item.value===undefined || item.value==='') {
              if (item.elType==='c-input-date') {
                let today = moment()
                item.value = this.dateFormat(today, 'date_4');
              }
              else if (item.elType==='c-input-time') {
                item.value = '00:00'
              }

              let user = {};
              if (this.user) user = this.user;
              if (item.elType==='c-input-text' && item.name==='이름') {
                item.value = user.name;
              }
              else if (item.elType==='c-input-phone' && item.name==='연락처') {
                item.value = user.phone;
              }
              else if (item.elType==='c-input-email' && item.name==='이메일') {
                item.value = user.email;
              }
            }
            item.inputCustom = this.inputCustom;
          })
          
        })
      },
    save() {
        let result = this.setCounselForm(this.formData);
        if(result.enable) {
          let param = {
            product_id: this.$route.query.id,
            forms: [
              {
                title: this.formTitle,
                answers: result
              }
            ]
          };
          // 상담신청 & 모임신청
          if(this.user.user_id) param.user_id = this.user.user_id;
          this.$axios.post(`public/counsel/request`, param)
          .then(res => {
            if (res.status===200) {
              let text = '상담'
              this.toast(`${text} 신청이 완료되었습니다.`);
              this.$router.replace(`competition_detail?id=${this.$route.query.id}`);
            }
          })
        }
      }
  },
  computed: {
    titleStyle() {
      if(this.$store.getters.device==='pc') {
        return {
          padding: '20px 0',
          borderBottom: this.brandBorder.sub.border,
          fontSize: '20px'
        } 
      }
      else {
        return {
          padding: '20px 0',
          borderBottom: this.brandBorder.sub.border,
          fontSize: '20px'
        }
      }
    },
    btnColor() {
      return {
        backgroundColor: '#9b9b9b'
      }
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
    },
    dropListCustomStyle() {
      return {
        top: '48px'
      }
    },
    dropItemCustomStyle() {
      return {
        backgroundColor: '#fff'
      }
    },
    iconCustomStyle() {
      return {
        fontSize: '22px',
        position: 'absolute',
        right: '16px',
        color: this.brandColor.main.color
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.pc-style {
  width: 192px !important;
}
</style>

