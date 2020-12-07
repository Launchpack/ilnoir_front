<template>
<div v-if="card" :style="wrapStyle" 
  class="flex unselect" 
  @click="routerPush(`media_detail?id=${card.id}`)">
  <img :src="card.img" :style="imgStyle">
  <div class="flex card-box">
    <div>
      <div :style="brandColor.main" class="size-20 bold left-padding">{{ card.title }}</div>
      <e-editor :html="card.content" style="color:white" class="ellipsis-multiple content"></e-editor>
    </div>
    <div :style="brandColor.primary" class="left-padding size-13">{{ moment(card.created_time).format('YYYY/MM/DD') }}</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardLeftImgPc',
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
        "width": "392px",
        "height": "220px",
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
        padding: '24px 0'
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
  padding: 16px 0;
}
.content {
  height: 72px;
}
</style>

