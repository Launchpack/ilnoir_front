<template>
<div class="flex-justify full-width">  
  <div class="grid-box" :style="pcMaxWidth">
    <div class="flex-between full-width">
      <div style="margin-bottom: 16px;">
        <div data-v-4346fde3="" lp-text="" class="size-20 weight-500" style="font-weight:500;font-size:20px;color:rgb(0, 0, 0);">오늘의 베스트 상품</div>
        <div class="size-14" :style="brandColor.sub">{{ recmCurrentTitle }}</div>
      </div>
      <div class="flex">
        <i class="material-icons slide-arrow flex-center unselect" @click="$refs.slick.prev()">chevron_left</i>
        <i class="material-icons slide-arrow flex-center unselect" @click="$refs.slick.next()" style="margin-left:8px">chevron_right</i>
      </div>
    </div>
    <!--<loading-component v-if="!vDelay" style="width:100%; height:140px;"></loading-component>-->
    <div class="full-width">
      <slick ref="slick" v-if="reRender && list && list.length>0" :options="slickOptions">
        <card-product-exhibition
          v-for="(item,idx) in list"
          :key="`card-${item.id}`"
          :card="item"
          :idx="idx"
          :style="cardStyle(idx)"
          ></card-product-exhibition>
      </slick>
    </div>
  </div>
</div>
</template>
<script>
import CardProductExhibition from "@/components/Components/Card/CardProductExhibition"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockHomeExhibitionProductPc',
  components: {
    CardProductExhibition
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
      "slickOptions": {
        "dots": false,
        "arrows": false,
        "autoplay": false,
        "infinite": true,
        "centerMode": false,
        "slidesToShow": 3,
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
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.$axios.get('public/exhibition/'+this.exhibition_id)
      .then(res => {
        console.log(res, ' : this res')
        this.list = res.data.product_list;
        this.title = res.data.title;
        if (res.data.desc !== null && res.data.desc !== '') {
          this.recmCurrentTitle = res.data.desc;
          
        } else {
          this.setRecmCurrentTitle();
        }
        
        // this.vDelay = true;
        
        // setTimeout(() => {
          this.reRenderSlick();
        // },100);      
      })
    },
    setRecmCurrentTitle() {
      this.recmCurrentTitle = `${this.dateFormat(this.moment(), 'date_7')} ${this.$store.getters.service.title}의 베스트 상품`;
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
        width: '320px',
        height: '330px',
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

