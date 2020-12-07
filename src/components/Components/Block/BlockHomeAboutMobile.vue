<template>
<div :style="pagePadding" style="padding-top:60px">
    <div :style="brandColor.white" class="text-center bold margin-bottom-20 size-20">About Us</div>
    <div class="flex-align size-12 bold">
      <div class="col-6 unselect" style="padding-right:8px" @click="routerPush('staff')">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/40861977.png"
          :style="imgStyle" class="margin-bottom-8">
        <div class="flex-end" :style="brandColor.white">
          <div>감독 및 팀원 소개</div>
          <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/11147045_thumb.png"
            :style="iconStyle">
        </div>
      </div>
      
       <div class="col-6 unselect" style="padding-left:8px" @click="routerPush('info')">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/40861977.png"
          :style="imgStyle" class="margin-bottom-8">
        <div class="flex-end" :style="brandColor.white">
          <div>교육관 및 사회공헌활동</div>
          <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/11147045_thumb.png"
            :style="iconStyle">
        </div>
      </div>
    </div>
    
</div>
</template>
<script>

export default {
  name: 'BlockHomeAboutMobile',
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
        "width": "16px",
        "height": "16px",
        "objectFit": "cover",
        "fontWeight": "bold",
        "marginLeft": "8px"
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


