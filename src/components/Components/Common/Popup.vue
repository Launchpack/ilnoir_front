<template>
  <div v-if="usePopup" class="popup">
    <sweet-modal ref="popupModal" overlay-theme="dark" @close="closeModal">
      <div v-if="popup && popup.length===1" :style="[bgCoverStyle(popup[0].url),popupStyle]"></div>
      <div class="full-width" v-if="popup && popup.length>1">
        <image-slider
            :listData="popup" :height="320*4/3" :autoplay="true"
            :indicator="true"
            @reRender="$refs.popupModal.open()"></image-slider>
      </div>
      <div class="flex">
        <div class="close-area size-14 unselect"
             :style="brandColor.sub"
             @click="offToday">오늘 그만 보기</div>
        <div class="close-area size-14 unselect"
             :style="brandColor.primary"
             @click="offPopup">닫기</div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
  import { SweetModal } from 'sweet-modal-vue'
  import moment from 'moment'

  import ImageSlider from "../List/ImageSlider"
  import BlockMixin from "../../Mixins/BlockMixin";


  export default {
    name: "Popup",
    mixins: [
      BlockMixin
    ],
    components: {
      ImageSlider,
      SweetModal,

    },
    data() {
      return {
        popup: [],
        ratio: 0,
        usePopup: false
      }
    },
    created() {
      if (this.$store.getters.brand.plugins.indexOf('popup') !== -1) {
        this.usePopup = true;
      }
      this.deviceWidth = this.$store.getters.deviceWidth;
      this.getPopupList();
    },
    methods: {
      getPopupList() {
        this.$axios.get('public/popup').then(res=>{
          this.popup = res.data.data;
          this.ratio = res.data.ratio;
          this.$refs.popupModal.open();
        })
      },
      offToday() {
        let today = moment().format('YY-DD-MM');
        this.$store.commit('setHidePopup', today);
        this.$store.commit('setExposuredPopup', true);
        this.$refs.popupModal.close();
      },
      offPopup() {
        this.$store.commit('setExposuredPopup', true);
        this.$refs.popupModal.close();
      },
      closeModal() {
        this.$store.commit('setExposuredPopup', true);
      }
    },
    computed: {
      popupStyle() {
        return {
          height: `${320*4/3}px`
        }
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>

  .close-area
    width 50%
    padding 12px
    text-align center
</style>
<style lang="stylus">
  .popup .sweet-modal.is-alert .sweet-content
    padding 0 !important
</style>