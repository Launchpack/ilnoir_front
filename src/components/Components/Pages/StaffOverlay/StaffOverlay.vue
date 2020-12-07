<template>
<div :style="cardStyle" class="position-relative">
  <img :src="prop.fullImg" class="img-bg full-width full-height">
  <div class="position-absolute flex-between top-menu full-width">
    <div class="size-30 weight-900" :style="brandColor.primary">{{ prop.position }}</div>
    <i class="material-icons close unselect" @click="clickClose">close</i>
  </div>
  
  <div class="position-absolute bottom-menu full-width flex-center">
    <div style="padding:0 32px" v-if="prop.id===1">
      <div class="text-center margin-bottom-16 size-25 bold" :style="brandColor.brand">{{ prop.name }}</div>
      <div class="size-13 bold margin-bottom-4" :style="brandColor.main">김해FC 선수 및 트레이너를 역임했습니다.</div>
      <div class="size-13 margin-bottom-4" :style="brandColor.sub">유년시절부터 축구를 해오며 누구보다 아이들의 입장을 잘 헤아릴 수 있습니다.</div>
      <div class="size-13" :style="brandColor.sub">진심을 다해 아이들의 성장을 돕겠습니다</div>
    </div>
    
    <div style="padding:0 32px" v-if="prop.id===2">
      <div class="text-center margin-bottom-16 size-25 bold" :style="brandColor.brand">{{ prop.name }}</div>
      <div class="size-13 margin-bottom-4" :style="brandColor.sub">GRIT12 취지와 사명에 깊이 공감하며</div>
      <div class="size-13 margin-bottom-4" :style="brandColor.sub">GRIT12와 함께 하게 되었습니다.</div>
      <div class="size-13 bold" :style="brandColor.main"><span class="size-13" :style="brandColor.sub">커리큘럼부터 축구대회 기획까지 </span>GRIT12의 정신을 담겠습니다.</div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'StaffOverlay',
  components: {

  },
  mixins: [

  ],
  props: {
    prop: {
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
    clickClose() {
      this.$emit('closePage');
    }
  },
  computed: {
    cardStyle() {
      return {
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.img-bg {
  object-fit: cover;  
}
.top-menu {
  top: 12px;
  left: 0;
  padding: 0 16px;
}
.close {
  font-size: 24px;
  color: white;
  background-color: #074A33;
  border-radius: 50%;
}
.bottom-menu {
  height: 34%;
  background-color: rgba(12,12,35,0.8);
  left: 0;
  bottom: 0;
}
</style>

