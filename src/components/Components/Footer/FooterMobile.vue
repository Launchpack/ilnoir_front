<template>
<div class="bg" :style="pageBg">
    <div :style="pagePadding">
      <!-- SNS버튼 -->
      <div v-for="(item,idx) in snsList" :key="'sns-btn-'+idx" 
          class="grid-box"
          :style="snsBtnStyle(idx)">
        <div class="col-6 flex-center">
          <img class="icon" :src="item.icon">
        </div>
        <div class="col-6">{{ item.name }}</div>
      </div>
    </div>
    <!-- 로고 -->
    <div class="bg-inner" :style="pagePadding" style="color:#cccccc">
      <div class="flex-align">
        <img :src="info.img" style="height: 108px; margin-right:12px;">
        <div style="color:white;font-size:25px;font-weight:600">GRIT 12</div>
      </div>
      <div class="info">© Copyright GRIT 12<br>{{ address }}<br>Tel. {{ info.call }}</div>
    </div>
    <div class="divider-grident"></div>
  </div>
</template>
<script>

export default {
  name: 'FooterMobile',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "snsList": [
        {
          "icon": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/26619349.png",
          "link": "",
          "name": "공식 페이스북"
        },
        {
          "icon": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/20629595.png",
          "link": "",
          "name": "공식 트위터"
        },
        {
          "icon": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/30456652.png",
          "link": "",
          "name": "공식 인스타그램"
        }
      ]
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    snsBtnStyle(idx) {
        let deco = {
          textAlign: 'center',
          color: 'white',
          fontWeight: '600',
          lineHeight: '58px',
          fontSize: '18px',
          marginBottom: '8px'
        };
        if(idx === 0) {
          deco.backgroundColor = '#3667A0';
        }
        else if(idx === 1) {
          deco.backgroundColor = '#4EB3EF';
        }
        else if(idx === 2) {
          deco.background = 'linear-gradient(90deg, #DF9970, #DC3B77, #5364CF)';
        }
        return deco;
      }
  },
  computed: {
    address() {
        return this.$store.getters.service.business_info.address.full;
      },
    pageBg() {
        return this.brandBgColor.main;
      },
    info() {
        return this.$store.getters.service.business_info;
      }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.bg {
    padding-top: 20px;
  }
  .bg-inner {
    background-image: url(https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/29491417.png);
    width: 100%;
    padding: 32px 0 20px 0;
    background-size: cover;
    background-position: center;
  }
  .icon {
    width: 28px;
    height: 28px;
  }
  .info {
    font-size: 12px;
    line-height: 26px;
    font-weight: 200;
    margin-top: 20px;
  }
  .divider-grident {
    width: 100%;
    height: 20px;
    background: linear-gradient(45deg, #b39f5a, #074A33);
  }
</style>

