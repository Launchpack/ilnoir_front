<template>
<div class="flex-justify">
    <div v-if="detail" style="padding:60px 0" :style="[pcMaxWidth, brandColor.main]">
      <div class="size-25 weight-500 margin-bottom-14">{{ detail.title }}</div>
      
      <div class="flex-between size-15 margin-bottom-30">
        <div class="flex-align">
          <div :style="brandColor.brand" style="margin-right:10px">관리자</div>
          <div :style="brandColor.main">{{ detail.created_time }}</div>
        </div>
        <div class="flex-align">
          <div style="margin-right:6px">조회수</div>
          <div>{{ detail.hits }}</div>
        </div>
      </div>
      
      <div :style="contentStyle" class="margin-bottom-16">
        <e-editor :html="detail.content"></e-editor>
      </div>
      
      <div class="flex-end">
        <div class="btn-list unselect" @click="routerPush('notice')">목록</div>
      </div>
    </div>
  </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockNoticeDetailPc',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": undefined,
      "curIdx": undefined,
      "detail": undefined
    }
  },
  created() {
    this.getData();
    this.getList();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.$axios.get(`public/board/notice/${this.$route.query.id}`)
      .then(res => {
        this.detail = res.data;
      })
    },
    getList() {
      this.$axios.get('public/board/notice')
      .then(res => {
        this.list = res.data.data;
        this.getCurrentIdx();
      })
    },
    getCurrentIdx() {
      for(let i=0;i<this.list.length;i++) {
        if(this.list[i].id === Number(this.$route.query.id)){
          this.curIdx = i;
        }
      }
    },
    clickPrev() {
      if(this.curIdx !== this.list.length-1) {
        let id = this.list[this.curIdx + 1].id;
        this.$router.push(`notice_detail?id=${id}`);
        this.getData();
        this.getCurrentIdx();
      }
      else {
        this.toast('이전 공지사항이 없습니다.')
      }
    },
    clickNext() {
      if(this.curIdx > 0) {
        let id = this.list[this.curIdx - 1].id;
        this.$router.push(`notice_detail?id=${id}`);
        this.getData();
        this.getCurrentIdx();
      }
      else {
        this.toast('다음 공지사항이 없습니다.')
      }
    }
  },
  computed: {
    contentStyle() {
      return {
        padding: '16px 14px',
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border,
        width: '100%',
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.btn-list {
    font-size: 14px;
    text-align: center;
    width: 60px;
    height: 36px;
    line-height: 36px;
    border-radius: 8px;
  }
  .btn-list:hover {
    font-weight: 600;
  }
</style>

