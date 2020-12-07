<template>
<div class="flex-justify">
    <div v-if="detail" style="padding:60px 0" :style="[pcMaxWidth, brandColor.main]">
      <div class="size-25 weight-500 margin-bottom-14">{{ detail.title }}</div>
      
      <div class="flex-between size-15 margin-bottom-30">
        <div class="flex-align">
          <div :style="brandColor.brand" style="margin-right:10px">관리자</div>
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
    
        <e-editor style="color:white" :html="detail.content"></e-editor>
      </div>
      
      <div class="flex-end">
        <div class="btn-list unselect" @click="routerPush('training')">목록</div>
      </div>
    </div>
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockTrainingDetailPc',
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
    pcVideoHeight() {
        let hei;
        hei = Number(this.pcMaxWidth.width.slice(0,-2)) * 9/16;
        return hei;
      },
    contentStyle() {
      return {
        padding: '16px 14px',
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border,
        width: '100%',
      }
    },
    iframeStyle() {
      return {
            height: this.pcVideoHeight + 'px',
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
  .btn-list {
    font-size: 14px;
    text-align: center;
    width: 60px;
    height: 36px;
    line-height: 36px;
    border-radius: 8px;
  }
  .btn-list:hover {
    font-weight: 600;
  }
</style>
<style>
iframe {
    border: 0;
    margin: 20px 0;
  }
</style>
