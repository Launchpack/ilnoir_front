<template>
<div v-if="detail" :style="[brandBgColor.white]" style="border-radius:8px;padding:12px">
  <div class="size-12 flex-between" style="font-weight:500">
      <div class="flex-align">
        <div class="flex-align" style="border-radius:4px;padding:4px 6px;margin-right:8px" :style="brandBgColor.main">
          <i class="material-icons" style="color:#ffc351;font-size:18px;margin-right:6px">star</i>
          <div>{{ detail.rate ? detail.rate : '0' }}</div>
        </div>
        <div class="flex-align" style="border-radius:4px;padding:4px 6px;" :style="brandBgColor.main">
          <i class="material-icons" style="font-size:18px;margin-right:6px"
            :style="brandColor.brand">favorite</i>
          <div>{{ detail.like_count }}</div>
        </div>
      </div>
      <!--<div class="flex-align" style="border-radius:4px;padding:4px 6px;" :style="brandBgColor.main">-->
      <!--    <i class="material-icons" style="color:#ffc351;font-size:18px;margin-right:6px"-->
      <!--      :style="brandColor.sub">visibility</i>-->
      <!--    <div>{{ detail.visit }}</div>-->
      <!--  </div>-->
    </div>
  <div class="flex-justify">
    <div v-lazy:background-image="detail.img" class="lazy-background-image-cover" :style="imgStyle"></div>
  </div>
  
  <div style="margin-bottom:28px;text-align:center">
    <div class="size-20 weight-500 margin-bottom-16" :style="brandColor.primary">{{ detail.name }}</div>
    <div class="size-12" :style="brandColor.main" style="padding:0 36px">{{ detail.simple_desc }}</div>
  </div>
  
  <div style="padding:12px;border-radius:8px;margin-bottom:12px" :style="brandBgColor.main">
    <div class="size-14 weight-500 margin-bottom-4" :style="brandColor.main">주소</div>
    <div class="size-12" :style="brandColor.help">{{ detail.address }}</div>
  </div>
  
  <div style="padding:12px;border-radius:8px" :style="brandBgColor.main">
    <div class="size-14 weight-500 margin-bottom-4" :style="brandColor.main">대표전화</div>
    <div class="size-12" :style="brandColor.help">{{ detail.phone }}</div>
  </div>
  
  <div style="margin-top:24px">
    <div class="flex-between">
      <btn-pc styles="primary" width="200px" @onClick="clickCall">연락하기</btn-pc>
      <icon-circle-like likeType="partner" color="main"></icon-circle-like>
      <icon-circle-share @share="$refs.share.share=true" color="main"></icon-circle-share>
    </div>
  </div>

  <share ref="share" v-if="detail" :product="detail"></share>
</div>
</template>
<script>
import BtnPc from "@/components/Components/Button/BtnPc"

export default {
  name: 'BlockPartnerDetailCard',
  components: {
    BtnPc
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "detail": undefined
    }
  },
  created() {
    this.getData();
  },
  mounted() {
  },
  
  methods: {
    clickCall() {
      location.href = `tel:${this.detail.phone}`;
    },
    getData() {
      this.$api.PartnerDetail(this).then(res => {
        this.detail = res;
      })
    }
  },
  computed: {
    imgStyle() {
      return {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        margin: '24px 0'
      }
    },
    partnerStyle() {
      return {
        padding: '16px',
        border: `1px solid ${this.getColor('기본 테두리선 색상')}`
      }
    }
  },
  watch: {
    
  }
}
</script>


