<template>
<div>

  <!--로그인 폼 요소-->
  <component :is="form.elType" v-for="(form,idx) in formData" :key="'form-'+idx"
             v-bind="form" :value.sync="form.value" @onEnter="login"
             :formType="formTypeCustom"
             :containerCustomStyle="{marginTop: '8px'}"
             :inputCustomStyle="inputCustom"></component>

  <!--로그인 버튼-->
  <div :style="buttonCustom" style="margin-top:16px" @click="login">로그인</div>

  <!--회원가입/비밀번호찾기-->
  <div class="flex-center size-14" style="margin-top:32px" :style="brandColor.primary">
    <div class="weight-500 unselect" @click="routerPush('signup')" style="padding:4px 16px">회원가입</div>
    <div class="weight-500 unselect" style="padding:4px 16px" @click="routerModal('PasswordEmail')">비밀번호 찾기</div>
  </div>
  
  <!-- 소셜 로그인 폼 -->
  <c-sns-signin style="margin-top: 48px;"></c-sns-signin>
  
  <!--비번찾기-->
  <!--<sweet-modal ref="findPassword" overlay-theme="dark">-->
  <!--  <BlockPasswordEmailPc></BlockPasswordEmailPc>-->
  <!--</sweet-modal>-->


</div>
</template>
<script>
import BlockSnsSignin from "@/components/Components/Block/BlockSnsSignin"
import BlockPasswordEmailPc from "@/components/Components/Block/BlockPasswordEmailPc"
import FormMixin from "@/components/Mixins/FormMixin"
import AuthMixin from "@/components/Mixins/AuthMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockSigninPc',
  components: {
    BlockSnsSignin,
    BlockPasswordEmailPc
  },
  mixins: [
    FormMixin,
    AuthMixin,
    FormCustomMixin
  ],
  props: {

  },
  data() {
    return {
      "formData": []
    }
  },
  created() {
      this.getForm();
    },
  
  methods: {
    getForm() {
        let data = [
          {
            name: '아이디',
            field: 'username',
            label: '',
            placeholder: '아이디',
            format: 'CInput_email',
            validate: {
              required: true,          // 값 필수 여부
              valid_required: true,     // validation 필수 여부
              min_length: 4,            // 최소 문자 수
              max_length: 30,           // 최대 문자 수
              alpha_s: true,            // 알파벳 소문자
              alpha_g: true,            // 알파벳 대문자
              num: true,                // 숫자
              special: true             // 특수문자
            },
            value: '',
          },
          {
            name: '비밀번호',
            field: 'password',
            label: '',
            placeholder: '비밀번호',
            format: 'CInput_password',
            validate: {
              required: true,           // 값 필수 여부
              valid_required: true,     // validation 필수 여부
            },
            value: '',
          }
        ];
        this.formData = this.setForm(data);
      },
    login() {
        let result = this.getParamData(this.formData);

        if(result.enable) {
          this.$axios.post(`auth/user/login`, result.params)
          .then(res=>{
            if(res.status===200) {
              this.toast('로그인 되었습니다.');
              this.setUserData(res.data);
              this.setAuthHeader();
              let path = this.$store.getters.previousPath;
              if(!path) {
                path = this.$store.getters.brand.startpage;
              }
              this.$router.replace(path);

            }
          })
          .catch(err=> {
            if(!err.response.data.message)
              this.toast(err.response.data.detail);
            else
              this.toast(err.response.data.message);
          })
        }
      }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


