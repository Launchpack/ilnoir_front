<template>
<div class="flex-center">
  <div style="width:332px" class="text-center">
    <div class="size-24 weight-400" 
      style="color:#212121;margin-bottom:60px">청구서 제출이 완료되었습니다.</div>
    <div class="btn size-16 unselect"
      @click="clickBtn">가입 보험 조회하기</div>
  </div>
</div>
</template>

<script>
export default {
  name: "RequestDone",
  methods: {
    clickBtn() {
      this.routerPush('insurance_search');
    }
  }
}
</script>

<style scoped>
.btn {
  color: white;
  width: 100%;
  height: 54px;
  line-height: 54px;
  background-color: #4f76ff;
}
</style>