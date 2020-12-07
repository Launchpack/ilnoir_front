<template>
<div style="padding-bottom:60px" :style="pagePadding">
  <div class="size-20 bold text-center" 
    :style="[brandColor.brand, titleStyle]">어린이 축구 대회 리스트</div>
  
  <transition-group name="fade">
    <card-img-overlay-comp v-for="item in list" :key="item.id" v-if="list"
      :card="item" style="padding:6px 0"></card-img-overlay-comp>
  </transition-group>
  
  <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 공지사항이 없습니다.</div>
</div>
</template>
<script>
import CardImgOverlayComp from "@/components/Components/Card/CardImgOverlayComp"

export default {
  name: 'BlockCompetition',
  components: {
    CardImgOverlayComp
  },
  mixins: [

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
      },
    getList() {
      let num = 1;
      if(this.curPaginationNum) {
        num = this.curPaginationNum;
      }
      this.$axios.get(`public/board/1/post?page_num=${num}&page_length=5`)
      .then(res => {
        this.list = res.data.data;
        this.pagingData = res.data;
      })
    },
    curNum(num) {
      this.curPaginationNum = num;
      this.getList();
    }
  },
  computed: {
    titleStyle() {
      return {
        padding: '20px 0',
        borderBottom: `2px solid ${this.getColor('기본 테두리선 색상')}`,
      }
    }
  },
  watch: {
    
  }
}
</script>


