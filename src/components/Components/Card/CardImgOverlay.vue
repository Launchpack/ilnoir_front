<template>
<div @click="clickCard">
  <div class="size-20 weight-500 text-center" 
    :style="[brandColor.brand, titleStyle]">{{ card.title }}</div>
  <div class="position-relative">
    <img :src="card.img" :style="imgStyle">
    <div class="position-absolute dim flex-center">
      <div class="size-17" :style="brandColor.brand">{{ card.name }}</div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardImgOverlay',
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
        "width": "100%",
        "objectFit": "cover"
      }
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    clickCard() {
      this.$root.$emit('page_overlay','StaffOverlay', this.card);
    }
  },
  computed: {
    titleStyle() {
      return {
        padding: '20px 0',
        borderBottom: `2px solid ${this.getColor('기본 테두리선 색상')}`,
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.dim {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40%;
  background-color: rgba(23,23,45,0.8);
}
</style>

