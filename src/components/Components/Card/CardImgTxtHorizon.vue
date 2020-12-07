<template>
<div class="full-width" @click="clickCard">
  <div class="flex">
  <img :src="card.img" :style="imgStyle" class="col-6">
  
  <div :style="wrapStyle" class="col-6 flex">
    <div class="size-12 bold">{{ card.title }}</div>
    <div :style="brandColor.sub" class="size-11">{{ moment(card.created_time).format('YYYY-MM-DD') }}</div>
  </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardImgTxtHorizon',
  components: {

  },
  mixins: [

  ],
  props: {
    idx: {
      type: Number,
    },
    card: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      "imgStyle": {
        "height": "100px",
        "objectFit": "cover"
      },
      "wrapStyle": {
        "height": "100px",
        "padding": "12px",
        "flexDirection": "column",
        "justifyContent": "space-between",
        "backgroundColor": "white"
      }
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    clickCard() {
      this.routerPush(`media_detail?id=${this.card.id}`);
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


