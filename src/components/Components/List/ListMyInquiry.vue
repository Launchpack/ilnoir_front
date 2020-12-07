<template>
<div style="padding:24px 0 40px" v-if="list">
  <div :style="pagePadding" style="padding-bottom:14px">
    <div class="size-20 bold">내 문의 목록</div>
    <div class="size-14" :style="brandColor.sub">{{ list.length }}개의 문의 목록</div>
  </div>
    <list-vertical v-if="list.length>0" :style="contentStyle">
      <div style="min-height:96px" slot="card">
        <transition-group name="fade" tag="div">
          <card-inquiry-list
            v-for="(item,idx) in list"
            :key="item.id"
            :card="item"
            :idx="idx"></card-inquiry-list>
        </transition-group>
      </div>
    </list-vertical>
    <div v-if="list && list.length===0"
         class="empty-view" style="padding-bottom:80px"
         :style="brandColor.help">등록된 상품 문의가 없습니다.</div>
  </div>
</template>
<script>
import CardInquiryList from "@/components/Components/Card/CardInquiryList"
import ListMixin from "@/components/Mixins/ListMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ListMyInquiry',
  components: {
    CardInquiryList
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
      this.url = `/user/${this.user.user_id}/my/product/inquiry`;
      this.getContacts();
    },
  
  methods: {
    getContacts() {
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


