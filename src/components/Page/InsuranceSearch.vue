<template>
  <div :style="pagePadding" style="background-color:#f8f8f8">

    <div class="flex-center" style="padding:48px 0 80px">
      <img src="/claim/static/image/icon/logo.svg" style="height:60px; margin: 0 16px;"
          class="unselect" @click="routerPush('insurance_search')"/>
    </div>

      <div class="size-19 text-center weight-500 margin-bottom-12"
        style="color:#212121">가입 보험 조회</div>
      <div class="size-12 text-center"
           style="line-height:18px;color:#515151">보험 가입 및 주문 시 기재한<br>이용자 성함과 배송주문번호를 입력하세요.</div>

      <div style="padding:0 8px 48px">
        <c-input-text placeholder="이용자 성함" :inputCustomStyle="inputCustomStyle"
          @update:value="updateName"></c-input-text>
        <c-input-text placeholder="배송주문번호" :inputCustomStyle="inputCustomStyle"
                      @update:value="updatePhone"></c-input-text>
        <!--<c-input-text placeholder="휴대전화번호" :inputCustomStyle="inputCustomStyle"
          @update:value="updatePhone"></c-input-text>-->
        <div v-if="noneState" class="size-12 weight-500"
          style="color:#d92424;margin-top:8px">
          *가입된 정보가 없습니다. 입력하신 내용을 다시 확인해주세요.
        </div>
      </div>

      <div style="padding:0 8px" class="flex-justify">
        <div class="full-width btn size-16 weight-400 unselect"
          @click="clickRequest">조회하기</div>
      </div>
  </div>
</template>

<script>
import CInputText from "@/components/Components/Form/CInputText";
import CInputNumber from "@/components/Components/Form/CInputNumber";

export default {
  name: "InsuranceSearch",
  components: {
    CInputText,
    CInputNumber
  },
  data() {
    return {
      inputCustomStyle: {
        padding: '16px',
        fontSize: '14px',
        color: '#979797',
        border: '1px solid #eeeeee',
        backgroundColor: 'white'
      },
      info: {
        name: '',
        phone: '',
        order_number: ''
      },
      noneState: false,
    }
  },
  methods: {
    updateName(val) {
      this.info.name = val;
    },
    updatePhone(val) {
      this.info.order_number = val;
    },
    clickRequest() {
      if(this.info.name.length===0 || this.info.order_number.length===0) {
        this.toast('정보를 모두 입력해주세요.');
        return;
      }

      this.$axios.post('/user/sign/select', this.info).then(res => {
        console.log(res)
        if(res.status===200) {
          this.routerPush(`insurance?id=${res.data.order_id}`);
        }
      }).catch(err => {
        console.log(err);
        this.noneState = true;
      })
    }
  }
}
</script>
<style scoped>
.btn {
  height:54px;
  background-color:#4f76ff;
  text-align: center;
  line-height: 54px;
  color: white
}
</style>
