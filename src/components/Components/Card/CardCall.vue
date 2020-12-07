<template>
<div class="grid-box overflow-hidden unselect" :style="[radius, brandBgColor.white]" style="height:80px" 
  @click="routerPush(`product_detail?id=${card.product.id}`)">
  <div :class="device==='mobile' ? 'col-3' : 'col-1'">
    <div v-lazy:background-image="card.product.img" class="lazy-background-image-cover" style="width:80px;height:80px"></div>
  </div>
  <div class="flex wrap" :class="device==='mobile' ? 'col-7' : 'col-9'" style="padding:10px 12px">
    <div class="size-10 ellipsis" :style="brandColor.primary" style="height:16px; width:100%;">{{ card.partner.name }}</div>
    <div class="size-13 weight-500 ellipsis margin-bottom-4" :style="brandColor.main" style="height:20px; width:100%;">{{ card.product.name }}</div>
    <div class="size-10" :style="[brandBgColor.main, brandColor.main]" 
      style="display:inline-block; padding:1px 6px; border-radius:4px;">{{ card.partner.phone }}</div>
  </div>
  <div class="col-2 size-10" :style="brandColor.sub" style="padding:12px;text-align:end;">{{ callTime }}</div>
</div>
</template>
<script>

export default {
  name: 'CardCall',
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
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    callTime() {
      // diff 사용을 위해, 오늘 날짜 시간을 00:00:00으로 설정 (startOf('day'))
      let today = this.moment().startOf('day'); 
      let target = this.moment(this.card.created_time).startOf('day');
      
      if (today.format('YY-MM-DD')===target.format('YY-MM-DD')) {
        return '오늘';
      }
      else if (today.isAfter(target)) {
        let diff = today.diff(target, 'days');
        return `${diff}일 전`;
      }
      else return '';
    },
    device() {
      return this.$store.getters.device;
    }
  },
  watch: {
    
  }
}
</script>


