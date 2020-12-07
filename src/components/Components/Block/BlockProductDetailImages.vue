<template>
<div>
  <img :src="selectedImg" :style="imageStyle">
  <div class="flex-justify">
  <div style="overflow: hidden;width:434px"
    v-dragscroll.x="true" class="flex">
    <div v-for="(img, idx) in imgs" :key="'img-'+idx" class="unselect col-4 position-relative"
      @click="clickImg(img)" :style="imgStyle(img,idx)">
      <e-image :img="img" :width="100" :imageRates="{ratio:'1:1'}"></e-image>
      <div class="position-absolute dim"
        v-if="img!==selectedImg"></div>
    </div>
  </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'BlockProductDetailImages',
  components: {

  },
  mixins: [

  ],
  props: {
    imgs: {
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      "imageStyle": {
        "width": "100%",
        "height": "460px",
        "objectFit": "cover"
      },
      "selectedImg": ""
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.selectedImg = this.imgs[0];
      
    })
  },
  
  methods: {
    clickImg(img) {
      this.selectedImg = img;
    },
    imgStyle(idx) {
      let deco = {
        padding: '8px 4px'
      }
      if(idx===0) {
        deco.marginLeft = '20px'
      }
      if (idx === this.imgs.length - 1) {
        deco.marginRight = '20px'
      }
      return deco;
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.dim {
  background-color: rgba(0,0,0,0.4);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

