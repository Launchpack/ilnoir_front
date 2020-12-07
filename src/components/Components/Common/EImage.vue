<template>
  <div v-if="isBg && isLazy" v-lazy:background-image="imgSrc" :key="uid" :style="bgStyle">
    <slot name="inner"></slot>
  </div>
  <div v-else-if="isBg" :key="uid" :style="bgStyle">
    <slot name="inner"></slot>
  </div>
  <div v-else-if="isLazy" :style="imgWrapperStyle">
    <img v-if="imgSrc !== ''" v-lazy="imgSrc"
      :key="uid" :style="imgStyle" :alt="alt" :data-object-fit="objectFit" />
  </div>
  <div v-else :style="imgWrapperStyle">
    <img v-if="imgSrc !== ''" :key="uid" :style="imgStyle" :src="imgSrc" :alt="alt" :data-object-fit="objectFit" />
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import objectFitImages from 'object-fit-images'

export default {
  props: {
    isLazy: {
      type: Boolean,
      default: true,
    },
    isBg: {
      type: Boolean,
      default: false
    },
    bgOption: {
      type: String
    },
    useThumb: {
      type: Boolean
    },
    img: {
      type: String
    },
    imageRates: {
      type: Object,
      required: true
    },
    category: {
      type: Number
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    useRatio: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      alt: '',
      ratio: '',
      imgSrc: '',
      uid: ''
    }
  },
  created() {
    this.uid = uuidv4();
  },
  mounted() {
    this.$nextTick(() => {
      if (this.useRatio) {
        this.setRatio();
      }
      this.setImage();
      this.setAlt();

      objectFitImages();
    })
  },
  methods: {
    setImage() {
      let img = '';
      if (this.img === this.dummyImage.bg) {
        img = this.img;
      } else if (this.useThumb) {
        let imageSrc = this.img;
        let temp = imageSrc.split('.');
        if (temp[0].split('//')[1] === "launchpack-storage") {
          temp[temp.length - 2] = `${temp[temp.length - 2]}_thumb`;
          img = temp.join('.');
        } else {
          img = this.img;
        }
      } else {
        img = this.img;
      }
      // IE, Mac OS 10.15까지의 safari 브라우저를 제외한 나머지 브라우저 .webp로 이미지 전환
      if(navigator.userAgent.indexOf('Trident')===-1 && navigator.userAgent.indexOf('Mac OS X')===-1) {
        img = img.replace('.jpg', '.webp').replace('.jpeg', '.webp').replace('.png', '.webp').replace('.JPG', '.webp').replace('.JPEG', '.webp').replace('.PNG', '.webp');
      }
      this.imgSrc = img;
    },
    setAlt() {
      this.$axios.get(`https://ig7m3u7il7.execute-api.ap-northeast-2.amazonaws.com/v1/save_img_text?path=${this.img}`, {headers: ''}).then(res=>{
        this.alt = res.data;
      });
    },
    setRatio() {
      this.ratio = this.imageRates.ratio;

      if (this.imageRates.exception && this.imageRates.exception.length !== 0) {
        this.imageRates.exception.forEach(item => {
          if (item.category === this.category) {
            this.ratio = item.ratio;
          }
        })
      }
    },
    
  },
  computed: {
    imgWrapperStyle() {
      let deco = {
        width: '',
        height: '',
        minHeight: '',
        overflow: 'hidden'
      }

      if (this.$store.getters.device === 'pc') {
        deco.width = `${window.innerWidth}px`;
      } else {
        deco.width = `${this.$store.getters.deviceWidth}px`;
      }
      if (this.width) {
        if (typeof this.width === "string") {
          deco.width = this.width;
        } else {
          deco.width = `${this.width}px`;
        }
      }
      if (this.useRatio) {
        switch(this.ratio) {
          case '1:1':
            deco.height = deco.width;
            break;
          case '2.35:1':
            deco.height = `calc(${deco.width} * 1/2.35)`;
            break;
          case '3:1':
            deco.height = `calc(${deco.width} * 1/3)`;
            break;
          case '3:2':
            deco.height = `calc(${deco.width} * 2/3)`;
            break;
          case '3:4':
            deco.height = `calc(${deco.width} * 4/3)`;
            break;
          case '4:1':
            deco.height = `calc(${deco.width} * 1/4)`;
            break;
          case '4:3':
            deco.height = `calc(${deco.width} * 3/4)`;
            break;
          case '5:1':
            deco.height = `calc(${deco.width} * 1/5)`;
            break;
          case '8:1':
            deco.height = `calc(${deco.width} * 1/8)`;
            break;
          case '16:9':
            deco.height = `calc(${deco.width} * 9/16)`;
            break;
          default:
            deco.height = deco.width;
            break;
        }
      } else {
        if (this.height) {
          if (typeof this.height === "string") {
            deco.height = this.height;
          } else {
            deco.height = `${this.height}px`;
          }
        } else {
          deco.height = '100px';
        }
      }
      
      deco.minHeight = deco.height;
      return deco;
    },
    imgStyle() {
      let deco = {
        width: '',
        height: '',
        minHeight: '',
        objectFit: this.objectFit,
        fontFamily: `object-fit: ${this.objectFit}`
      }

      if (this.$store.getters.device === 'pc') {
        deco.width = `${window.innerWidth}px`;
      } else {
        deco.width = `${this.$store.getters.deviceWidth}px`;
      }
      if (this.width) {
        if (typeof this.width === "string") {
          deco.width = this.width;
        } else {
          deco.width = `${this.width}px`;
        }
      }

      if (this.useRatio) {
        switch(this.ratio) {
          case '1:1':
            deco.height = deco.width;
            break;
          case '2.35:1':
            deco.height = `calc(${deco.width} * 1/2.35)`;
            break;
          case '3:1':
            deco.height = `calc(${deco.width} * 1/3)`;
            break;
          case '3:2':
            deco.height = `calc(${deco.width} * 2/3)`;
            break;
          case '3:4':
            deco.height = `calc(${deco.width} * 4/3)`;
            break;
          case '4:1':
            deco.height = `calc(${deco.width} * 1/4)`;
            break;
          case '4:3':
            deco.height = `calc(${deco.width} * 3/4)`;
            break;
          case '5:1':
            deco.height = `calc(${deco.width} * 1/5)`;
            break;
          case '8:1':
            deco.height = `calc(${deco.width} * 1/8)`;
            break;
          case '16:9':
            deco.height = `calc(${deco.width} * 9/16)`;
            break;
          default:
            deco.height = deco.width;
            break;
        }
      } else {
        if (this.height) {
          if (typeof this.height === "string") {
            deco.height = this.height;
          } else {
            deco.height = `${this.height}px`;
          }
        } else {
          deco.height = '100px';
        }
      }
      
      deco.minHeight = deco.height;
      return deco;
    },
    bgStyle() {
      let deco = {
        width: '',
        height: '',
        minHeight: '',
        backgroundImage: `url(${this.imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }

      if (!this.isLazy && this.bgOption) {
        deco.backgroundImage = `${this.bgOption}, url(${this.imgSrc})`
      }

      if (this.$store.getters.device === 'pc') {
        deco.width = `${window.innerWidth}px`;
      } else {
        deco.width = `${this.$store.getters.deviceWidth}px`;
      }
      if (this.width) {
        if (typeof this.width === "string") {
          deco.width = this.width;
        } else {
          deco.width = `${this.width}px`;
        }
      }
      if (this.useRatio) {
        switch(this.ratio) {
          case '1:1':
            deco.height = deco.width;
            break;
          case '2.35:1':
            deco.height = `calc(${deco.width} * 1/2.35)`;
            break;
          case '3:1':
            deco.height = `calc(${deco.width} * 1/3)`;
            break;
          case '3:2':
            deco.height = `calc(${deco.width} * 2/3)`;
            break;
          case '3:4':
            deco.height = `calc(${deco.width} * 4/3)`;
            break;
          case '4:1':
            deco.height = `calc(${deco.width} * 1/4)`;
            break;
          case '4:3':
            deco.height = `calc(${deco.width} * 3/4)`;
            break;
          case '5:1':
            deco.height = `calc(${deco.width} * 1/5)`;
            break;
          case '8:1':
            deco.height = `calc(${deco.width} * 1/8)`;
            break;
          case '16:9':
            deco.height = `calc(${deco.width} * 9/16)`;
            break;
          default:
            deco.height = deco.width;
            break;
        }
      } else {
        if (this.height) {
          if (typeof this.height === "string") {
            deco.height = this.height;
          } else {
            deco.height = `${this.height}px`;
          }
        } else {
          deco.height = '100px';
        }
      }
      
      deco.minHeight = deco.height;
      return deco;
    }
  },
  watch: {
    img(n, o) {
      this.img = n;
      this.setImage();
    }
  }
}
</script>

<style>

</style>