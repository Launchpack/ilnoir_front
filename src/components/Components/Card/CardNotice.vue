<template>
<div v-if="card" :style="wrapStyle" 
  class="size-12" @click="routerPush(`notice_detail?id=${card.id}`)">
  <div :style="brandColor.main" class="size-15">{{ card.title }}</div>
  <div class="flex-align size-12" :style="brandColor.sub">
    <div>작성일</div>
    <div>{{ moment(card.created_time).format('MM/DD') }}</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardNotice',
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
        padding: '8px',
        borderBottom: this.brandBorder.sub.border,
      }
    }
  },
  watch: {
    
  }
}
</script>


