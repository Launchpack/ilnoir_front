<template>
<div class="full-width" :style="[brandBgColor.main, containerStyle]" name="Banner">
  <slick :options="slickOptions" ref="slick"
    v-if="reRender"
    @afterChange="handleAfterChange">
    <div v-for="(item,idx) in banner" :key="'img-'+idx">
      <img :src="item.url" :style="imgStyle">
    </div>
  </slick>
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockBannerMobile',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "banner": [],
      "reRender": true,
      "imgHeight": "100%"
    }
  },
  created() {
      this.init()
    },
  mounted() {
    this.$nextTick(()=>{
      this.imgHeight = window.innerWidth * 0.55 + 'px';
    });
  },
  
  methods: {
    reRenderSlick() {
      if(this.reRender === false) return;
      this.reRender = false;
      this.$nextTick(() => {
        this.reRender = true;
      });
    },
    handleAfterChange(event, slick, currentSlide) {
        this.currentSlide = currentSlide;
      },
    setScreenWidth() {
        this.screenWidth = window.innerWidth;
      },
    init() {
        this.getData();
      },
    getData() {
        let url = 'public/banner/list'
        if(this.bannerId !== 0) {
          this.getBanner(`public/banner/1`);

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
        }
        
        this.reRenderSlick();
        this.$emit('getBanner');
      }).catch(()=>{
        setTimeout(() => {
          
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
          }

        }
        this.reRenderSlick();
        this.$emit('getBanner');
      }).catch(()=>{
        this.$emit('getBanner');
      });
    }
  },
  computed: {
    containerStyle() {
      return {
        height: `${this.imgHeight}px`,
      }
    },
    imgStyle() {
      return {
        width: '100%',
        // height: this.imgHeight,
        objectFit: 'cover'
      }
    },
    slickOptions() {
        return {
          infinite: true,
          variableWidth: false,
          centerPadding: '',
          centerMode: false,
          autoplay: true,
          arrows: false,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        }
      }
  },
  watch: {
    
  }
}
</script>


