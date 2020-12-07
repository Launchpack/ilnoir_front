<template>
<div>
  <div :style="pagePadding" style="padding:24px 0 16px">
    <div class="size-20 bold" :style="[brandColor.main]">회원가입</div>
  </div>
  <div :style="[contentStyle]">
    <!-- 본인 인증 메시지 -->
    <div v-if="isVerify" style="padding:20px 0">{{ $store.getters.service.title }} 회원가입을 위해서는 본인인증이 필요합니다.</div>
    <!--회원가입 폼 요소-->
    <component 
              :is="form.elType" v-for="(form,idx) in computedFormData" :key="'form-'+idx"
               v-bind="form" :value.sync="form.value"
               :formType="formTypeCustomLabel"
               :containerCustomStyle="form.containerCustom"
               :labelCustomStyle="labelCustom"
               :inputCustomStyle="inputCustom"
               :addressInputWrapStyle="{marginTop: '8px'}"
               :buttonCustomStyle="buttonCustom"
               :addressButtonCustomStyle="addressButtonCustom"
               :inputWrapStyle="inputWrapStyle"></component>
  </div>

  <!--회원가입 버튼-->
  
  <div style="padding:32px 16px" v-if="!isVerify"
    class="flex-align">
    <!--내정보수정 버튼-->
    <div class="unselect" :style="btnStyle" style="margin-right:20px" @click="sign">가입하기</div>
    <div @click="clickBack" :style="[brandBgColor.white,radius]" class="size-14 weight-500 unselect"
      style="width:30%;height:48px;line-height:48px;text-align:center">취소</div>
  </div>
