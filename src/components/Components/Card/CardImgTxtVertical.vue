<template>
<div class="full-width unselect" @click="clickCard">
  <img :src="card.img" :style="imgStyle">
  
  <div :style="wrapStyle" class="text-center">
    <div class="size-17 title weight-500">{{ card.title }}</div>
    <div class="ellipsis-multiple content">
      <e-editor :html="card.content" style="color:#888888"></e-editor>
    </div>
    
    <div class="flex-end created size-13">
      <div class="flex-align" :style="brandColor.sub">
        <i class="material-icons" style="font-size:22px">history</i>
        <div style="margin-left:4px">{{ moment(card.created_time).format('YYYY-MM-DD') }}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardImgTxtVertical',
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
        "width": "100%",
        "height": "180px",
        "objectFit": "cover"
      },
      "wrapStyle": {
        "width": "100%",
        "height": "180px",
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
<style scoped>
.title {
  padding: 16px 40px 0;
}
.content {
  width: 100%;
  height: 52px;
  padding: 0 12px;
}
.created {
  padding: 16px;
}
</style>

