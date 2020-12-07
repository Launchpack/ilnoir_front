<template>
<div class="flex-justify full-width">  
  <div class="grid-box" :style="pcMaxWidth">
    <div class="flex-between full-width">
      <div style="margin-bottom: 16px;">
        <div class="size-20 weight-500" :style="brandColor.main" lp-text>오늘의 추천 상품</div>
        <div class="size-14" :style="brandColor.sub">{{ recmCurrentTitle }}</div>
      </div>
    </div>
    <div class="full-width">
      <list-vertical>
        <card-product-pc
          slot="card-grid"
          v-for="(item,idx) in list"
          :key="`card-${item.id}`"
          :card="item"
          class="col-3"
          :style="cardStyle(idx)"
          ></card-product-pc>
      </list-vertical>
    </div>
  </div>
</div>
</template>
<script>
import CardProductPc from "@/components/Components/Card/CardProductPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockHomeExhibitionProduct2Pc',
  components: {
    CardProductPc
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
      "exhibition_id": 2
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
        this.list = res.data.product_list;
        this.title = res.data.title;
        
        this.$nextTick(() => {
          this.reRenderSlick();
        });
      })
    },
    reRenderSlick() {
      if(this.reRender === false) return;

      this.$nextTick(() => {
        this.reRender = false;
        setTimeout(() => {
          this.reRender = true;
        },500);
      });
    },
    cardStyle(idx) {
      let obj = {
        // display: 'inline-block',
        // width: '320px',
        height: '316px',
      };
      
      let gutters = 16;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.marginBottom = `${gutters}px`;
      
      if(idx%4===0) obj.paddingLeft = 0;
      else if(idx%4===3) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    recmCurrentTitle() {
      return `${this.dateFormat(this.moment(), 'date_7')} ${this.$store.getters.service.title}의 추천 상품`;
    }
  },
  watch: {
    
  }
}
</script>


