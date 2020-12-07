<template>
  <div class="flex full-width list-horizontal">
    <!-- PC -->
    <div v-if="isPC"
         class="list-wrap full-width"
         :ref="`${refName}`"
         :class="{ dragscroll: isIE }"
         v-dragscroll.x="true"
         @dragscrollmove.prevent.self="onDrag"
         :style="wrapStyle">
      <div class="grab-bing full-width"
           :style="grabStyle">
        <slot name="card"></slot>
      </div>
    </div>
    <!-- Mobile or IE -->
    <div v-else class="list-wrap" :style="wrapStyle">
      <div class="grab-bing drag-scroll-mobile" :style="grabStyle">
        <slot name="card"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import {dragscroll} from 'vue-dragscroll'

  export default {
    name: "ListHorizontal",
    directives: {
      dragscroll
    },
    props: {
      cardHeight: {
        type: Number,
        required: true
      },
      refName: {
        type: String,
        required: false
      },
      wrapCustomStyle: {
        type: Object,
        required: false
      }
    },
    created() {
      if(this.isIE) {
        setTimeout(() => {
          dragscroll.reset();
        },1000);
      }
    },
    computed: {
      wrapStyle() {
        let deco = {};
        if (this.wrapCustomStyle) {
          deco = this.wrapCustomStyle;
        }
        deco.height = this.cardHeight + 'px';
        return deco;
      },
      grabStyle() {
        return { height: (this.cardHeight+17) + 'px'};
      },
      isIE() {
        return navigator.userAgent.indexOf('Trident') > -1;
      },
      isPC() {
        return (this.$store.getters.browserType === 'pc');
      },
    },
    methods: {
      onDrag(e) {
        if(Math.abs(e.detail.deltaX) > 0) {
          this.$store.commit('setDragEnd', true);
        }
      },
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>


  .list-horizontal
    overflow hidden

  .list-wrap
    overflow hidden
    height 350px

  .grab-bing
    white-space nowrap
    position relative
    height 365px

  .drag-scroll-mobile
    overflow-x scroll
    -webkit-overflow-scrolling touch
    overflow-y hidden

</style>