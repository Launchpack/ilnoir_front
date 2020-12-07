<template>
<div :style="pagePadding">
    <div class="size-20 text-center bold" :style="[titleStyle, brandColor.brand]">그릿12 훈련 프로그램 상세</div>
    
    <div class="bold size-25 text-center" :style="brandColor.primary"
      style="padding:20px 0 8px">프로그램</div>
      
      <div class="flex-justify" style="padding:16px 0">
        <div :style="imgStyle" class="position-relative">
          <div class="position-absolute flex-center dim-txt">
            <div>
              <div class="size-30 bold">Elite</div>
              <div class="size-14">엘리트반</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="size-12 text" :style="brandColor.main">
        축구선수 육성을 위한 수업으로 체계적인 훈련 프로그램을 바탕으로 수업을 진행합니다. 
          수강생 개개인으니 역량과 재능을 분석하여 포지션에 맞는 훈련지도와 멘토링을 겸하고 있습니다.
      </div>
      
      <div class="flex-justify" style="padding:16px 0">
        <div :style="imgStyle" class="position-relative">
          <div class="position-absolute flex-center dim-txt">
            <div>
              <div class="size-30 bold">Go Grit</div>
              <div class="size-14">취미반</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="size-12 text" :style="brandColor.main">
        축구선수 육성을 위한 수업으로 체계적인 훈련 프로그램을 바탕으로 수업을 진행합니다. 
          수강생 개개인으니 역량과 재능을 분석하여 포지션에 맞는 훈련지도와 멘토링을 겸하고 있습니다.
      </div>
      
      <div class="flex-justify" style="padding:16px 0">
        <div :style="imgStyle" class="position-relative">
          <div class="position-absolute flex-center dim-txt">
            <div>
              <div class="size-30 bold">Partnership</div>
              <div class="size-14">사회공헌</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="size-12 text" :style="brandColor.main">
        축구선수 육성을 위한 수업으로 체계적인 훈련 프로그램을 바탕으로 수업을 진행합니다. 
          수강생 개개인으니 역량과 재능을 분석하여 포지션에 맞는 훈련지도와 멘토링을 겸하고 있습니다.
      </div>
      
      <div class="flex-justify" style="padding:16px 0">
        <div :style="imgStyle" class="position-relative">
          <div class="position-absolute flex-center dim-txt">
            <div>
              <div class="size-30 bold">Adult</div>
              <div class="size-14">성인반</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="size-12 text" :style="brandColor.main">
        축구선수 육성을 위한 수업으로 체계적인 훈련 프로그램을 바탕으로 수업을 진행합니다. 
          수강생 개개인으니 역량과 재능을 분석하여 포지션에 맞는 훈련지도와 멘토링을 겸하고 있습니다.
      </div>
    
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockProgram',
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
        padding: '28px 0',
        borderBottom: this.brandBorder.main.border
      }
    },
    imgStyle() {
      return {
        width: '200px',
        height: '200px',
        backgroundImage: `url('https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/38918798_thumb.png')`,
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: '-5px'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.box {
  margin-top: 48px;
  line-height: 32px;
}
.dim-txt {
  width: 200px;
  height: 200px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
  color: white;
  text-align: center;
}
.text {
  line-height: 22px;
}
</style>

