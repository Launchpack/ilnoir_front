<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <div class="size-40 bold text-center" :style="[titleStyle, brandColor.brand]">공지</div>
    
    <transition name="fade">
    <div v-if="list" :style="[brandColor.main , subStyle]" 
      class="size-16 weight-500 flex-between text-center">
      <div class="col-1">번호</div>
      <div class="col-7">제목</div>
      <div class="col-1">날짜</div>
      <div class="col-2">작성자</div>
      <div class="col-1">조회</div>
    </div>
    </transition>
    
    <transition-group name="fade">
      <card-notice-pc v-for="item in list" :key="item.id" v-if="list"
        :card="item"></card-notice-pc>
    </transition-group>    
    
    <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 공지사항이 없습니다.</div>      
    
    <pagination-default :pagingData="pagingData" :pageNum="3" :arrowEnd="false"
      @curPaginationNum="(val) => curNum(val)"
      v-if="pagingData"></pagination-default>
  </div>
  </div>
</template>
<script>
import CardNoticePc from "@/components/Components/Card/CardNoticePc"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockNoticePc',
  components: {
    CardNoticePc,
    PaginationDefault
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": undefined,
      "pagingData": undefined,
      "curPaginationNum": undefined
    }
  },
  created() {
    this.getList();
  },
  mounted() {

  },
  
  methods: {
    getList() {
      let num = 1;
      if(this.curPaginationNum) {
        num = this.curPaginationNum;
      }
      this.$axios.get(`public/board/notice?page_num=${num}&page_length=5`)
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
    subStyle() {
      return {
        padding: '32px 0',
        borderBottom: this.brandBorder.sub.border,
        height: '48px'
      }
    },
    titleStyle() {
      return {
        padding: '60px 0 40px',
        borderBottom: this.brandBorder.main.border
      }
    }
  },
  watch: {
    
  }
}
</script>


