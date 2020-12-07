<template>
<div v-if="detail" :style="[pagePadding, brandColor.main]"
      style="padding-top:40px">
      <div class="size-20 bold margin-bottom-6">{{ detail.title }}</div>
      
      <div class="flex-between size-12 margin-bottom-10">
        <div class="flex-align">
          <div :style="brandColor.brand" style="margin-right:10px"
            class="bold">관리자</div>
          <div :style="brandColor.main">{{ detail.created_time }}</div>
        </div>
        <div class="flex-align">
          <div style="margin-right:6px">조회수</div>
          <div>{{ detail.hits }}</div>
        </div>
      </div>
      <div :style="contentStyle" class="margin-bottom-16">
        <img :src="detail.img" :style="imgStyle">
        
        <div v-if="detail&&detail.video.indexOf('youtu')>-1">
          <iframe :src="computedVideo" allow="autoplay;"
            :style="iframeStyle"></iframe>
          <!--<object type="text/html" :style="iframeStyle" :data="computedVideo" allowFullScreen></object> -->
        </div>
        

    <div class="video-wrapper" v-else
        style="background-color:white">
      <video :src="detail.video"
        type="video/mp4"
        :height="200"
        loop="true"
        muted="true"
        autoplay="true"
        >
      </video>
    </div>
    
        <e-editor :html="detail.content"></e-editor>
      </div>
      
      <div class="flex-end">
        <div :style="btnStyle" @click="routerPush('training')">목록</div>
      </div>
    </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockTrainingDetail',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "detail": undefined,
      "imgStyle": {
        "width": "100%",
        "objectFit": "cover"
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.$axios.get(`public/board/${this.$route.query.board}/post/${this.$route.query.id}`)
      .then(res => {
        this.detail = res.data;
      })
    }
  },
  computed: {
    videoHeight() {
        let hei;
        hei = window.innerWidth * 9/16;
        return hei;
      },
    contentStyle() {
      return {
        padding: '16px 0 0',
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border,
        width: '100%',
      }
    },
    btnStyle() {
      return {
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
        borderRadius: '8px',
        width: '112px',
        height: '48px',
        lineHeight: '48px',
        cursor: 'pointer'
      }
    },
    iframeStyle() {
      return {
            height: this.videoHeight + 'px',
            width: '100%',
            top: '-50%',
          }
    },
    computedVideo() {
        let url = this.detail.video;
        // 유튜브
        if(url.indexOf('youtube')>-1) {
          if(url.indexOf('v=')>-1) {
            let leng = url.split('=').length;
            return "https://www.youtube.com/embed/" + url.split('=')[leng-1] + 
              `?autoplay=1&controls=0&mute=1&modestbranding=1&rel=0&loop=1;playlist=${url.split('=')[leng-1]}`;
          }
          else {
            let leng = url.split('/').length;
            return "https://www.youtube.com/embed/" + url.split('/')[leng-1];
          }
        }

        if(url.indexOf('youtu.be')>-1) {
          let leng = url.split('/').length;
          return "https://www.youtube.com/embed/" + url.split('/')[leng-1] + 
            `?autoplay=1&controls=0&mute=1&modestbranding=1&rel=0&loop=1;playlist=${url.split('/')[leng-1]}`;
        }

      }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.video-wrapper {
    position: relative;
    height: 0;
    margin-bottom: 2px;
  }
  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    
  }
</style>

