<template>
<div :style="brandBgColor.white" style="border-radius:8px;margin-bottom:12px;padding:12px;cursor:pointer"
  @click="routerPush(`contact_detail?id=${card.id}`)">
  <div class="flex-between wrap">
    <div class="col-10">
      <div class="size-14 weight-500 ellipsis" :style="brandColor.main"
        style="width:90%">{{ card.title }}</div>
      <div class="size-12 ellipsis" :style="brandColor.sub"
        style="width:90%">{{ card.content }}</div>
    </div>
    <div class="col-2 weight-500" style="text-align:right;white-space:nowrap">
      <div class="size-10 margin-bottom-4" 
        :style="card.is_answered ? brandColor.primary : brandColor.sub"
        >{{ card.is_answered ? '답변 완료' : '미답변' }}</div>
      <div class="size-12" :style="brandColor.sub">{{ dateFormat(card.created_time, 'ago') }}</div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardContact',
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
    
  },
  watch: {
    
  }
}
</script>


