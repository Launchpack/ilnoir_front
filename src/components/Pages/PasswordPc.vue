<template>
<div>
    <div style="font-size:30px;text-align:center;padding:60px 0 0">비밀번호 변경</div>

    <div class="flex-justify">
      <div :style="[wrapperStyle, pageBg]" style="padding-top:4px;width:440px;">
        <block-password></block-password>
      </div>
    </div>
    
    <div class="unselect sub-tip" @click="$refs.passModal.open()">
        <span style="text-decoration-line: underline;">비밀번호가 기억나지 않으세요?</span></div>

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
import PageMixin from "@/components/Components/Mixin/PageMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'PasswordPc',
  components: {
    BlockPasswordEmail,
    BlockPassword
  },
  mixins: [
    PageMixin,
    BlockMixin
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
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.sub-tip {
  margin-top: 40px;
  text-align: center;
  color: #777;
}
</style>

