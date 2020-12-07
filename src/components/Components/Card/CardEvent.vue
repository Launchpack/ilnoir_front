<template>
<div class="full-width margin-bottom-14" :style="brandBgColor.white" 
  style="border-radius:8px" @click="clickCard">
  <div :style="imgStyle"></div>
  
  <div :style="brandColor.main" style="padding:8px">
    <!--<div class="size-10" :style="brandColor.primary">파트너 이름 정적</div>-->
    <div class="size-14 weight-500 margin-bottom-4">{{ card.title }}</div>
    <div style="padding:4px 8px;text-align:center;border-radius:4px" :style="brandBgColor.main" 
      class="size-10 col-5 weight-500">{{ card.start_date }} ~ {{ card.end_date }}</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardEvent',
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
    clickCard() {
      if(!this.card.disabled) {
        this.routerPush(`event_detail?id=${this.card.id}`)
      }
    }
  },
  computed: {
    imgStyle() {
      return {
        width: '100%',
        height: '128px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url("${this.card.img}")`,
        borderRadius: '8px 8px 0 0'
      }
    }
  },
  watch: {
    
  }
}
</script>


