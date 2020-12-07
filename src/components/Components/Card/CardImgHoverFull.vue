<template>
<div>
  <div class="size-40 text-center unselect" :style="[titleStyle, brandColor.brand]"
    >{{ card.title }}</div>
  
  <div class="position-relative" @mouseover="onHover(card)" @mouseleave="outHover(card)"
    style="min-height:400px">
    <img :src="card.img" :style="imgStyle">
    <div class="position-absolute dim flex-center size-25 unselect" 
      :style="[bottomStyle, brandColor.main]"
      @click="clickCard">
      <div v-if="hoverState&&hoverId===card.id" class="text-center">
        <div class="size-15 margin-bottom-4" :style="brandColor.brand">{{ compDate }}</div>
        <div class="size-20 bold margin-bottom-4">{{ card.name }}</div>
        <div class="size-18">{{ compRegion }}</div>
      </div>
      
      <div v-else class="text-center">
        <div class="size-15 margin-bottom-4" :style="brandColor.brand">{{ compDate }}</div>
        <div class="size-20 bold margin-bottom-4">{{ card.name }}</div>
        <div class="size-18">{{ compRegion }}</div>
      </div>
      
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardImgHoverFull',
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
      "hoverId": undefined,
      "imgStyle": {
        "width": "100%",
        "minHeight": "400px",
        "objectFit": "cover"
      },
      "hoverState": false
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    onHover(item) {
      this.hoverState = true;
      this.hoverId = item.id;
    },
    outHover() {
      this.hoverState = false;
      this.hoverId = undefined;
    },
    clickCard() {
      this.routerPush(`competition_detail?id=${this.card.id}`)
    }
  },
  computed: {
    titleStyle() {
      return {
        padding: '80px 0 40px',
        borderBottom: this.brandBorder.main.border
      }
    },
    bottomStyle() {
      if(this.hoverState && this.card.id===this.hoverId) {
        return {
          left: '0',
          bottom: '0',
          backgroundColor: 'rgba(23,23,45,0.8)',
          width: '100%',
          height: '101%',
          transitionProperty: 'height',
          transitionDuration: '0.5s'
        }
      }
      else {
        return {
          left: '0',
          bottom: '0',
          backgroundColor: 'rgba(23,23,45,0.8)',
          width: '100%',
          height: '30%',
          transitionProperty: 'height',
          transitionDuration: '0.5s'
        }
      }
    },
    compDate() {
      let obj = this.card.params.filter(item => { return item.param_id===3 })[0];
      return obj.value ? obj.value : '';
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


