<template>
<div v-if="detail" style="padding:32px 0 80px" :style="[pagePadding, brandColor.main]">
  <div class="size-20 weight-500 margin-bottom-8">{{ detail.title }}</div>
  
  <div class="flex-align size-12 margin-bottom-12">
    <div :style="brandColor.brand" class="sub-info">관리자</div>
    <div :style="brandColor.main" class="sub-info">{{ detail.created_time }}</div>  
    <div :style="brandColor.main" style="margin-right:4px">조회수</div>
    <div :style="brandColor.main">{{ detail.hits }}</div>
  </div>
  
  <div :style="contentStyle" class="margin-bottom-16">
    <e-editor :html="detail.content"></e-editor>
  </div>
  
  <div class="flex-end">
    <div :style="btnStyle" @click="routerPush('notice')">목록</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'BlockNoticeDetail',
  components: {

  },
  mixins: [

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
        padding: '16px 0',
        borderTop: this.brandBorder.sub.border,
        borderBottom: this.brandBorder.sub.border,
        width: '100%',
      }
    },
    btnStyle() {
      return {
        fontSize: '12px',
        fontWeight: '500',
        textAlign: 'center',
        borderRadius: '4px',
        width: '75px',
        height: '32px',
        lineHeight: '32px'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.sub-info {
  margin-right: 12px;
}
</style>

