<template>
<div class="full-width unselect" @click="clickCard">
  <img :src="card.img" :style="imgStyle">
</div>
</template>
<script>

export default {
  name: 'CardAlbumPc',
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
        "height": "200px",
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
      this.routerPush(`training_detail?id=${this.card.id}&board=2`);
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


