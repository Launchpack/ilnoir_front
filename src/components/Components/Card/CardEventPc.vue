<template>
<div class="full-width unselect" :style="brandBgColor.white" 
  style="border-radius:8px" @click="routerPush(`event_detail?id=${card.id}`)">
  
  <div v-lazy:background-image="card.img" class="lazy-background-image" :style="imgStyle"></div>
  
  <div :style="brandColor.main" style="padding:16px">
    <div class="size-16 weight-500 margin-bottom-24">{{ card.title }}</div>
    <div style="padding:4px 8px;text-align:center;border-radius:4px" :style="brandBgColor.main" 
      class="size-12 col-5 weight-500">{{ card.start_date }} ~ {{ card.end_date }}</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardEventPc',
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
    imgStyle() {
      return {
        width: '100%',
        height: '192px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        // backgroundImage: `url("${this.card.img}")`,
        borderRadius: '8px 8px 0 0'
      }
    }
  },
  watch: {
    
  }
}
</script>


