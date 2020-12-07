<template>
<div :style="pagePadding">
  <div class="flex-between" style="align-items: flex-end; margin-bottom: 16px;">
    <div>
      <div>
        <div class="size-20 weight-500" style="font-weight:500;font-size:20px;" lp-text>내 주변 상품</div>
        <div class="size-14" :style="brandColor.sub" v-if="currentAddress!==''">{{ currentAddress }}</div>
      </div>
    </div>
    <div class="btn-more size-12 weight-500 unselect" style="color: rgb(0, 0, 0);" @click="clickMore">더보기</div>
  </div>
  <list-vertical>
    <div slot="card-grid" class="col-6"
        v-for="(item,idx) in list"
        :key="`card-prod-${item.id}-${idx}`"
        :style="cardStyle(idx)">
      <card-product :card="item"></card-product>
    </div>
  </list-vertical>
</div>
</template>
<script>
import CardProduct from "@/components/Components/Card/CardProduct"
import ListMixin from "@/components/Mixins/ListMixin"

export default {
  name: 'BlockHomeProductList',
  components: {
    CardProduct
  },
  mixins: [
    ListMixin
  ],
  props: {
    address: {
      type: Object,
    },

  },
  data() {
    return {
      "list": []
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    clickMore() {
      this.routerPush('product');
    },
    cardStyle(idx) {
      let obj = {}
      
      let gutters = this.$store.getters.brand.layout_gutters;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.paddingBottom = `${gutters}px`;
      
      if(idx%2===0) obj.paddingLeft = 0;
      else if(idx%2===1) obj.paddingRight = 0;
      
      return obj;
    },
    getUrl() {
      let location = '';
      if (this.$store.getters.currentPosition===undefined) location = '';
      else {
        location = `${this.$store.getters.currentPosition.lng},${this.$store.getters.currentPosition.lat}`;
      }

      let url = `user/${this.user.user_id}/mapping/product?fields=id,img,name,simple_desc,tags,form,order_conversion_type,category1,category2,category3,rate,stock,input,like_count,reviews_count,visit,price,partner,address,dong,distance,params&page_num=1&page_length=10`;
      
      url += `&location=${location}&ordering=distance`;
    
      this.url = url;
    },
    getData() {
      this.getUrl();
      this.$axios.get(this.url).then(res => {
        this.list = res.data.data;
      });
    }
  },
  computed: {
    currentAddress() {
      // 현재 주소
      let add = this.address;
      if (add && add.sido && add.sigungu) {
        return `${add.sido} ${add.sigungu}`;
      }
      else return '';
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.btn-more {
    background-color: #fff;
    padding: 8px 14px;
    border-radius: 4px;
  }
</style>

