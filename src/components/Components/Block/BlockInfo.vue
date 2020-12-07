<template>
<div :style="pagePadding">
    <div class="size-20 text-center bold" :style="[titleStyle, brandColor.brand]">교육관</div>
    <div class="position-relative" style="margin-top:40px">
    
      <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/33438160_thumb.png"
        class="full-width">
      <div class="position-absolute text bold">
        <div>스포츠를 통해<br>
          건강한 미래를 만듭니다.</div>
      </div>
    </div>
    
    <div class="size-12 box" style="margin-bottom:40px">
      <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/44197298_thumb.png"
        class="img">
      <div>
        <div class="size-25 bold text-center" :style="brandColor.primary"
          style="padding: 8px 0">GRIT</div>
        <div :style="brandColor.main">
          <span :style="brandColor.white" class="bold">포기하지 않고 성취하고자 하는 목표를 끝까지 해내는 힘을 의미합니다. </span>
          펜실베니아 대학교 심리학과 교수인 엔젤라 더크워스가 개념화한 용어입니다. 그녀가 10년간 사회 각계각층에서 성공한 이들의 공통점을 연구한 결과, 그 비결은 
          <span :style="brandColor.white" class="bold">그릿을 가지고 한 분야의 최고가 되는 것이었습니다.</span></div>
      </div>  
    </div>
    
    <div class="size-12 box">
      <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/51590793_thumb.png"
        class="img">
        
      <div>
        <div class="size-25 bold text-center" :style="brandColor.primary"
          style="padding: 8px 0">GRIT 12</div>
        <div :style="brandColor.main">
          단순한 축구교실을 운영하지 않습니다. 
          <span :style="brandColor.white" class="bold">아이들에게 축구를 통해 인내하고 성장하는 자세를 기르도록 돕습니다. </span>
          축구를 통해 팀워크의 중요성을 가르치고, 목표를 달성하는 즐거움을 일깨워줍니다. </div>
        <div :style="brandColor.main">이를 통해 아이들이 앞으로 어떠한 일을 하든 최고의 밑거름이 될 것이라 믿습니다.</div>  
      </div>  
    </div>
    
    <div class="size-20 text-center bold" :style="[titleStyle, brandColor.brand]">사회 공헌 활동</div>
    
    <div class="bottom-contain">
      <div class="margin-bottom-20">
        <div class="size-16 bold margin-bottom-4" :style="brandColor.brand">20. 06</div>
        <div class="size-14" :style="brandColor.main">김해북부아동복지센터와 MOU 체결</div>
      </div>
      
      <div>
        <div class="size-16 bold margin-bottom-4" :style="brandColor.brand">20. 06 ~ 현재</div>
        <div class="size-14" :style="brandColor.main">김해북부아동복지센터 Partnership 축구교육서비스 제공 및 축구 굿즈 기부</div>
      </div>
    </div>
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockInfo',
  components: {

  },
  mixins: [
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
    titleStyle() {
      return {
        padding: '24px 0',
        borderBottom: this.brandBorder.main.border
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.text {
  font-size: 20px;
  bottom: 16px;
  left: 12px;
  color: white;
}
.img {
  width: 100%;
  object-fit: cover;
}
.box {
  margin-top: 20px;
  line-height: 22px;
}
.bottom-contain {
  padding: 20px 12px;
}
</style>

