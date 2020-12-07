<template>
<div v-if="detail">
  <div :style="brandColor.main" style="padding:32px 16px 16px">
    <div class="size-20 weight-500 margin-bottom-8">{{ detail.title }}</div>
    <div class="size-10 weight-500 col-5" style="padding:4px 8px;text-align:center;border-radius:4px" 
      :style="brandBgColor.white">{{ detail.start_date }} ~ {{ detail.end_date }}</div>
  </div>
  
  <!--<div style="width:100%;height:80px;text-align:center;line-height:80px" -->
  <!--  :style="brandBgColor.white">이벤트에 파트너 정보</div>-->
    
  <div style="padding:32px 0 80px" :style="[pagePadding, brandColor.main]" class="size-14">
    <e-editor :html="detail.content"></e-editor>
  </div>
</div>
</template>
<script>

export default {
  name: 'BlockEventDetail',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
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
      this.$axios.get(`public/board/event/${this.$route.query.id}`)
      .then(res => {
        this.detail = res.data;
      })
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


