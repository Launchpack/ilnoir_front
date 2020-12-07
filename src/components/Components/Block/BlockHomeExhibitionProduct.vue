<template>
<div :style="pagePadding">
  <div style="margin-bottom: 16px;">
    <div class="size-20 weight-500" style="font-weight:500;font-size:20px;color:rgb(0, 0, 0);">{{ title }}</div>
    <div class="size-14" :style="brandColor.sub">{{ recmCurrentTitle }}</div>
  </div>
      <list-horizontal
        v-if="list"
        :cardHeight="292">
        <card-product-exhibition
          slot="card"
          v-for="(item,idx) in list"
          :key="`card-${item.id}`"
          :card="item"
          :style="cardStyle(idx)"></card-product-exhibition>
      </list-horizontal> 
</div>
</template>
<script>
import CardProductExhibition from "@/components/Components/Card/CardProductExhibition"

export default {
  name: 'BlockHomeExhibitionProduct',
  components: {
    CardProductExhibition
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "list": [],
      "title": "",
      "exhibition_id": 1
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.$axios.get(`public/exhibition/${this.exhibition_id}`)
      .then(res => {
        this.list = res.data.product_list;
        this.title = res.data.title;
      })
    },
    cardStyle(idx) {
      let obj = {
        display: 'inline-block',
        width: '256px',
        height: '272px',
      };
      
      let gutters = this.$store.getters.brand.layout_gutters;
      obj.marginLeft = `${gutters/2}px`;
      obj.marginRight = `${gutters/2}px`;
      
      if(idx===0) obj.marginLeft = 0;
      else if(idx===this.list.length-1) obj.marginRight = 0;
      
      return obj;
    }
  },
  computed: {
    recmCurrentTitle() {
      return `${this.dateFormat(this.moment(), 'date_7')} ${this.$store.getters.service.title}의 베스트 상품`;
    }
  },
  watch: {
    
  }
}
</script>


