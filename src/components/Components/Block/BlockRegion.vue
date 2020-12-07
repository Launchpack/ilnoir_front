<template>
<div :style="pagePadding" style="padding-top:24px; padding-bottom:24px;">
  
  <!--주소 선택-->
  <div class="wrap" style="margin-bottom:32px;">
    <div class="title size-20 weight-500 margin-bottom-12" :style="brandColor.main">위치 지정</div>
    <div class="flex-align">
      <div class="col-6 button size-14 flex-between unselect" style="padding:16px;height: 48px;" 
        :style="[brandBgColor.white, brandColor.main, radius, colLeft]"
        @click="clickCurrent">
        내 위치로 지정
        <i class="material-icons size-20" :style="brandColor.help">gps_fixed</i>
      </div>
      <div class="col-6 button size-14 flex-between unselect" style="padding:16px;height: 48px;" 
        :style="[brandBgColor.white, brandColor.main, radius, colRight]"
        @click="showMap=true">
        지도로 위치 지정
        <i class="material-icons size-20" :style="brandColor.main">map</i>
      </div>
    </div>
  </div>
  <div class="wrap size-14 full-width overflow-hidden">
    <div class="title size-20 weight-500 margin-bottom-12" :style="brandColor.main">주소로 위치 지정</div>
    <!-- '시도 선택' / '시군구 선택' -->
    <div class="flex-align" style="margin-bottom:16px;">
      <div class="col-6" :style="[brandColor.main, colLeft]">시/도 선택</div>
      <div class="col-6" :style="[brandColor.main, colRight]">시/군/구 선택</div>
    </div>
    <!-- 시도/시군구 데이터 -->
    <div class="flex weight-500" :style="scrollStyle">
      <!-- 시도 (좌측) -->
        <div class="col-6" :style="colLeft">
          <div v-for="(item, idx) in sido"
               :key="`sido${idx}`"
               class="sido-item flex-align unselect"
               :style="[radius,itemStyle(item, 'sido')]"
               @click.stop.prevent="clickSido(item)"
               @mouseover.stop.prevent="overSido(item)"
               @mouseleave.stop.prevent="leaveSido">
            {{ item.name }}
          </div>
        </div>
      <!-- 시군구 (우측) -->
        <div class="col-6" :style="colRight">
          <div v-for="(item, idx) in sigungu"
               :key="`sigungu${idx}`"
               class="sigungu-item flex-align unselect"
               :style="[radius,itemStyle(item, 'sigungu')]"
               @click.stop.prevent="clickSigungu(item)"
               @mouseover.stop.prevent="overSigungu(item)"
               @mouseleave.stop.prevent="leaveSigungu">
            {{ item.name }}
          </div>
        </div>
    </div>
  </div>
  
  <!--맵뷰-->
  <block-map-search v-if="showMap" @closeMap="showMap=false" @setMapLocation="val => selectMap(val)"></block-map-search>
</div>
</template>
<script>
import BlockMapSearch from "@/components/Components/Block/BlockMapSearch"
import CardMixin from "@/components/Mixins/CardMixin"

export default {
  name: 'BlockRegion',
  components: {
    BlockMapSearch
  },
  mixins: [
    CardMixin
  ],
  props: {
    scrollHeight: {
      type: Number,
      default: 296,
      required: false,
    },

  },
  data() {
    return {
      "dong": [],
      "sido": [],
      "type": "service",
      "showMap": false,
      "sigungu": [],
      "hoverSido": {},
      "hoverSigungu": {},
      "selectedSido": {},
      "selectedSigungu": {}
    }
  },
  created() {
    // 시/도 데이터 가져오기
    this.$axios.get(`public/address/${this.type}/sido`)
      .then(res => {
        if ( res.status === 200 ) {
          this.sido = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  
  methods: {
    clickCurrent() {
      this.$emit('setCurrent');
      this.selectedSido = {};
      this.selectedSigungu = {};
    },
    // 마우스 오버, 클릭 style 때문에 methods로 처리
      itemStyle(item, type) {
        let deco = {
          color: this.brandColor.main.color,
          background: this.brandBgColor.sub.backgroundColor,
          marginBottom: this.layout_gutter+'px'
        };

        // 시도 아이템: 마우스오버 or 클릭 시 배경색상
        if ( type === 'sido' && item !== undefined ) {
          if ( item.id === this.hoverSido.id || item.id === this.selectedSido.id ) {
            deco.background = this.brandBgColor.primary.backgroundColor;
            deco.color = '#fff';
          }
        }

        // 시군구 아이템: 마우스오버 or 클릭 시 배경색상
        if ( type === 'sigungu' && item !== undefined ) {
          if ( item.id === this.hoverSigungu.id || item.id === this.selectedSigungu.id ) {
            deco.background = this.brandBgColor.primary.backgroundColor;
            deco.color = '#fff';
          }
        }

        return deco;
      },
    clickSido(item) {
        // 시군구 데이터 가져오기
        this.$axios.get(`public/address/${this.type}/sido/${item.id}/sigungu`)
          .then(res => {
            if ( res.status === 200 ) {
              this.sigungu = res.data;
              this.selectedSido = item;
              this.selectedSigungu = {};
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
    clickSigungu(item) {
        this.selectedSigungu = item;
        // this.$emit('selectedRegion', {
        //   sido: this.selectedSido,
        //   sigungu: this.selectedSigungu
        // });
        this.selectRegion();
      },
    selectRegion() {
        let address = `${this.selectedSido.name} ${this.selectedSigungu.name}`;
        
        if (this.selectedSido.name==='세종특별자치시') address = this.selectedSido.name;
        
        this.$axios.get(`/public/service/local?search_text=${address}`)
        .then(res => {
          if (res.status===200) {
            let location = res.data.local_list[0];
            this.$store.commit('setCurrentPosition', {
              lng: location.x,
              lat: location.y
            })
            this.$emit('changePosition', {
              lng: location.x,
              lat: location.y
            })
          }
        })        
      },
    selectMap(val) {
        this.$store.commit('setCurrentPosition', {
          lng: val.x,
          lat: val.y
        })
        this.$emit('changePosition', {
          lng: val.x,
          lat: val.y
        })
        this.showMap = false;
        this.selectedSido = {};
        this.selectedSigungu = {};
      },
    overSido(item) {
        this.hoverSido = item;
      },
    leaveSido() {
        this.hoverSido = {};
      },
    overSigungu(item) {
        this.hoverSigungu = item;
      },
    leaveSigungu() {
        this.hoverSigungu = {};
      }
  },
  computed: {
    colLeft() {
      return {
        marginRight: `${this.layout_gutter/2}px`
      }
    },
    colRight() {
      return {
        marginLeft: `${this.layout_gutter/2}px`
      }
    },
    scrollStyle() {
      let scrollbar = this.getScrollbarWidth();
      return {
        width: `calc(100% + ${scrollbar}px)`,
        height: `calc(100vh - ${this.scrollHeight}px)`,
        overflowY: 'scroll',
        overflowX: 'hidden'
      }
    }
  },
  watch: {
    
  }
}
</script>
<style scoped>
.sido-item, .sigungu-item {
    padding: 0 16px;
    height: 48px;
  }
</style>

