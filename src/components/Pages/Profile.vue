<template>
<div :style="[pageHeight, pageBg]">

  <div :style="[pagePadding]" style="padding-bottom: 1px;">
    
    <transition name="fade" tag="div">
      <div class="size-20 weight-500" :style="brandColor.main" style="margin: 32px 0;">내 정보 수정</div>
    </transition>
  
    <div style="min-height:600px">
      <transition name="fade" tag="div">
        <block-profile></block-profile>
      </transition>
    </div>

    <div class="unselect sub-tip" @click="routerPush('password')">
      <span style="text-decoration-line: underline;">비밀번호 변경하기</span></div>

    <div class="sub-tip">
      더이상 사용하지 않으십니까? <b class="unselect" @click="$refs.signoutModal.open()">회원탈퇴하기</b></div>
  </div>

  <!-- 회원탈퇴 -->
  <sweet-modal ref="signoutModal" overlay-theme="dark">
    <modal @confirm="confirm" @cancel="$refs.signoutModal.close()">
      <div slot="header">회원탈퇴</div>
      <div slot="content">고객님의 서비스 이용 정보를 모두 삭제하고 서비스를 탈퇴히시겠습니까?</div>
    </modal>
  </sweet-modal>
    
</div>
</template>
<script>
import BlockPasswordEmail from "@/components/Components/Block/BlockPasswordEmail"
import BlockProfile from "@/components/Components/Block/BlockProfile"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Profile',
  components: {
    BlockPasswordEmail,
    BlockProfile
  },
  mixins: [
    HeaderMixin,
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {

    },
  
  methods: {
    confirm() {
        this.$axios.post(`auth/user/signout/${this.$store.getters.user.user_id}`)
          .then(res => {
            if(res.status===200) {
              this.toast('회원 탈퇴가 완료되었습니다.');
              this.$refs.signoutModal.close();
            }
          })
      }
  },
  computed: {
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.sub-tip {
  margin: 20px 0;
  text-align: center;
  color: #777;
}
</style>

