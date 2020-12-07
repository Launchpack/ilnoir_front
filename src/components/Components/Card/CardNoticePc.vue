<template>
<div v-if="card" :style="wrapStyle" 
  class="flex-between unselect size-15 text-center" 
  @click="routerPush(`notice_detail?id=${card.id}`)">
  <div :style="brandColor.main" class="col-1">{{ card.index }}</div>
  <div :style="brandColor.main" class="col-7">{{ card.title }}</div>
  <div :style="brandColor.sub" class="col-1">{{ moment(card.created_time).format('YYYY/MM/DD') }}</div>
  <div :style="brandColor.sub" class="col-2">관리자</div>
  <div :style="brandColor.sub" class="col-1">{{ card.hits }}</div>
</div>
</template>
<script>

export default {
  name: 'CardNoticePc',
  components: {

  },
  mixins: [

  ],
  props: {
    card: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    wrapStyle() {
      return {
        borderBottom: this.brandBorder.sub.border,
        height: '48px'
      }
    }
  },
  watch: {
    
  }
}
</script>


