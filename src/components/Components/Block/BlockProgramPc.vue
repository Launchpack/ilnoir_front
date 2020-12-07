<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <div class="size-40 text-center bold" :style="[titleStyle, brandColor.brand]">그릿12 훈련 프로그램 상세</div>
    
    <div class="bold title text-center" :style="brandColor.primary"
      style="transform:translateX(-28px);padding:60px 0 20px">프로그램</div>
    <div class="flex-justify">
      <div class="flex-center">
        <div class="circle text-center flex-center"
          :style="brandColor.white">
          <div>
            <div class="size-32 bold">Elite</div>
            <div class="size-14">엘리트반</div>
          </div>
        </div>
        <div class="circle text-center flex-center"
          :style="brandColor.white" style="transform:translateX(-28px)">
          <div>
            <div class="size-32 bold">Go Grit</div>
            <div class="size-14">취미반</div>
          </div>
        </div>
        <div class="circle text-center flex-center"
          :style="brandColor.white" style="transform:translateX(-56px)">
          <div>
            <div class="size-24 bold margin-bottom-6">Partnership</div>
            <div class="size-14">사회공헌</div>
          </div>
        </div>
        <div class="circle text-center flex-center"
          :style="brandColor.white" style="transform:translateX(-84px)">
          <div>
            <div class="size-32 bold">Adult</div>
            <div class="size-14">성인반</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid-box size-21 box" style="margin-top:120px">
      <div class="col-6">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/38918798.png" class="img">
      </div>
      
      <div class="col-6 text-contain">
        <div class="flex margin-bottom-30" :style="brandColor.brand">
          <div class="title bold" style="margin-right:12px">Elite</div>
          <div class="size-28">엘리트반</div>
        </div>
        
        <div class="size-21" :style="brandColor.main">
          축구선수 육성을 위한 수업으로 체계적인 훈련 프로그램을 바탕으로 수업을 진행합니다. 
          수강생 개개인으니 역량과 재능을 분석하여 포지션에 맞는 훈련지도와 멘토링을 겸하고 있습니다.
        </div>
      </div>
    </div>
    
    <div class="grid-box size-21 box">
      <div class="col-6 text-contain">
        <div class="flex margin-bottom-30" :style="brandColor.primary">
          <div class="title bold" style="margin-right:12px">Go Grit</div>
          <div class="size-28">취미반</div>
        </div>
        
        <div class="size-21" :style="brandColor.main">
          기본기 및 팀플레이 향상에 초점을 맞춘 수업입니다. 매주 개개인 역량에 맞춘 트레이닝으로 수업을 진행합니다.
        </div>
      </div>
      <div class="col-6">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/38918798.png" class="img">
      </div>
    </div>
    
    <div class="grid-box size-21 box">
      <div class="col-6">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/38918798.png" class="img">
      </div>
      <div class="col-6 text-contain">
        <div class="flex margin-bottom-30" :style="brandColor.brand">
          <div class="title bold" style="margin-right:12px">Partnership</div>
          <div class="size-28">사회공헌</div>
        </div>
        
        <div class="size-21" :style="brandColor.main">
          '스포츠를 통해 건강한 미래를 만듭니다'라는 사명 아래 스포츠 교육이 필요한 아동을 대상으로 
          그릿12 수업을 유/무상으로 진행합니다. 현재 지역아동센터를 비롯한 기관과 
          MOU를 맺어 사회공헌 활동을 하고 있습니다.
        </div>
      </div>
    </div>
    
    <div class="grid-box size-21 box">
      <div class="col-6 text-contain">
        <div class="flex margin-bottom-30" :style="brandColor.primary">
          <div class="title bold" style="margin-right:12px">Adult</div>
          <div class="size-28">사회공헌</div>
        </div>
        
        <div class="size-21" :style="brandColor.main">
          일반 성인을 대상으로 진행하는 축구 수업입니다. 수강생 니즈에 맞춰 수업을 코디네이터합니다.
        </div>
      </div>
      <div class="col-6">
      <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/38918798.png" class="img">
      </div>
    </div>
    
  </div>
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockProgramPc',
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
  padding: 44px 20px 0 20px;
}
.box {
  margin-top: 48px;
  line-height: 32px;
}
.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #095540;
  border: 9px solid #0C0C23;
}
.title {
  font-size: 50px;
}
</style>

