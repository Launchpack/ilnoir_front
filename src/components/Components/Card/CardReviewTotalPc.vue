<template>
<div :style="[containStyle, brandColor.main]">
  <div>
    <div>
      <rating :rateSize="20" :value="product.rate" rateColor="#ffc351" style="margin-bottom:4px"></rating>
      <div class="flex" style="font-size:16px;align-items:baseline">
        <div style="margin-right:8px" class="size-32 weight-500">{{ computedRate }}</div>
        <div class="size-20" :style="brandColor.sub">{{ product.rate_count }}개의 리뷰</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardReviewTotalPc',
  components: {

  },
  mixins: [

  ],
  props: {
    product: {
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
    
  },
  computed: {
    containStyle() {
      return {
        padding: '32px 0',
      }
    },
    computedRate() {
      return this.product.rate.toFixed(1);
    }
  },
  watch: {
    
  }
}
</script>


