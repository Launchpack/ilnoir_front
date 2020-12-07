<template>
<div style="padding:24px 0 40px" v-if="list">
  <div :style="pagePadding" style="padding-bottom:14px">
    <div class="size-20 bold">내 후기 목록</div>
    <div class="size-14" :style="brandColor.sub">{{ list.length }}개의 후기 목록</div>
  </div>
    <list-vertical v-if="list.length>0" :style="contentStyle">
      <transition-group name="fade" tag="div" slot="card"
        style="min-height:100px">
        <card-review-list
          v-for="(item,idx) in list"
          :key="item.id"
          :card="item"
          :idx="idx"
          ></card-review-list>
      </transition-group>
    </list-vertical>
    <div v-if="list.length===0"
         class="empty-view" style="padding-bottom:80px"
         :style="brandColor.help">등록된 상품 후기가 없습니다.</div>
  </div>
</template>
<script>
import CardReviewList from "@/components/Components/Card/CardReviewList"
import ListMixin from "@/components/Mixins/ListMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ListMyReview',
  components: {
    CardReviewList
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

