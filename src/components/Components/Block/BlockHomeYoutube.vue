<template>
<div class="flex-justify" style="padding:40px 0">
  <div :style="pcMaxWidth">
    <div :style="brandColor.white" class="text-center bold margin-bottom-30" 
      style="font-size:48px">Youtube</div>
    <div class="flex-justify">
      <div class="position-relative col-10 unselect">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/16807256.png"
        :style="imgStyle">
        
        <div class="back-ground position-absolute">
          <div class="position-relative full-width full-height">
            <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/12371331_thumb.png"
              :style="iconStyle" class="position-absolute">
            <div class="text-center size-40 text position-absolute bold" 
              :style="brandColor.white">
              그릿 12의 실시간<br> 훈련 동영상
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'BlockHomeYoutube',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "imgStyle": {
        "width": "100%",
        "objectFit": "cover"
      },
      "iconStyle": {
        "top": "50%",
        "left": "50%",
        "width": "140px",
        "height": "140px",
        "transform": "translate(-50%,-50%)"
      }
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
.back-ground {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  top: 0;
  left: 0;
}
.text {
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
}
</style>

