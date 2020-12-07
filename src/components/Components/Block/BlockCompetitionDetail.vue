<template>
<div v-if="detail" :style="[pagePadding, brandColor.main]">
      <div class="size-20 bold text-center" 
        :style="[titleStyle, brandColor.brand]">상세 내역 및 신청</div>
      
      <div :style="contentStyle">
        
      <img :src="detail.img" :style="imgStyle" class="margin-bottom-12">
        
      <div>
        <div class="size-25 text-center bold margin-bottom-4" :style="brandColor.primary"
          >{{ detail.name }}</div>
        <e-editor style="color:white" :html="detail.info"></e-editor>
        
          <div class="flex-align margin-bottom-12" v-if="comSchedule&&comSchedule.value">
            <div class="size-14 bold col-3" :style="brandColor.primary"
              >대회 일정</div>
            <div class="size-12 weight-500" style="color:#888888">
              {{ comSchedule.value[0] }} ~ {{ comSchedule.value[1] }}</div>
          </div>
          
          <div class="flex-align margin-bottom-12" v-if="comDate&&comSchedule.value">
            <div class="size-14 bold col-3" :style="brandColor.primary"
              >결선 일자</div>
            <div class="size-12 weight-500" style="color:#888888">{{ comDate.value }}</div>
          </div>
          
          <div class="flex-align margin-bottom-12" v-if="comRegion&&comRegion.value&&Object.keys(comRegion.value).length>0">
            <div class="size-14 bold col-3" :style="brandColor.primary"
              >대회 지역</div>
            <div class="size-12 weight-500" style="color:#888888">
              {{ comRegion.value.sido }} {{ comRegion.value.sigungu }}</div>
          </div>
          
          <div class="flex-align margin-bottom-12" v-if="comAge&&comAge.value&&comAge.value.length>0">
            <div class="size-14 bold col-3" :style="brandColor.primary"
              >참가 연령</div>
            <div class="size-12 weight-500" style="color:#888888">
              {{ comAge.value }}</div>
          </div>
          
          <div class="flex margin-bottom-12" v-if="comSpon&&comSpon.value&&comSpon.value.length>0">
            <div class="size-14 bold col-3" :style="brandColor.primary"
              >주최</div>
            <div style="width:88%">
              <div class="weight-500 col-10 margin-bottom-24" style="color:#888888;padding-right:40px"
                v-for="(spon,idx) in comSpon.value" :key="'spon-'+idx">
                <img :src="spon" :style="sponStyle">
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      <div class="flex-center" style="padding-top:20px">
        <div class="btn-list unselect" @click="clickBtn"
          :style="brandBgColor.primary">신청하기</div>
      </div>
    </div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockCompetitionDetail',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": undefined,
      "comAge": undefined,
      "curIdx": undefined,
      "detail": undefined,
      "comDate": undefined,
      "comSpon": undefined,
      "imgStyle": {
        "width": "100%",
        "maxHeight": "160px",
        "objectFit": "cover"
      },
      "comRegion": undefined,
      "sponStyle": {
        "width": "100%",
        "objectFit": "cover"
      },
      "comSchedule": undefined
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    clickBtn() {
      this.routerPush(`competition_register?id=${this.detail.id}`);
    },
    getData() {
      this.$axios.get(`/user/${this.user.user_id}/mapping/product/${this.$route.query.id}?fields=id,img,name,simple_desc,tags,form,order_conversion_type,category1,category2,category3,rate,stock,input,like_count,reviews_count,visit,price,partner,address,dong,distance,params,imgs,info,operating_time,phone,params,location`)
      .then(res => {
          this.detail = res.data;
          this.detail_params = this.cloneItem(this.detail.params);
          this.detail.params.forEach(item => {
            if(item.param_id===2) this.comSchedule = item;
            if(item.param_id===3) this.comDate = item;
            if(item.param_id===4) this.comRegion = item;
            if(item.param_id===5) this.comAge = item;
            if(item.param_id===6) this.comSpon = item;
          })
          this.setBreadCrumb();
          
          if(this.detail.params&&this.detail.params.length>0) {
            this.detail.params.forEach(item => {
              if(item.param_id===7&&item.value) {
                this.constructor = item.value;
              }
            })
          }
        });
      }
  },
  computed: {
    contentStyle() {
      return {
        padding: '16px 0',
        width: '100%',
      }
    },
    titleStyle() {
      return {
        padding: '20px 0',
        borderBottom: this.brandBorder.sub.border
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.btn-list {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    width: 140px;
    height: 36px;
    line-height: 36px;
  }
  .btn-list:hover {
    font-weight: 600;
  }
</style>

