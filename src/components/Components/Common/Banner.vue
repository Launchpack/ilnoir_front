<template>
  <div v-if="isShowing && (urlVideo&&urlVideo.length>0) || (lpVideo&&lpVideo.length>0) || (banner&&banner.length>0)"
    class="full-width" :style="[brandBgColor.main, containerStyle]" name="Banner">
    <div class="video-wrapper" v-if="urlVideo&&urlVideo.length>0" :style="[wrapperStyle]">
      <iframe :src="computedVideo" allow="autoplay;" 
        :style="$store.getters.device === 'pc' ? pcIframeStyle : iframeStyle"></iframe>
    </div>

    <div class="video-wrapper" v-if="lpVideo&&lpVideo.length>0" :style="[wrapperStyle]"
        style="background-color:white">
      <video :src="lpVideo[0].url"
        type="video/mp4"
        :height="$store.getters.device === 'pc' ? pcVideoHeight : bannerHeight"
        loop="true"
        muted="true"
        autoplay="true"
        playsinline
        :style="$store.getters.device === 'pc' ? pcVideoStyle : {}">
      </video>
    </div>

    <image-slider :listData="banner" :height="imgBannerHeight" v-if="banner&&banner.length>0"
                  :style="[imageSliderStyle]"
                  :useRatio="useRatio"
                  :imageRates="imageRates"
                  :autoplay="autoplay"
                  :autoplaySpeed="autoplaySpeed"
                  :slidesToScroll="slidesToScroll"
                  :slidesToShow="slidesToShow"></image-slider>
  </div>
</template>