</div>
</template>
<script>
import FormMixin from "@/components/Mixins/FormMixin"
import AuthMixin from "@/components/Mixins/AuthMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'BlockSignupPc',
  components: {

  },
  mixins: [
    FormMixin,
    AuthMixin,
    FormCustomMixin,
    HeaderMixin
  ],
  props: {

  },
  data() {
    return {
      "formData": [
        {
          "name": "아이디",
          "field": "username",
          "label": "",
          "value": "",
          "format": "CInput_email",
          "validate": {
            "num": true,
            "alpha_g": true,
            "alpha_s": true,
            "special": true,
            "required": true,
            "max_length": 30,
            "min_length": 4,
            "valid_required": true
          },
          "placeholder": "아이디"
        },
        {
          "name": "비밀번호",
          "field": "password",
          "label": "",
          "value": "",
          "format": "CInput_password",
          "validate": {
            "required": true,
            "valid_required": true
          },
          "placeholder": "비밀번호"
        }
      ],
      "isVerify": true,
      "inputImgData": undefined
    }
  },
  created() {
      this.getForm();
    },
  
  methods: {
    sign() {
        let result = this.getParamData(this.computedFormData);
        
        if(result.enable) {
          // if(this.$route.query.login_type) result.params['login_type'] = this.$route.query.login_type;
          
          //본인인증 처리시, birth, gender, phone 반영 (result.params에 빠진 경우 추가)
          if(this.$route.query.type === 'personal_valid') {
            if(!result.params.birth) {
              let no = this.$route.query.social_no;
              result.params.birth = `${no.substring(0,4)}-${no.substring(4,6)}-${no.substring(6,8)}`;
            }
            if(!result.params.gender) {
              result.params.gender = this.$route.query.sex === 'M' ? 'male' : "female";
            }
            if(!result.params.phone) {
              result.params.phone = this.$route.query.phone;
            }
            if(!result.params.name) {
              result.params.name = this.$route.query.name;
            }
          }

          this.$axios.post(`auth/user/signup`, result.params).then(res=>{
            if(res.status===200) {
              this.toast('회원가입 되었습니다.');
              this.setUserData(res.data);
              this.setAuthHeader();
              this.$router.replace('home');
            }
          }).catch(err=> {
          console.log(err)
            if(!err.response.data.message)
              this.toast(err.response.data.detail);
            else
              this.toast(err.response.data.message);
          })
        }
      },
    getForm() {
        this.$axios.get('public/member/formdata/1').then(res=>{
          let formData = res.data;
          
          let profileForm = find(formData, 'field', 'profile');
          if (profileForm && profileForm.format==='CImgUploader') {
            profileForm.elType = 'c-input-imgUploader-single'
            profileForm.format = 'CImgUploaderSingle'
          }
          
          formData.map(fd => {
            fd.containerCustom = {marginTop: '16px'};
          })
          
          formData.push(
            {
              name: '이용약관 및 개인정보처리방침 동의',
              label: '',
              format: 'CgCheckboxArray',
              items: [
                {
                  text: '이용약관',
                  link: 'TermsofserviceModal',
                  linkType: 'modal',
                  styles: {
                    container: {
                      color: this.brandColor.primary.color,
                      fontWeight: 500,
                      textDecoration: 'underline'
                    }
                  }
                },
                {
                  text: ' 및 ',
                  styles: {
                    container: {
                      padding: '0 4px'
                    }
                  }
                },
                {
                  text: '개인정보처리방침',
                  link: 'PrivacyModal',
                  linkType: 'modal',
                  styles: {
                    container: {
                      color: this.brandColor.primary.color,
                      fontWeight: 500,
                      textDecoration: 'underline'
                    }
                  }
                },
                {
                  text: '에 동의하기'
                }
              ],
              validate: {
                valid_required: true,     // validation 필수 여부
              },
              value: false,
              containerCustom: {marginTop: '24px'}
            }
          )
          
          this.inputImgData = formData[0];
          this.inputImgData.elType = 'c-input-imgUploader-single'
          
          formData.splice(0,1,this.inputImgData);
          
          
          formData = this.setForm(formData);

          // 소셜로그인 진입 시
          if (this.$route.query.user_id !== undefined) {
            find(formData, 'field', 'username').value = this.$route.query.user_id;
            find(formData, 'field', 'username').elType = '';
            find(formData, 'field', 'password').elType = '';
            find(formData, 'field', 'password_re').elType = '';
            let name = find(formData, 'field', 'name');
            if(name !== undefined) name.value = this.$route.query.name;
            let profile = find(formData, 'field', 'profile')
            if(profile !== undefined) profile.value = this.$route.query.profile;
          }
          
          // https://modowa.kr/signup?type=personal_valid&name=%EC%9D%B4%EB%82%A8%ED%98%B8&phone=01094785634&Tradeid=03023f48-11bf-4200-8cad-b221a232336b&sex=M&social_no=19821222
          if(this.$route.query.type === 'personal_valid') {
            let gender = find(formData, 'field', 'gender');
            if(gender) {
              gender.value = this.$route.query.sex === 'M' ? 'male' : "female";
              gender.options.forEach(item=> { if(item.value !== gender.value) item.disabled = true });
            }
            let birth = find(formData, 'field', 'birth');
            if(birth) {
              let no = this.$route.query.social_no;
              birth.value = `${no.substring(0,4)}-${no.substring(4,6)}-${no.substring(6,8)}`;
              birth.disabled = true;
            }  
            let name = find(formData, 'field', 'name');
            if(name) {
              name.value = this.$route.query.name;
              name.disabled = true;
            }
            let phone = find(formData, 'field', 'phone');
            if(phone) {
              phone.value = this.$route.query.phone;
              phone.disabled = true;
            }
          }

          this.formData = formData;
        })
      }
  },
  computed: {
    btnStyle() {
        return {
          fontSize: '14px',
          fontWeight: '500',
          backgroundColor: this.brandBgColor.primary.backgroundColor,
          color: this.brandColor.white.color,
          width: '30%',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px',
          borderRadius: this.radius.borderRadius,
          pointer: 'cursor'
        }
      },
    inputCustom() {
      return {
        border: this.brandBorder.main.border,
        borderRadius: '6px',
        backgroundColor: 'white',
        padding: '12px 16px',
        color: this.brandColor.main,
        fontSize: '14px',
        height: '48px',
      }
    },
    computedFormData() {
        //본인인증 필드 보유 여부 확인
        let verify = this.formData.filter(item => { return item.type === 'verify' });
        if(verify.length === 1 && this.$route.query.type === undefined) {
          this.isVerify = true;
          this.formTypeCustomLabel.label = false;
         return verify; 
        } else {
          this.isVerify = false;
          this.formTypeCustomLabel.label = true;
          return this.formData.filter(item => {return item.type !== 'verify' });
        }
      },
    addressButtonCustom() {
      let styles = this.cloneItem(this.buttonCustom);
      styles.backgroundColor = this.brandColor.sub.color;
      styles.padding = '12px 20px';
      return styles;
    },
    inputWrapStyle() {
      return {
        display: 'none'
      }
    },
    contentStyle() {
      return {
        borderTop: `1px solid ${this.getColor('기본 테두리선 색상')}`,
        borderBottom: `1px solid ${this.getColor('기본 테두리선 색상')}`,
        padding: '20px 28px 32px'
      }
    }
  },
  watch: {
    
  }
}
</script>


