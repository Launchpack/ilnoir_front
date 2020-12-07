<template>
<div v-if="detail" :style="[brandColor.main]">
  <div class="size-20 weight-500 margin-bottom-16">1:1 문의</div>
    <div style="padding:12px;border-radius:8px" :style="brandBgColor.white">
      <!-- 문의 -->
      <div style="margin-bottom: 40px;">
        <div class="flex-between size-12 weight-500">
          <div :style="brandColor.primary"
            style="margin-bottom:4px;font-weight:500">{{ detail.type }}</div>
          <div :style="brandColor.sub" style="margin-bottom:4px">{{ dateFormat(detail.created_time, 'ago') }}</div>
        </div>
        <div class="size-14 margin-bottom-16 weight-500">{{ detail.title }}</div>
        <div class="size-12" style="white-space:pre-line;">{{ detail.content }}</div>
        <div style="margin: 12px 0;">
          <div v-for="item in detail.imgs" :key="item" 
            class="flex-align" style="margin: 4px 0;">
            <i class="material-icons" :style="brandColor.sub" style="font-size:18px; margin-right:4px;">attachment</i>
            <a :href="item" target="_blank" style="text-decoration:none;">
              <span :style="brandColor.primary" style="font-size:12px;">{{ item.split('/')[item.split('/').length-1] }}</span>
            </a>
          </div>
        </div>
      </div>
      <!-- 답변 -->
      <div v-if="detail.is_answered">
        <div style="padding:12px 16px 16px 12px;margin:16px 0 0 32px;border-radius:8px"
          :style="brandBgColor.main">
          <div class="flex-between weight-500 margin-bottom-16">
            <div class="size-14 ellipsis col-9">RE : {{ detail.title }}</div>
            <div class="size-12" :style="brandColor.sub">{{ dateFormat(detail.answer_time, 'ago') }}</div>
          </div>
          <div class="size-12" style="white-space:pre-line;">{{ detail.answer_content }}</div>
        </div>
      </div>
    </div>
    
    <btn :color="brandColor.white"
        :backgroundColor="brandBgColor.brand"
        @clicked="routerPush('contact')"
        style="margin: 48px 0 12px;"
        :style="$store.getters.device === 'mobile' ? {} : {width:'320px'} ">돌아가기</btn>  
</div>
</template>
<script>

export default {
  name: 'BlockContactDetail',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "detail": {}
    }
  },
  created() {
      this.$axios(`user/${this.$store.getters.user.user_id}/inquiry/personal/${this.$route.query.id}`)
      .then(res => {
        this.detail = res.data;
      })
    },
  
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