<script>
  import BlockMixin from "@/components/Mixins/BlockMixin";
  import ImageSlider from "@/components/Components/List/ImageSlider";
  export default {
    name: "Banner",
    mixins: [
      BlockMixin
    ],
    props: {
      // custom height
      height: {
        type: Number,
        required: false
      },
      // custom width
      width: {
        type: Number,
        required: false
      },
      // custom ratio (cf. height = width * ${ratio})
      ratio: {
        type: Number,
        required: false
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      autoplaySpeed: {
        type: Number,
        default: 3000,
      },
      slidesToScroll: {
        type: Number,
        default: 1,
      },
      slidesToShow: {
        type: Number,
        default: 1,
      },
      bannerId: {
        type: Number,
        default: 0
      },
      containerStyle: {
        type: Object,
        required: false
      },
      useRatio: {
        type: Boolean,
        default: true
      },
    },
    components: {ImageSlider},
    data() {
      return {
        banner: [],
        bannerRatio: 0,
        imgBannerRatio: 0,
        bannerHeight: 200,
        imgBannerHeight: 200,
        lpVideo: [],
        urlVideo: [],
        screenWidth: window.innerWidth,
        isShowing: false,
        imageWidth: 0,
        imageRates: undefined
      }
    },
    created() {
      this.init()
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.setScreenWidth();
          this.bannerStyle();
          this.imgBannerStyle();
        });
      })
    },
    methods: {
      setScreenWidth() {
        this.screenWidth = window.innerWidth;
      },
      init() {
        this.deviceWidth = this.$store.getters.deviceWidth;
        this.getData();
      },
      getData() {
        let url = 'public/banner/list'
        if(this.bannerId !== 0) {
          this.getBanner(`public/banner/${this.bannerId}`);

        }else {
          if(this.$store.getters.device==='pc') {
            url += '/pc'
          }
          this.getBannerList(url);
        }
        
      },
      getBanner(url) {
        this.$axios.get(url).then(res=>{
          this.banner = [];
          this.lpVideo = [];

          let date = new Date().getTime();
          let start_date = new Date(res.data.start_date).getTime();
          let end_date = new Date(res.data.end_date).getTime();
          
          if (date > start_date || date < end_date) {
            this.isShowing = true;
          } else {
            this.isShowing = false;
          }

          // image banner
          if(res.data.type === 0) {
            for(let i=0; i<res.data.imgs.length; i++) {
              let img = res.data.imgs[i];
              this.banner.push({
                  url: img,
                  link: res.data.links[i]
              });
            }
            this.imgBannerRatio = res.data.pc ? res.data.ratio_pc : res.data.ratio;
            this.imgBannerStyle();
          }
          // video banner
          else if(res.data.type >= 1) {
            for(let i=0; i<res.data.imgs.length; i++) {
              let img = res.data.imgs[i];
              let video = res.data.type === 1 ? 'lpVideo' : 'urlVideo';
              this[video].push({
                  url: img,
                  link: res.data.links[i]
              });
            }
            this.bannerRatio = res.data.pc ? res.data.ratio_pc : res.data.ratio;
            this.bannerStyle();
          }
          
          setTimeout(() => {
            this.$emit('getBanner');
          }, 700);
        }).catch(()=>{
          setTimeout(() => {
            this.$emit('getBanner');
          }, 700);
        });
      },
      getBannerList(url) {
        this.$axios.get(url).then(res=>{
          if (res.data.start_date && res.data.end_date) {
            let date = new Date().getTime();
            let start_date = new Date(res.data.start_date).getTime();
            let end_date = new Date(res.data.end_date).getTime();
            
            if (date > start_date || date < end_date) {
              this.isShowing = true;
            } else {
              this.isShowing = false;
            }
          } else {
            this.isShowing = true;
          }

          if(res.data.length>0) {
            let imgBanner = res.data.filter(item => item.data[0].type===0);
            if(imgBanner.length>0) {
              this.imgBannerRatio = imgBanner[0].ratio;
              this.banner = imgBanner[0].data;
              this.imgBannerStyle();
            }
            let videoBanner = res.data.filter(item => item.data[0].type === 1 || item.data[0].type === 2);
            if(videoBanner.length>0) {
              this.bannerRatio = videoBanner[0].ratio;
              if (videoBanner[0].data[0].type === 1) this.lpVideo = videoBanner[0].data;
              else if (videoBanner[0].data[0].type === 2) this.urlVideo = videoBanner[0].data;
              this.bannerStyle();
            }

          }
          setTimeout(() => {
            this.$emit('getBanner');
          }, 700);
        }).catch(()=>{
          setTimeout(() => {
            this.$emit('getBanner');
          }, 700);
        });
      },
      bannerStyle() {
        let deviceWidth = '';
        /* PC */
        if(this.$store.getters.device==='pc') {
          deviceWidth = this.screenWidth;
          if (this.width) deviceWidth = this.width;

          // custon ratio
          if (this.ratio!==undefined) {
            this.bannerHeight = deviceWidth * this.ratio;
          }
          else {
            // 3:1
            if(this.bannerRatio===0) this.bannerHeight = deviceWidth * 1/3;
            // 4:1
            else if(this.bannerRatio===1) this.bannerHeight = deviceWidth * 1/4;
            // 5:1
            else if(this.bannerRatio===2) this.bannerHeight = deviceWidth * 1/5;
            // 8:1
            else if(this.bannerRatio===3) this.bannerHeight = deviceWidth * 1/8;
            // 1:1
            else if(this.bannerRatio===4) this.bannerHeight = deviceWidth;
          }
        }
        /* Mobile */
        else {
          deviceWidth = this.deviceWidth;
          if (this.width) deviceWidth = this.width;

          // custon ratio
          if (this.ratio!==undefined) {
            this.bannerHeight = deviceWidth * this.ratio;
          }
          else {
            // 4:3
            if(this.bannerRatio===0) this.bannerHeight = deviceWidth * 3/4;
            // 16:9
            else if(this.bannerRatio===1) this.bannerHeight = deviceWidth * 9/16;
            // 2.35:1
            else if(this.bannerRatio===2) this.bannerHeight = deviceWidth * 1/2.35;
            // 4:1
            else if(this.bannerRatio===3) this.bannerHeight = deviceWidth * 1/4;
            // 1:1
            else if(this.bannerRatio===5) this.bannerHeight = deviceWidth;
          }
        }
        if (this.height) {
          this.bannerHeight = this.height;
        }
      },
      imgBannerStyle() {
        let deviceWidth = '';
        /* PC */
        if(this.$store.getters.device==='pc') {
          deviceWidth = this.screenWidth;
          if (this.width) deviceWidth = this.width;

          this.imageWidth = deviceWidth;

          // custom ratio
          if (this.ratio!==undefined) {
            this.imgBannerHeight = deviceWidth * this.ratio;
          }
          else {
            // 3:1
            if(this.imgBannerRatio===0) {
              this.imgBannerHeight = deviceWidth * 1/3;
              this.imageRates = {ratio: '3:1'}
            }
            // 4:1
            else if(this.imgBannerRatio===1) {
              this.imgBannerHeight = deviceWidth * 1/4;
              this.imageRates = {ratio: '4:1'}
            }
            // 5:1
            else if(this.imgBannerRatio===2) {
              this.imgBannerHeight = deviceWidth * 1/5;
              this.imageRates = {ratio: '5:1'}
            }
            // 8:1
            else if(this.imgBannerRatio===3) {
              this.imgBannerHeight = deviceWidth * 1/8;
              this.imageRates = {ratio: '8:1'}
            }
            // 1:1
            else if(this.imgBannerRatio===4) {
              this.imgBannerHeight = deviceWidth;
              this.imageRates = {ratio: '1:1'}
            }
          }
        }
        /* Mobile */
        else {
          deviceWidth = this.deviceWidth;
          if (this.width) deviceWidth = this.width;

          this.imageWidth = deviceWidth;

          // custom ratio
          if (this.ratio!==undefined) {
            this.imgBannerHeight = deviceWidth * this.ratio;
          }
          else {
            // 4:3
            if(this.imgBannerRatio===0) {
              this.imgBannerHeight = deviceWidth * 3/4;
              this.imageRates = {ratio: '4:3'}
            }
            // 16:9
            else if(this.imgBannerRatio===1) {
              this.imgBannerHeight = deviceWidth * 9/16;
              this.imageRates = {ratio: '16:9'}
            }
            // 2.35:1
            else if(this.imgBannerRatio===2) {
              this.imgBannerHeight = deviceWidth * 1/2.35;
              this.imageRates = {ratio: '2.35:1'}
            }
            // 4:1
            else if(this.imgBannerRatio===3) {
              this.imgBannerHeight = deviceWidth * 1/4;
              this.imageRates = {ratio: '4:1'}
            }
            // 1:1
            else if(this.imgBannerRatio===5) {
              this.imgBannerHeight = deviceWidth;
              this.imageRates = {ratio: '1:1'}
            }
          }
        }
        if (this.height) {
          this.imgBannerHeight = this.height;
        }
      }
    },
    computed: {
      imageSliderStyle() {
        let deco = {
          width: `${this.imageWidth}px`,
          height: `${this.imgBannerHeight}px`
        }
        return deco;
      },
      pcVideoHeight() {
        let hei;
        hei = this.screenWidth * 9/16;
        return hei;
      },
      computedVideo() {
        let url = this.urlVideo[0].url;
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

      },
      iframeStyle() {
        return {
          height: `${this.bannerHeight}px`,
        }
      },
      pcIframeStyle() {
        if(this.bannerHeight>=this.pcVideoHeight) {
          return {
            height: this.pcVideoHeight + 'px',
            width: '100%',
            top: '-50%',
            position: 'absolute'
          }
        }
        else {
          return {
            height: this.pcVideoHeight + 'px',
            width: '100%',
            top: `-${(this.pcVideoHeight - this.bannerHeight) / 2}px`,
            position: 'absolute'
          }
        }
      },
      pcVideoStyle() {
        if(this.bannerHeight>=this.pcVideoHeight) {
          return {
            width: '100%',
            top: '-50%',
            position: 'absolute'
          }
        }
        else {
          return {
            width: '100%',
            top: `-${(this.pcVideoHeight - this.bannerHeight) / 2}px`,
            position: 'absolute'
          }
        }
      },
      wrapperStyle() {
        return {
          paddingBottom: `${this.bannerHeight}px`,
          height: this.bannerHeight+'px',
          overflow: 'hidden',
        }
      }
    },
    watch: {
      bannerId(n) {
        this.banner = [];
        this.lpVideo = [];
        this.urlVideo = [];
        this.init();
      }
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
    pointer-events: none;
  }
</style>