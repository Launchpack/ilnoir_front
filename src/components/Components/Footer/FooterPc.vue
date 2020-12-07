<template>
<div :style="[brandBgColor.main]">
  <div class="grid-box" style="padding:40px 0">
    <template v-for="idx in 2">
      <div class="col-3 size-15 bold position-relative" :style="[brandColor.white, brandBgColor.main]"
        style="padding:0 6px">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/24813818_thumb.png"
          :style="imgBanner">
        <div class="position-absolute flex-center full-width full-height" 
          style="left:0;top:0;color:white">
          <div>함께 한 선수</div>
          <div :style="brandColor.brand" 
            style="font-size:80px;margin:0 8px">55</div>
          <div>명</div>
        </div>
      </div>
      
      <div class="col-3 size-15 bold position-relative" :style="[brandColor.white, brandBgColor.main]"
        style="padding:0 6px">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/24813818_thumb.png" :style="imgBanner">
        <div class="position-absolute flex-center full-width full-height" 
          style="left:0;top:0;color:white">
          <div>축구 대회</div>
          <div :style="brandColor.brand" 
            style="font-size:80px;margin:0 8px">7</div>
          <div>번의 우승</div>
        </div>
      </div>
    </template>
  </div>
  
  <div class="footer-bg">
    <div>
      <div class="size-28 weight-400" :style="brandColor.main" style="text-align:center;margin-bottom:24px">Follow social media</div>
      <div class="flex-center">
        <div class="unselect btn-fb">
          <img class="social-icon" src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/26619349.png">
          <div>Grit12<br>Facebook</div>
        </div>
        <div class="unselect btn-twt">
          <img class="social-icon" src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/20629595.png">
          <div>Grit12<br>Twitter</div>
        </div>
        <div class="unselect btn-insta">
          <img class="social-icon" src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/30456652.png">
          <div>Grit12<br>Instagram</div>
        </div>
      </div>
    </div>
    <div style="margin:24px auto 0 auto" :style="pcMaxWidth">
    
    <div class="flex-align">
      <img :src="info.img" class="object-fit-contain" style="height: 108px; margin-right:12px;" />
      <div style="color:white;font-size:30px;font-weight:600">GRIT 12</div>
    </div>
    
    <div style="margin-top:20px;color:#cccccc" class="size-14 flex-between">
      <div class="flex-align">
        <div style="margin-right:40px">© Copyright GRIT 12</div>
        <div>{{ address }}</div>
      </div>
      <div class="flex-align">
        <template v-for="(item, idx) in menu">
          <router-link :to="item.link">
            <div :key="'footer-menu-'+idx" class="unselect menu-item">{{  item.name }}</div>
          </router-link>
        </template>
      </div>
    </div>
    
  </div>
  </div>
  <div class="divider-grident"></div>
</div>
</template>
<script>

export default {
  name: 'FooterPc',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "menu": [
        {
          "link": "info",
          "name": "About us"
        },
        {
          "link": "program",
          "name": "Grit 12"
        },
        {
          "link": "competition",
          "name": "Soccer Cup"
        },
        {
          "link": "product",
          "name": "Goods"
        },
        {
          "link": "notice",
          "name": "News"
        }
      ]
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
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
    },
    center() {
      return this.$store.getters.service.service_center;
    },
    imgBanner() {
      return {
        width: '428px',
        height: '156px',
        objectFit: 'cover'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.footer-menu {
  margin-right:20px;
}
.divider-grident {
  width: 100%;
  height: 20px;
  background: linear-gradient(45deg, #b39f5a, #074A33);
}

.footer-bg {
  background-image: url(https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/29491417.png);
  box-shadow: inset 0 30px 80px 30px #0c0c23;
  width: 100%;
  padding: 48px 0 20px 0;
  background-size: cover;
  background-position: center;
}

.btn-fb, .btn-twt, .btn-insta {
  color: white;
  width: 190px;
  height: 100px;
  padding: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
  
}
.social-icon {
  width: 50px;
  height: 50px;
  margin-right: 12px;
}
.btn-fb {
  background-color: #3667A0;
}
.btn-twt {
  background-color: #4EB3EF;
}
.btn-insta {
  background: linear-gradient(135deg, #DF9970, #DC3B77, #5364CF);
}
.menu-item {
  padding: 0 16px;
  border-right: 1px solid white;
}
.menu-item:last-child {
  border-right: 0;
}
a {
  color: white;
  text-decoration: none;
}
</style>

