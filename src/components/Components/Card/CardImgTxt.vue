<template>
<div v-if="card" class="unselect text-center card-wrap" 
  @click="routerPush(`training_detail?id=${card.id}&board=${card.board}`)">
  <img :src="card.img" :style="imgStyle" class="margin-bottom-4">
  <div :style="brandColor.white" class="size-12 bold margin-bottom-6">{{ card.title }}</div>
  <div style="color:#CCCCCC" class="size-10">{{ moment(card.created_time).format('YYYY/MM/DD') }}</div>
</div>
</template>
<script>

export default {
  name: 'CardImgTxt',
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


