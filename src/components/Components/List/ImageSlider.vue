<template>
  <div class="image-slider-container">
    <div class="flex position-relative" style="height: 100%">

      <!-- 왼쪽 화살표 -->
      <i v-if="arrow && listData.length > 1"
         class="slider-arrow material-icons unselect"
         :style="arrowLeftComputedStyle"
         @click="$refs.slick.prev()">keyboard_arrow_left</i>

      <!-- 슬라이드 리스트 -->

      <div style="overflow: hidden; flex:1"
           ref="cardlist">

        <transition name="fade">
          <slick ref="slick"
                 v-if="reRender"
                 @afterChange="handleAfterChange"
                 :options="slickOptions">

            <!-- 카드뷰 -->
            <div v-for="(item,idx) in listData" :key="'img-slider-'+idx">

              <div v-if="item.link && item.link !== ''" @click="getHref(item.link)">
                <e-image :useRatio="useRatio" :img="item.url ? item.url : item"
                  :width="imgWidth" :height="height"
                  :imageRates="imageRates"
                  :isBg="true" :isLazy="false" style="margin-bottom: -5px"></e-image>
              </div>

              <div v-else>
                <e-image :useRatio="useRatio" :img="item.url ? item.url : item"
                  :width="imgWidth" :height="height"
                  :imageRates="imageRates"
                  :isBg="true" :isLazy="false" style="margin-bottom: -5px"></e-image>
              </div>
            </div>
          </slick>
        </transition>

        <!-- Indicator -->
        <div class="indicator-container" v-if="indicator && listData.length > 1">
          <div class="indicator-wrapper">
            <div v-for="i in Array.from({length:listData.length}, (v,k) => k)" :key="'ic'+i" @click="$refs.slick.goTo(i)">
              <div v-if="i === currentSlide" :style="currentIndicatorStyle"></div>
              <div v-else :style="indicatorStyle"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 화살표 -->
      <i v-if="arrow && listData.length > 1"
         class="slider-arrow material-icons unselect"
         :style="arrowRightComputedStyle"
         @click="$refs.slick.next()">keyboard_arrow_right</i>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'ImageSlider',
    components: {

    },
    mixins: [

    ],
    props: {
      arrow: {
        type: Boolean,
        default: false,
      },
      height: {
        type: Number,
        required: false,
        default: 60
      },
      autoplay: {
        type: Boolean,
        default: false,
      },
      imageRates: {
        type: Object,
        default: () => {
          return {
            ratio: '4:3'
          }
        }
      },
      listData: {
        type: Array,
        required: true,
      },
      indicator: {
        type: Boolean,
        default: false,
      },
      useRatio: {
        type: Boolean,
        default: true
      },
      slidesToShow: {
        type: Number,
        default: 1,
      },
      autoplaySpeed: {
        type: Number,
        default: 3000,
      },
      slidesToScroll: {
        type: Number,
        default: 1,
      },
      arrowLeftStyle: {
        type: Object,
        required: false
      },
      arrowRightStyle: {
        type: Object,
        required: false
      },

    },
    data() {
      return {
        "reRender": true,
        "currentSlide": 0,
        imgWidth: 0
      }
    },
    mounted() {
      this.reRenderSlick();
    },
    activated() {
      this.reRenderSlick();
    },
    methods: {
      reRenderSlick() {
        if (this.reRender === false) return;

        this.reRender = false;
        this.$nextTick(() => {
          this.reRender = true;
          this.imgWidth = this.$refs.cardlist.clientWidth;
          setTimeout(() => {
            let currIndex = this.$refs.slick.currentSlide();
            this.$refs.slick.destroy();
            this.$nextTick(() => {
              this.$refs.slick.create();
              this.$refs.slick.goTo(currIndex, true)
            })
          }, 500);
        });
      },
      computedUrl(item) {
        if (item.url) return item.url;
        else return item;
      },
      getHref(link, ) {
        location.target = (link.indexOf('http:')>-1 || link.indexOf('https:')>-1) ? '_blank' : '';
        location.href = link;
      },
      getTarget(link, ) {
        return (link.indexOf('http:')>-1 || link.indexOf('https:')>-1) ? '_blank' : '';
      },
      handleAfterChange(event, slick, currentSlide, ) {
        this.currentSlide = currentSlide;
      },
      imgStyle(img, ) {
        let height = '60px';
        if(this.height)
          height = this.height + 'px';

        return {
          width: '100%',
          height: height,
          // lazy background-image 적용
          backgroundImage: `url(${img.url ? img.url : img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          marginBottom: '-5px'
        }
      }
    },
    computed: {
      currentIndicatorStyle() {
        return {
          width: '8px',
          height: '8px',
          borderRadius: '100%',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          marginRight: '4px'
        };
      },
      indicatorStyle() {
        return {
          width: '8px',
          height: '8px',
          borderRadius: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          marginRight: '4px'
        };
      },
      slickOptions() {
        return {
          infinite: true,
          variableWidth: false,
          centerPadding: '',
          centerMode: false,
          autoplay: this.autoplay,
          arrows: false,
          dots: false,
          slidesToShow: this.slidesToShow,
          slidesToScroll: this.slidesToScroll,
          autoplaySpeed: this.autoplaySpeed,
        }
      },
      arrowLeftComputedStyle() {
        if (this.arrowLeftStyle) return this.arrowLeftStyle;
        else {
          return {
            height: '24px',
            fontSize: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: 'calc(50% - 12px)',
            color: 'white',
            left: '8px'
          }
        }
      },

      arrowRightComputedStyle() {
        if (this.arrowRightStyle) return this.arrowRightStyle;
        else {
          return {
            height: '24px',
            fontSize: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: 'calc(50% - 12px)',
            color: 'white',
            right: '8px'
          }
        }
      },
    },
    watch: {

    }
  }
</script>
<style scoped>
  .cg-list-image-slider-container {
    position: relative;
    width: 100%;
  }
  .slider-arrow {
    position: absolute;
    z-index: 1;
  }

  .indicator-container {
    position: absolute;
    width: 100%;
    bottom: 16px;
  }
  .indicator-wrapper {
    display: flex;
    justify-content: center;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter {
    opacity: 0;
  }

</style>
