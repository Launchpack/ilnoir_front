<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <div class="size-40 text-center bold" :style="[titleStyle, brandColor.brand]">훈련 사진 및 영상</div>
    
    <div class="flex-justify" style="padding:28px 0">
      <div class="flex-align size-20">
        <div v-for="(item,idx) in tabList" :key="'tab-'+item.id"
          :style="tabStyle(item)" class="unselect" @click="clickTab(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
    
    <div v-if="selectedTab===1">
      <div class="grid-box">
        <card-img-txt-pc v-for="item in list" :key="item.id" v-if="list"
          :card="item" class="col-3"
          :style="cardImg"></card-img-txt-pc>
      </div>
      
      <pagination-default :pagingData="pagingData" :pageNum="3" :arrowEnd="false"
        @curPaginationNum="(val) => curNum(val)"
        v-if="pagingData"></pagination-default>
      
      <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 훈련 사진이 없습니다.</div>      
    </div>
    
    <div v-if="selectedTab===2">
      <div class="grid-box">
        <card-img-txt-large-pc v-for="item in vList" :key="item.id" v-if="list"
          :card="item" class="col-6"
          style="padding:24px 8px 40px"></card-img-txt-large-pc>
      </div>
      
      <pagination-default :pagingData="vPagingData" :pageNum="2" :arrowEnd="false"
          @curPaginationNum="(val) => curvNum(val)"
          v-if="pagingData"></pagination-default>
      
      <div v-if="list&&list.length===0" class="empty-view" :style="brandColor.sub">등록된 훈련 영상이 없습니다.</div>      
    </div>    
  </div>
  </div>
</template>
<script>
import CardImgTxtPc from "@/components/Components/Card/CardImgTxtPc"
import CardImgTxtLargePc from "@/components/Components/Card/CardImgTxtLargePc"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockTrainingPc',
  components: {
    CardImgTxtPc,
    CardImgTxtLargePc,
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
      "tabList": [
        {
          "id": 1,
          "name": "사진"
        },
        {
          "id": 2,
          "name": "동영상"
        }
      ],
      "pagingData": undefined,
      "selectedTab": 1,
      "vPagingData": undefined,
      "curPaginationNum": undefined,
      "curvPaginationNum": undefined
    }
  },
  created() {
    this.getList();
    this.getVideo();
  },
  mounted() {

  },
  
  methods: {
    getList() {
      let num = 1;
      if(this.curPaginationNum) {
        num = this.curPaginationNum;
      }
      this.$axios.get(`public/board/2/post?page_num=${num}&page_length=16`)
      .then(res => {
        this.list = res.data.data;
        this.pagingData = res.data;
      })
    },
    getVideo() {
      let num = 1;
      if(this.curvPaginationNum) {
        num = this.curvPaginationNum;
      }
      this.$axios.get(`public/board/3/post?page_num=${num}&page_length=6`)
      .then(res => {
        this.vList = res.data.data;
        this.vPagingData = res.data;
      })
    },
    curNum(num) {
      this.curPaginationNum = num;
      this.getList();
    },
    curvNum(num) {
      this.curvPaginationNum = num;
      this.getVideo();
    },
    tabStyle(item) {
      let deco = {
        padding: '0 12px'
      };
      
      if(item.id===1) {
        deco.borderRight = '1px solid #E3E3E3'
      }
      if(this.selectedTab===item.id) {
        deco.color = 'white';
        deco.fontWeight = 'bold';
      }
      else {
        deco.color = this.brandColor.sub.color
      }
      
      return deco;
    },
    clickTab(item) {
      this.selectedTab = item.id;
    }
  },
  computed: {
    cardImg() {
      return {
        padding: '20px 8px 32px',
        // borderBottom: this.brandBorder.sub.border
      }
    },
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


