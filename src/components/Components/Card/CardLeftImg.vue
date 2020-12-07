<template>
<div v-if="card" :style="wrapStyle" 
  class="flex unselect" 
  @click="routerPush(`media_detail?id=${card.id}`)">
  <img :src="card.img" :style="imgStyle">
  <div class="flex card-box">
    <div :style="brandColor.main" class="size-12 bold left-padding">{{ card.title }}</div>
    <div :style="brandColor.sub " class="left-padding size-11">{{ moment(card.created_time).format('YYYY/MM/DD') }}</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardLeftImg',
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
      "imgStyle": {
        "width": "136px",
        "height": "76px",
        "objectFit": "cover"
      }
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
        padding: '12px 0'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.left-padding {
  padding-left: 16px;
}
.card-box {
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
}
.content {
  height: 72px;
}
</style>

