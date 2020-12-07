<template>
<div :style="[containStyle, brandColor.main]">
    <div>
      <div class="size-20 weight-500 margin-bottom-4" :style="brandColor.main">문의</div>
      <div class="flex" style="font-size:16px;align-items:baseline">
        <div class="size-14" :style="brandColor.sub">{{ inquiryCount.count }}개의 사용자 문의</div>
      </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'CardInquiryTotal',
  components: {

  },
  mixins: [

  ],
  props: {
    inquiryCount: {
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
    }
  },
  watch: {
    
  }
}
</script>


