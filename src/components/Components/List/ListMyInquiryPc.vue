<template>
<div style="padding:61px 0 159px" v-if="list">
  <div style="padding-bottom:22px">
    <div lp-text class="size-20 weight-500" :style="brandColor.main">문의 목록</div>
  </div>
    <list-vertical v-if="list.length>0">
      <div slot="card">
        <transition-group name="fade" tag="div">
          <card-inquiry-list-pc
            v-for="(item,idx) in list"
            :key="item.id"
            :card="item"
            :idx="idx"
            :style="contentStyle(idx)"></card-inquiry-list-pc>
        </transition-group>
      </div>
    </list-vertical>
    <div v-if="list && list.length===0"
         class="empty-view" style="padding-bottom:80px"
         :style="brandColor.help">등록된 상품 문의가 없습니다.</div>
  </div>
</template>
<script>
import CardInquiryListPc from "@/components/Components/Card/CardInquiryListPc"
import ListMixin from "@/components/Mixins/ListMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ListMyInquiryPc',
  components: {
    CardInquiryListPc
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
    },
    contentStyle(idx) {
      let styles = {
        height: '96px',
        border: this.brandBorder.sub.border,
        boxSizing: 'content-box',
        borderRadius: '8px',
        marginBottom: '16px'
      };
      
      if(idx===this.list.length-1) styles.marginBottom = 0;
      return styles;
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


