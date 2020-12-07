<template>
<div>
    <page-header>
      <i class="material-icons header-icon" slot="left" @click="clickBack">keyboard_arrow_left</i>
      <span class="header-title" slot="center">비밀번호 변경</span>
    </page-header>

    <div :style="[wrapperStyle, pagePadding, pageHeight, pageBg]" style="padding-top:4px;">
      <block-password></block-password>

      <div class="unselect sub-tip" @click="$refs.passModal.open()">
        <span style="text-decoration-line: underline;">비밀번호가 기억나지 않으세요?</span></div>
    </div>

    <!-- 비밀번호 이메일 전송 -->
    <sweet-modal ref="passModal" overlay-theme="dark">
      <div class="modal-wrapper">
        <block-password-email @Success="$refs.passModal.close()"></block-password-email>
      </div>
    </sweet-modal>
  </div>
</template>
<script>
import BlockPasswordEmail from "@/components/Components/Block/BlockPasswordEmail"
import BlockPassword from "@/components/LaunchPack_Common/Block/BlockPassword"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Password',
  components: {
    BlockPasswordEmail,
    BlockPassword
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
  mounted() {

  },
  
  methods: {
    
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
  margin-top: 12px;
  text-align: center;
  color: #777;
}
</style>

