<template>
<div class="flex-center" :style="pagePadding">
  <div class="text-center col-9">
    <div class="size-18 weight-400" 
      style="color:#212121;margin-bottom:32px">청구서 제출이 완료되었습니다.</div>
    <div class="btn size-15 unselect"
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
  height: 48px;
  line-height: 48px;
  background-color: #4f76ff;
}
</style>