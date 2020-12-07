<template>
<div class="full-width full-height">
  
  <div class="flex-between" style="align-items: flex-start;">
    <div class="size-20 weight-500" :style="brandColor.main">지도로 위치 지정</div>
    <div class="position-relative">
      <input placeholder="주소를 검색하세요."
          :style="[brandBgColor.main, brandColor.main]"
          v-model="searchValue" 
          @keyup="e => searchValue = e.target.value" 
          @keyup.enter="search">
      <div v-if="vSearch" class="position-absolute full-width" style="background:white; z-index:10;">
        <div v-for="(item,idx) in listSearch" :key="'search-'+idx" class="unselect"
             style="padding:12px;" :style="{borderBottom: brandBorder.main.border}" @click="clickLocation(item)">
          <div :style="brandColor.main" class="size-12">{{ item.title }}</div>
        </div>
      </div> 
    </div> 
  </div>

    <!-- 지도 뷰 -->
    <div class="view-container position-relative" style="margin:16px 0 24px;">
      
      <!--지도-->
      <div :style="mapStyle" id="naver-map"></div>

      <!-- 내위치 찾기 버튼 -->
      <div class="unselect map-current-icon" @click="setCurrentPosition">
        <i class="material-icons" :style="brandColor.help">my_location</i>
      </div>
      
      <!-- 센터 -->
      <div class="unselect map-center-icon">
        <i class="material-icons size-30" :style="brandColor.primary">room</i>
      </div>

    </div>

    <div class="flex-center">
      <div class="flex-center unselect size-14 weight-500" :style="[brandColor.white, {backgroundColor: brandColor.sub.color}, radius]" 
        style="width: 192px; height: 48px; margin: 0 8px;" @click="$emit('closeMap')">이전</div>
      <div class="flex-center unselect size-14 weight-500" :style="[brandColor.white, {backgroundColor: brandColor.primary.color}, radius]" 
        style="width: 192px; height: 48px; margin: 0 8px;" @click="setMapLocation">이 위치로 검색</div>
    </div>
  </div>
</template>
<script>
import CardProduct from "@/components/Components/Card/CardProduct"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import ListMixin from "@/components/Mixins/ListMixin"

export default {
  name: 'BlockMapSearchPc',
  components: {
    CardProduct
  },
  mixins: [
    HeaderMixin,
    ListMixin
  ],
  props: {

  },
  data() {
    return {
      "map": undefined,
      "sorted": "",
      "vSearch": false,
      "listSearch": [],
      "mapOptions": {
        "lat": 35,
        "lng": 128,
        "zoom": 10,
        "draggable": true,
        "pinchZoom": true,
        "scrollWheel": true,
        "zoomControl": false,
        "mapTypeControl": false,
        "disableKineticPan": true,
        "keyboardShortcuts": false,
        "zoomControlOptions": {
          "position": "TOP_RIGHT"
        },
        "disableDoubleTapZoom": false,
        "disableDoubleClickZoom": false,
        "disableTwoFingerTapZoom": true
      },
      "searchValue": ""
    }
  },
  mounted() {
      setTimeout(()=> {
        this.setMap();
      }, 1000);
    },
  
  methods: {
    search() {
      // 지역 검색
      this.$axios.get(`public/service/local?search_text=${this.searchValue}`)
        .then(res => {

          if(res.data.local_list) {
            if(res.data.local_list.error) {
              this.listSearch = [];
              this.vSearch = false;
            }
            else {
              this.listSearch = res.data.local_list;
              this.vSearch = true;
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
    setMap() {
        // 지도 초기화
        this.map = new naver.maps.Map('naver-map', {
          mapTypeId: naver.maps.MapTypeId.NORMAL
        });
        this.map.setZoom(10);
        this.map.setOptions({
          zoomControl: false
        });
      },
    setCurrentPosition() {
        // 현재 위치 가져오기
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.map.setCenter(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
          }, error => {
            console.error(error);
          }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
          });
        }
      },
    clickLocation(value) {
        this.map.setCenter(new naver.maps.LatLng(value.y, value.x));
        this.vSearch = false;
        this.map.setZoom(8);
      },
    setMapLocation() {
      this.searchValue = "";
      
      let mapValue = this.map.center;
      if (mapValue) this.$emit('setMapLocation', mapValue);
    }
  },
  computed: {
    logo() {
      if (this.$store.getters.brand) return this.$store.getters.brand.logo;
    },
    headerSearchStyle() {
        return {
          background: 'white',
          // width: this.$store.getters.deviceWidth-2 + 'px',
          width: '100%',
          padding: '9px 16px',
          height: '50px'
        }
      },
    containerStyle() {
        return {
          // width: this.$store.getters.deviceWidth+'px',
          width: '100%',
          position: 'absolute',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 20,
          backgroundColor: '#fff'
        }
      },
    naverClientId() {
        //return this.$store.getters.social_key.naver.map.client_id;
        //test
        return '8wfvdojzry';
      },
    mapStyle() {
        return {
          width: '100%',
          height: '340px'
          // height: this.height + 'px'
        }
      }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.location-icon {
  position: absolute;
  top: 66px;
  left: 16px;
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
  height: 38px;
  }
  .location-icon i {
    font-size: 22px;
    color: #787878;
  }
  .input-search {
    border-radius: 50px;
    border: 1px solid #333;
    padding: 6px 12px;
    width: 100%;
    font-weight: 400;
  }
  input {
    height: 48px;
    width: 320px;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
  }
  .icon-input-search {
    position: absolute;
    top: 14px;
    left: 28px;
    font-size: 22px;
  }
  .icon-input-clear {
    position: absolute;
    top: 16px;
    right: 76px;
    font-size: 14px;
    color: #fff;
    border-radius: 50%;
    background-color: #aaa;
    padding: 2px;
  }
  .filter {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    width: 100%;
    background: #fff;
    padding: 8px;
  }
  .filter-content {
    text-align: center;
    border: 1px solid #ccc;
    border-right: 0;
    background: #fafafa;
    padding: 4px 12px;
    font-size: 13px;
    flex: 1;
  }
  .filter-button {
    border: 1px solid #787878;
    padding: 4px 8px;
    font-size: 13px;
  }
  .filter-button i {
    font-size: 16px;
    margin-top: 2px;
    margin-right: 4px;
  }
  .btn-set-location {
    background-color: rgb(233, 90, 37);
    bottom: 36px;
    width: 92%;
    left: 4%;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    height: 48px;    
    position: absolute;
    color: #fff;
    text-align: center;
    z-index: 1000;
  }
  .view-container {
    width: 100%;
    height: 340px;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*height: 100%;*/
    /*width: 100%;*/
  }
  .view-filter {
    background-color: #fff;
    z-index: 1000;
    top: 50px;
  }
  .view-list {
    background-color: #fff;
    z-index: 1000;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }
  .btn-cancel {
    padding: 6px 0px 6px 12px;
    font-size: 14px;
  }
  .current-location-icon {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    z-index: 999999;
  }
  .map-current-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .map-center-icon {
    position: absolute;
    top: calc(50% - 28px);
    left: calc(50% - 18px);
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    
  }
</style>
<style>
.slide-leave-to {
    animation: leaveToTop 0.3s both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 0;
  }
  .slide-enter-to {
    animation: enterFromBottom 0.3s both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1;
  }


  @keyframes leaveToTop {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
  @-webkit-keyframes leaveToTop {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
  @keyframes enterFromBottom {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @-webkit-keyframes enterFromBottom {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
