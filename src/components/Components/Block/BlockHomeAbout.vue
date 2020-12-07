<template>
<div class="flex-justify" style="padding:40px 0">
  <div :style="pcMaxWidth">
    <div :style="brandColor.white" class="text-center bold margin-bottom-30" 
      style="font-size:48px">About Us</div>
    <div class="flex-end size-18 bold">
      <div class="col-4 unselect" style="padding:0 8px" @click="routerPush('staff')">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/40861977.png"
          :style="imgStyle" class="margin-bottom-12">
        <div class="flex-end" :style="brandColor.white">
          <div>감독 및 팀원 소개</div>
          <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/11147045_thumb.png"
            :style="iconStyle">
        </div>
      </div>
      
       <div class="col-4 unselect" style="padding:0 8px" @click="routerPush('info')">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/40861977.png"
          :style="imgStyle" class="margin-bottom-12">
        <div class="flex-end" :style="brandColor.white">
          <div>교육관 및 사회공헌활동</div>
          <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/11147045_thumb.png"
            :style="iconStyle">
        </div>
      </div>
    </div>
    
  </div>
</div>
</template>
<script>

export default {
  name: 'BlockHomeAbout',
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
        "color": "#CCCCCC",
        "width": "28px",
        "height": "28px",
        "objectFit": "cover",
        "marginLeft": "12px"
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


