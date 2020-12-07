<template>
<div @click="clickCard" class="position-relative">
    <img :src="card.img" :style="imgStyle">
    <div class="position-absolute dim flex-center text-center">
      <div>
        <div class="size-14 bold margin-bottom-4" :style="brandColor.brand">{{ card.name }}</div>
        <div class="size-12" :style="brandColor.main">{{ compRegion }}</div>
      </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'CardImgOverlayComp',
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
      this.routerPush(`competition_detail?id=${this.card.id}`);
    }
  },
  computed: {
    titleStyle() {
      return {
        padding: '20px 0',
        borderBottom: `2px solid ${this.getColor('기본 테두리선 색상')}`,
      }
    },
    compRegion() {
      let obj1 = this.card.params.filter(item => { return item.param_id===4 })[0];
      let reg = obj1.value.sigungu ? obj1.value.sigungu : '';
      let obj2 = this.card.params.filter(item => { return item.param_id===5 })[0];
      let age = obj2.value ? '/' + obj2.value : '';
      return reg + age;
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

