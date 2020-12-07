<template>
<div v-if="card" class="unselect text-center card-wrap" 
  @click="routerPush(`training_detail?id=${card.id}&board=${card.board}`)"
  @mouseover="onHover()"
  @mouseleave="outHover()">
  <img :src="card.img" :style="imgStyle" class="margin-bottom-12">
  <div :style="[brandColor.white, titleLine]" class="size-15 bold margin-bottom-20">{{ card.title }}</div>
  <div style="color:#CCCCCC" class="size-10">{{ moment(card.created_time).format('YYYY/MM/DD') }}</div>
</div>
</template>
<script>

export default {
  name: 'CardImgTxtPc',
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


