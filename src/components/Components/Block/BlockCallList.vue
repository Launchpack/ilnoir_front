<template>
<div :style="pagePaddingAll">
  <div class="size-20 weight-500" :style="brandColor.main">전화연결 내역</div>
  
  <list-vertical style="padding: 16px 0;">
    <transition-group name="fade" slot="card" tag="div">
      <card-call
        v-for="(item, idx) in list"
        :key="`card-${item.id}`"
        :card="item"
        :style="{marginBottom: pageGutter}"></card-call>
    </transition-group>
  </list-vertical>
  
  <div v-if="list.length===0" class="empty-view" :style="brandColor.sub">전화 연결 내역이 없습니다.</div>
</div>
</template>
<script>
import CardCall from "@/components/Components/Card/CardCall"
import ListMixin from "@/components/Mixins/ListMixin"

export default {
  name: 'BlockCallList',
  components: {
    CardCall
  },
  mixins: [
    ListMixin
  ],
  props: {

  },
  data() {
    return {
      "list": []
    }
  },
  created() {
      this.init();
      this.getData();
    },
  
  methods: {
    init() {
        this.list = [];
      },
    getData() {
        this.pageLoadType = 'infinite';
        this.currentPage = 1;
        this.$axios.get(`user/${this.user.user_id}/my/call`).then(res=> {
          this.totalPages = res.data.total_page;
          this.totalCount = res.data.count;
          this.currentPage = 2;
          this.list = res.data.data;
        });
      }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


