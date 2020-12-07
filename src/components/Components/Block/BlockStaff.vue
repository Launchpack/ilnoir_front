<template>
<div style="padding:32px 0 80px" :style="pagePadding">
  
  <transition-group name="fade">
    <card-img-overlay v-for="item in list" :key="item.id" v-if="list"
      :card="item"></card-img-overlay>
  </transition-group>
</div>
</template>
<script>
import CardImgOverlay from "@/components/Components/Card/CardImgOverlay"

export default {
  name: 'BlockStaff',
  components: {
    CardImgOverlay
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "list": [
        {
          "id": 1,
          "img": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/14121482_thumb.png",
          "name": "손한휘",
          "title": "감독",
          "content": "<div style=\"text-align:center\"><strong>김해FC 선수 및 트레이너를 역임했습니다.</strong><div>유년시절부터 축구를 해오며 누구보다 아이들의 입장을 잘 헤아릴 수 있습니다.</div><div>진심을 다해 아이들의 성장을 돕겠습니다</div></div>",
          "fullImg": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/10273006.png",
          "position": "대표 및 감독"
        },
        {
          "id": 2,
          "img": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/08723935_thumb.png",
          "name": "임현석",
          "title": "코칭 스태프",
          "content": "",
          "fullImg": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/05656392.png",
          "position": "브랜드 매니저"
        }
      ]
    }
  },
  created() {
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
    
  },
  watch: {
    
  }
}
</script>


