<template>
<div v-if="card" class="unselect text-center card-wrap" 
  @click="routerPush(`training_detail?id=${card.id}&board=${card.board}`)"
  @mouseover="onHover()"
  @mouseleave="outHover()">
  <img :src="card.img" :style="imgStyle" class="margin-bottom-16">
  <div :style="[brandColor.white, titleLine]" class="size-20 bold">{{ card.title }}</div>
</div>
</template>
<script>

export default {
  name: 'CardImgTxtLargePc',
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
    onHover() {
      this.hoverState = true;
      this.hoverId = this.card.id;
    },
    outHover(item) {
      this.hoverState = false;
    }
  },
  computed: {
    titleLine() {
      if(this.hoverState && this.hoverId===this.card.id) {
        return {
          textDecoration: 'underline'
        }
      }
      else {
        return {
          textDecoration: 'none'
        }
      }
    }
  },
  watch: {
    
  }
}
</script>


