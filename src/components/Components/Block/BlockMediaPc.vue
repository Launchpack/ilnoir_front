<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <div class="size-40 bold text-center" :style="[titleStyle, brandColor.brand]">미디어 소개</div>
    
    <transition-group name="fade">
      <card-left-img-pc v-for="item in list" :key="item.id" v-if="list"
        :card="item"></card-left-img-pc>
    </transition-group>    
    
    <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 공지사항이 없습니다.</div>      
    
    <pagination-default :pagingData="pagingData" :pageNum="3" :arrowEnd="false"
      @curPaginationNum="(val) => curNum(val)"
      v-if="pagingData"></pagination-default>
  </div>
  </div>
</template>
<script>
import CardLeftImgPc from "@/components/Components/Card/CardLeftImgPc"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockMediaPc',
  components: {
    CardLeftImgPc,
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


