<template>
<div class="full-width" style="padding:40px 0">  
<div :style="brandColor.white" class="text-center bold margin-bottom-12" 
      style="font-size:48px">Album</div>
<div class="flex-justify">
  <div class="grid-box" :style="pcMaxWidth">
    <div class="flex-end full-width margin-bottom-12">
      <div class="flex-align">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/57882497_thumb.png"
          :style="iconStyle" class="unselect" @click="$refs.slick.prev()">
          
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/11147045_thumb.png"
          :style="iconStyle" class="unselect" @click="$refs.slick.next()" style="margin-left:36px">
      </div>
    </div>
    <!--<loading-component v-if="!vDelay" style="width:100%; height:140px;"></loading-component>-->
    <div class="full-width">
      <slick ref="slick" v-if="reRender && list && list.length>0" :options="slickOptions">
        <card-album-pc
          class="col-3"
          v-for="(item,idx) in list"
          :key="`card-${item.id}`"
          :card="item"
          :idx="idx"
          :style="cardStyle(idx)"
          ></card-album-pc>
      </slick>
    </div>
  </div>
  </div>
</div>
</template>
<script>
import CardAlbumPc from "@/components/Components/Card/CardAlbumPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockHomeAlbum',
  components: {
    CardAlbumPc
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
        "slidesToShow": 4,
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
        // display: 'inline-block',
        // height: '330px',
        padding: '0 8px'
      };
      
      // if(idx===0) obj.marginLeft = 0;
      // else if(idx===this.list.length-1) obj.marginRight = 0;
      
      // let gutters = 16;
      // obj.paddingLeft = `${gutters/2}px`;
      // obj.paddingRight = `${gutters/2}px`;
      
      // if(idx===0) obj.paddingLeft = 0;
      // else if(idx===this.list.length-1) obj.paddingRight = 0;
      
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

