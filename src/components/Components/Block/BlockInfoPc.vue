<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <div class="size-40 text-center bold" :style="[titleStyle, brandColor.brand]">교육관</div>
    
    <div class="position-relative" style="margin-top:40px">
      <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/33438160.png"
        class="full-width">
      <div class="position-absolute text bold">
        <div>스포츠를 통해<br>
          건강한 미래를 만듭니다.</div>
      </div>
    </div>
    
    <div class="grid-box size-21 box">
      <div class="col-6">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/44197298.png" class="img">
      </div>
      <div class="col-6 text-contain">
        <div :style="brandColor.main"><span :style="brandColor.primary" style="font-size:50px;font-weight:bold">GRIT </span>
          은 포기하지 않고 성취하고자 하는 목표를 끝까지 해내는 힘을 의미합니다.</div>
        <div :style="brandColor.sub">펜실베니아 대학교 심리학과 교수인 엔젤라 더크워스가 개념화한 용어입니다.<br>그녀가 10년간 사회 각계각층에서 성공한 이들의 공통점을 연구한 결과, 그 비결은 
          <span :style="brandColor.main" class="bold">그릿을 가지고 한 분야의 최고가 되는 것이었습니다.</span></div>
      </div>  
    </div>
    
    <div class="grid-box size-21 box">
      <div class="col-6 text-contain">
        <div :style="brandColor.sub"><span :style="brandColor.primary" style="font-size:50px;font-weight:bold">GRIT12 </span>
          는 단순한 축구교실을 운영하지 않습니다. 
          <span :style="brandColor.main" style="font-weight:bold">아이들에게 축구를 통해 인내하고 성장하는 자세를 기르도록 돕습니다. </span>
          축구를 통해 팀워크의 중요성을 가르치고, 목표를 달성하는 즐거움을 일깨워줍니다. 이를 통해 아이들이 앞으로 어떠한 일을 하든 최고의 밑거름이 될 것이라 믿습니다.</div>
      </div>  
      
      <div class="col-6">
      <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/51590793.png" class="img">
        </div>
    </div>
    
    <div class="size-40 text-center bold" style="margin-top:20px" :style="[titleStyle, brandColor.brand]">사회 공헌 활동</div>
    
    <div class="bottom-contain">
      <div class="flex-align margin-bottom-30">
        <div class="col-3 size-25 bold" :style="brandColor.brand">20. 06</div>
        <div class="col-9 size-21" :style="brandColor.main">김해북부아동복지센터와 MOU 체결</div>
      </div>
      
      <div class="flex-align">
        <div class="col-3 size-25 bold" :style="brandColor.brand">20. 06 ~ 현재</div>
        <div class="col-9 size-21" :style="brandColor.main">김해북부아동복지센터 Partnership 축구교육서비스 제공 및 축구 굿즈 기부</div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockInfoPc',
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
        padding: '80px 0 40px',
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
  font-size: 50px;
  bottom: 120px;
  left: 100px;
  color: white;
}
.img {
  width: 100%;
  height: 334px;
  object-fit: cover;
}
.text-contain {
  padding: 28px 32px;
  line-height: 38px;
}
.box {
  margin-top: 48px;
  line-height: 32px;
}
.bottom-contain {
  padding: 80px 60px;
}
</style>

