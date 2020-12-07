<template>
<div v-if="card" class="unselect text-center card-wrap" 
  @click="routerPush(`training_detail?id=${card.id}&board=${card.board}`)">
  <img :src="card.img" :style="imgStyle" class="margin-bottom-6">
  <div :style="brandColor.white" class="size-12 bold">{{ card.title }}</div>
</div>
</template>
<script>

export default {
  name: 'CardImgTxtLarge',
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
    
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


