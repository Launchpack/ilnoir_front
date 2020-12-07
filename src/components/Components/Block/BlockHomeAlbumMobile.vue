<template>
<div :style="pagePadding" style="padding-top:28px">  
<div :style="brandColor.white" class="text-center bold margin-bottom-20 size-20">Album</div>
    <!--<div class="flex-end full-width margin-bottom-12">-->
    <!--  <div class="flex-align">-->
    <!--    <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/57882497_thumb.png"-->
    <!--      :style="iconStyle" class="unselect" @click="$refs.slick.prev()">-->
          
    <!--    <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/11147045_thumb.png"-->
    <!--      :style="iconStyle" class="unselect" @click="$refs.slick.next()" style="margin-left:36px">-->
    <!--  </div>-->
    <!--</div>-->
    <div class="full-width">
      <slick ref="slick" v-if="reRender && list && list.length>0" :options="slickOptions">
        <card-album
          class="col-6"
          v-for="(item,idx) in list"
          :key="`card-${item.id}`"
          :card="item"
          :idx="idx"
          :style="cardStyle(idx)"
          ></card-album>
      </slick>
    </div>
</div>
</template>
<script>
import CardAlbum from "@/components/Components/Card/CardAlbum"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockHomeAlbumMobile',
  components: {
    CardAlbum
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": [],
      "title": "",
      "vDelay": false,
      "reRender": true,
      "iconStyle": {
        "width": "36px",
        "height": "36px"
      },
      "slickOptions": {
        "dots": false,
        "arrows": false,
        "autoplay": false,
        "infinite": true,
        "centerMode": false,
        "slidesToShow": 2,
        "autoplaySpeed": "",
        "centerPadding": "",
        "variableWidth": false,
        "slidesToScroll": 1
      },
      "exhibition_id": 1,
      "recmCurrentTitle": ""
    }
  },
  created() {
    this.getList();
  },
  mounted() {

  },
  
  methods: {
    getList() {
      this.$axios.get(`public/board/2/post`)
      .then(res => {
        this.list = res.data.data;
      })
    },
    reRenderSlick() {
      if(this.reRender === false) return;

      this.$nextTick(() => {
        this.reRender = false;
        setTimeout(() => {
          this.reRender = true;
          let currIndex = this.$refs.slick.currentSlide()

          this.$refs.slick.destroy()
          this.$nextTick(() => {
            this.$refs.slick.create()
            this.$refs.slick.goTo(currIndex, true)
          })
          this.vDelay = true;
          
        },500);
      });
     
    },
    cardStyle(idx) {
      let obj = {
        padding: '0 6px'
      };
      
      return obj;
    }
  },
  computed: {
    
  },
  watch: {
    list(n) {
      this.reRenderSlick();
    }
  }
}
</script>
<style scoped>
.slide-arrow {
    font-size: 24px;
    color: #000;
    background-color: #fff;
    border-radius: 4px;
    width: 48px;
    height: 24px;
  }
  .slide-arrow:hover {
    font-size: 24px;
    color: #bbb;
    background-color: #eee;
    border-radius: 4px;
    width: 48px;
    height: 24px;
  }
</style>

