<template>
<div class="flex-justify">
    <div v-if="detail" :style="pcMaxWidth">
      <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
      <div :style="brandColor.main" style="margin-top: 32px; margin-bottom:16px">
        <div class="size-20 weight-500 margin-bottom-10">{{ detail.title }}</div>
        <div class="size-12 weight-500 col-2" style="padding:4px 8px;text-align:center;border-radius:4px" 
          :style="brandBgColor.white">{{ detail.start_date }} ~ {{ detail.end_date }}</div>
      </div>
      
      <!--<div style="width:100%;height:80px;text-align:center;line-height:80px" -->
      <!--  :style="brandBgColor.white">이벤트에 파트너 정보</div>-->
        
      <div style="margin-bottom:100px; border-radius:16px; padding:16px; width:66%" 
        :style="[brandBgColor.white, brandColor.main]" class="size-14 full-width">
        <e-editor :html="detail.content"></e-editor>
      </div>
      
      <div class="position-fixed" :style="fixStyles">
        <div :style="iconWrapStyle" class="flex-center unselect margin-bottom-8"
          @click="clickUp">
          <i class="material-icons">keyboard_arrow_up</i>
        </div>
        <div :style="iconWrapStyle" class="flex-center unselect"
          @click="clickDown">
          <i class="material-icons">keyboard_arrow_down</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockEventDetailPc',
  components: {
    BreadCrumbPc
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "detail": undefined,
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "name": "이벤트"
        }
      ],
      "layoutWidth": undefined
    }
  },
  created() {
    this.getMaxWidth();
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    getMaxWidth() {
      this.$axios.get('public/ui/brand/admin').then(res => {
        this.layoutWidth = res.data.layout_maxwidth;
      })
    },
    getData() {
      this.$axios.get(`public/board/event/${this.$route.query.id}`)
      .then(res => {
        this.detail = res.data;
      })
    },
    clickUp() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    },
    clickDown() {
      document.documentElement.scrollTop = document.body.scrollHeight;
    }
  },
  computed: {
    fixStyles() {
      return {
        width: '320px',
        top: 'calc(70%)',
        left: `calc(50% + ${this.layoutWidth * 16 / 100}px + 16px)`
      }
    },
    iconWrapStyle() {
      return {
        width: '32px',
        height: '32px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.24)'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
</style>

