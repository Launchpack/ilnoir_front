<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <div class="size-40 bold text-center" :style="[titleStyle, brandColor.brand]">어린이 축구 대회 리스트</div>
    
    <div class="grid-box">
      <card-img-hover-full v-for="item in list" :key="item.id" class="col-3"
        :card="item" style="padding:0 4px"></card-img-hover-full>
    </div> 
    
    <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 대회가 없습니다.</div>      
    
  </div>
  </div>
</template>
<script>
import CardImgHoverFull from "@/components/Components/Card/CardImgHoverFull"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockCompetitionPc',
  components: {
    CardImgHoverFull,
    PaginationDefault
  },
  mixins: [
    BlockMixin
  ],
  props: {

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
    getData() {
        if (typeof(this.sorted)==='object'&&this.sorted.value!==undefined) this.sorted = this.sorted.value; 

        this.url = `user/${this.user.user_id}/mapping/product?category1=25`
        this.url += '&page_num=1&page_length=12';
        // this.url += `&category1=25`;
        
        // 카테고리로 브래드크럼 세팅
        //this.setBreadCrumb();
        this.currentPage = 1;

        this.$axios.get(this.url).then(res => {
          this.totalPages = res.data.total_page;
          this.totalCount = res.data.count;
          this.currentPage = 2;
          this.list = res.data.data;
        });
      }
  },
  computed: {
    subStyle() {
      return {
        padding: '32px 0',
        borderBottom: this.brandBorder.sub.border,
        height: '48px'
      }
    },
    titleStyle() {
      return {
        padding: '80px 0 40px',
        borderBottom: this.brandBorder.main.border
      }
    }
  },
  watch: {
    
  }
}
</script>


