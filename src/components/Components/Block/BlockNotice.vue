<template>
<div style="padding:32px 0 80px" :style="pagePadding">
  <div class="size-20 weight-500 text-center" 
    :style="[brandColor.brand, titleStyle]">공지</div>
  
  <transition-group name="fade">
    <card-notice v-for="item in list" :key="item.id" v-if="list"
      :card="item"></card-notice>
  </transition-group>
  
  <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 공지사항이 없습니다.</div>
          
  <pagination-default :pagingData="pagingData" :pageNum="3" :arrowEnd="false"
    @curPaginationNum="(val) => curNum(val)"
    v-if="pagingData"></pagination-default>
</div>
</template>
<script>
import CardNotice from "@/components/Components/Card/CardNotice"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"

export default {
  name: 'BlockNotice',
  components: {
    CardNotice,
    PaginationDefault
  },
  mixins: [

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
        padding: '0 16px 0 14px',
        borderBottom: `2px solid ${this.getColor('브랜드 강조 색상')}`,
        height: '48px'
      }
    },
    titleStyle() {
      return {
        padding: '20px 0',
        borderBottom: `2px solid ${this.getColor('보조 테두리선 색상')}`,
      }
    }
  },
  watch: {
    
  }
}
</script>


