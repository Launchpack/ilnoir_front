<template>
<div>
  <!--내정보수정 폼 요소-->
  <component :is="form.elType" v-for="(form,idx) in formData" :key="'form-'+idx"
             v-bind="form" :value.sync="form.value"
             :formType="formTypeCustomLabel"
             :containerCustomStyle="form.containerCustom"
             :labelCustomStyle="labelCustom"
             :inputCustomStyle="inputCustom"
             :addressInputWrapStyle="{marginTop: '8px'}"
             :buttonCustomStyle="buttonCustom"
             :addressButtonCustomStyle="addressButtonCustom"></component>

  <!--내정보수정 버튼-->
  <div :style="buttonCustom" style="margin: 48px 0 20px;" @click="save">변경하기</div>
</div>  
  
  
<!--<div>-->
    <!-- 내 정보 수정 폼 -->
<!--    <component :is="form.elType" -->
<!--      v-for="(form,idx) in computedformData" :key="'form-'+idx"-->
<!--      v-bind="form"-->
<!--      :value.sync="form.value"-->
<!--      :formType="formTypeData"></component>-->
<!--    <div style="margin-top: 24px">-->
<!--      <btn :color="brandColor.white"-->
<!--           :backgroundColor="brandBgColor.brand"-->
<!--           @clicked="save">변경하기</btn>-->
<!--    </div>-->
<!--  </div>-->
</template>
<script>
import FormMixin from "@/components/Mixins/FormMixin"
import AuthMixin from "@/components/Mixins/AuthMixin"
import FormCustomMixin from "@/components/Components/Mixin/FormCustomMixin"

export default {
  name: 'BlockProfile',
  components: {

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
      "check": false,
      "formData": []
    }
  },
  created() {
      this.getForm();
    },
  
  methods: {
    save() {
        // 소셜로그인 여부
        if (this.isSocialLogin) {
          this.updateInfo();
        }
        // 이메일로그인
        else {
          let password = find(this.formData, 'field', 'password').value;
          if(!password) {
            this.toast('비밀번호를 입력하세요.');
            return;
          }
          // 비밀번호 체크 api
          this.$axios.post('auth/user/login', {
            username: find(this.formData, 'field', 'username').value,
            password: find(this.formData, 'field', 'password').value
          }).then(res=> {
            if(res.status===200) {
              this.updateInfo();
            }
          }).catch(error=> {
            this.toast('잘못된 비밀번호 입니다.');
          });
        }
      },
    updateInfo() {
        let result = this.getParamData(this.formData);
        if(result.enable) {
          this.$axios.patch(`user/${this.$store.getters.user.user_id}`,
            result.params).then(res=>{
            if(res.status===200) {
              this.toast('내 정보가 변경되었습니다.');
              this.setUserData(res.data);
              this.$router.replace('home');
            }
          }).catch(err=> {
            if(!err.response.data.message)
              this.toast(err.response.data.detail);
            else
              this.toast(err.response.data.message);
          })
        }
      },
    getForm() {
        this.$axios.get('public/member/formdata/2').then(res=>{
          this.formData = this.setForm(res.data);
          
          let profileForm = find(this.formData, 'field', 'profile');
          if (profileForm && profileForm.format==='CImgUploader') {
            profileForm.elType = 'c-input-imgUploader-single'
            profileForm.format = 'CImgUploaderSingle'
          }

          let result = [];

          this.formData.forEach((item,idx) => {
            // 폼 ID 수정 불가
            if (item.field==='username') item.disabled = true;
            let user = this.$store.getters.user;
            let value = user[item.field]
            if(value) item.value = value;

            // 소셜로그인 여부
            if (this.isSocialLogin) {
              if (['username','password','password_re'].indexOf(item.field)>-1) {
                item.enable = false;
                item.validate = {
                  required: false,
                  valid_required: false
                };
              }
            }
            // 이메일 로그인
            else if (user.username!==undefined) {
              if (['email','password_re'].indexOf(item.field)>-1) {
                item.enable = false;
                item.validate = {
                  required: false,
                  valid_required: false
                };
              }
            }
            
            result.push(item);
          })
          
          this.formData = result;
          
        })
      }
  },
  computed: {
    user() {
        return this.$store.getters.user;
      },
    computedformData() {
        let result = [];
        this.formData.forEach(item => {
          if (item.enable) result.push(item);
        })
        return result;
      },
    addressButtonCustom() {
      let styles = this.cloneItem(this.buttonCustom);
      styles.backgroundColor = this.brandColor.sub.color;
      styles.padding = '12px 20px';
      return styles;
    }
  },
  watch: {
    
  }
}
</script>


