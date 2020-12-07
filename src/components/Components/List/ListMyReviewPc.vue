<template>
<div style="padding:61px 0 159px" v-if="list">
  <div style="padding-bottom:14px">
    <div class="size-20 bold">내 후기 목록</div>
    <div class="size-14" :style="brandColor.sub">{{ list.length }}개의 후기 목록</div>
  </div>
    <list-vertical v-if="list.length>0">
      <transition-group name="fade" tag="div" slot="card">
        <card-review-list-pc
          v-for="(item,idx) in list"
          :key="item.id"
          :card="item"
          :idx="idx"
          :style="listStyle(idx)"
          ></card-review-list-pc>
      </transition-group>
    </list-vertical>
    <div v-if="list.length===0"
         class="empty-view" style="padding-bottom:80px"
         :style="brandColor.help">등록된 상품 후기가 없습니다.</div>
  </div>
</template>
<script>
import CardReviewListPc from "@/components/Components/Card/CardReviewListPc"
import ListMixin from "@/components/Mixins/ListMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ListMyReviewPc',
  components: {
    CardReviewListPc
  },
  mixins: [
    ListMixin,
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "url": "",
      "list": []
    }
  },
  created() {
      this.url = `/user/${this.user.user_id}/my/review`;
      this.getReviews();
    },
  
  methods: {
    getReviews() {
        this.$axios.get(this.url)
        .then(res => {
          if (res.status===200) {
            this.list = res.data.data;
          }
        })
        .catch(() => {
        })
      },
    listStyle(idx) {
      let styles = {
        height: '96px',
        marginBottom: '16px',
        boxSizing: 'content-box'
      };
      if (idx === this.list.length-1) {
        styles.marginBottom = 0;
      }
      return styles;
    }
  },
  computed: {
    contentStyle() {
      return {
        borderTop: `1px solid ${this.getColor('기본 테두리선 색상')}`,
        borderBottom: `1px solid ${this.getColor('기본 테두리선 색상')}`
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
@media(max-width:360px){
    
  }
</style>

