<template>
<div class="flex-align full-width">
    <div v-if="card"
         :style="radius"
         @click="clickCard">
      <div :style="bgImageStyle"></div>
    </div>
    <div :style="brandBgColor.white" class="full-width flex-align" style="height:80px;border-radius:0 8px 8px 0">
      <div style="padding-left:12px;">
        <div v-if="card.partner"
          class="size-10"
          :style="brandColor.primary">{{ card.partner.name }}</div>
        <div class="size-14 weight-500"
             :style="brandColor.main"
             style="margin-bottom: 8px;">{{ card.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CardMixin from "@/components/Mixins/CardMixin"

export default {
  name: 'CardProductReview',
  components: {

  },
  mixins: [
    CardMixin
  ],
  props: {
    card: {
      type: Object,
    },

  },
  data() {
    return {
      "ids": 1
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    clickCard() {
        this.routerPush('product_detail?id='+this.card.id);
      }
  },
  computed: {
    bgImageStyle() {
        return {
          backgroundImage: `url("${this.card.img}")`,
          /*width: '60px',
          height: '60px',*/
          width: '80px',
          height: '80px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '8px 0 0 8px'
        }
      }
  },
  watch: {
    
  }
}
</script>


