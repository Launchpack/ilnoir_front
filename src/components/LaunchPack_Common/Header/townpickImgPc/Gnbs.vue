<template>
<div>
  <div class="list-wrap full-width"
         v-dragscroll.x="true"
         @dragscrollmove.prevent.self="onDrag"
         :class="{'dragscroll':isIE}"
         ref="dragscroll">
      <div class="grab-bing flex-justify full-width" ref="grabbing">
        <div v-for="(item,idx) in menu"
             :key="'tab-'+item.id" class="unselect list-item"
             :style="itemStyle(item.id)"
             @click.stop.prevent="clickTab(item,idx)"
             :ref="'tabItem'+idx">
             <div class="flex-justify">
              <div :style="categoryImg(item)"></div>
            </div>
              <div v-if="item.id===selectedTab" class="indicator" :style="indicatorStyle"></div>     
        </div>
      </div>
    </div>
</div>
</template>
<script>
import GnbsMixin from "@/components/Mixins/GnbsMixin"

export default {
  name: 'Gnbs',
  components: {

  },
  mixins: [
    GnbsMixin
  ],
  props: {
    menu: {
      type: Array,
      required: false,
    },
    depth: {
      type: Number,
      required: false,
    },
    indicatorStyle: {
      type: Object,
      required: false,
    },
    customItemStyle: {
      type: Object,
      required: false,
    },
    selectedItemStyle: {
      type: Object,
      required: false,
    },

  },
  data() {
    return {
      "times": "",
      "allMenu": undefined,
      "dragging": false,
      "selectedTab": 0
    }
  },
  created() {
    this.times = this.moment().get('millisecond')
    this.resetMenu();
    this.init();
  },
  mounted() {

  },
  
  methods: {
    categoryImg(item) {
        let obj = {
          width: '75px',
          height: '75px',
          backgroundSize: 'cover',
          backgroundRepeat: 'noRepeat',
          borderRadius: '4px'
        };
        if(item.id===this.selectedTab) {
          if(item.img_after) {
            obj.backgroundImage = `url(${item.img_after})`;
          }
          else {
            obj.backgroundImage = `url(${this.dummyImage.bg})`;
          }
        }
        else {
          if(item.img_before) {
            obj.backgroundImage = `url(${item.img_before})`;
          }
          else {
            obj.backgroundImage = `url(${this.dummyImage.bg})`;
          }
        }
        
        return obj;
      },
    itemStyle(id) {
      let obj = {
        padding: '10px 4px'
      };

      if(id) {
        if (id===this.selectedTab) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.borderBottom = this.brandBorder.brand.border;
          }
        } 
      }
      else {
        let me = this.menu.filter(item => { return item.link === this.$route.path.slice(1) });
        if (me && me.length>0) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.borderBottom = this.brandBorder.brand.border;
          }
        }
      }

      if (this.customItemStyle) {
        return Object.assign(obj, this.customItemStyle);
      } else {
        return obj;
      }
    },
    resetMenu() {
      if(this.menu && this.menu.length>0) {
        if(this.menu[0].index===-1) {
          if(!this.menu[0].img_before || !this.menu[0].img_after) {
            this.menu[0].img_before = 'https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/townpick/non-path/12351679.png';
            this.menu[0].img_after = 'https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/townpick/non-path/12351679.png';
            return this.menu;
          }
        }
      }
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.list-wrap {
  overflow: hidden;
}
.grab-bing {
  white-space: nowrap;
  position: relative;
}
.list-item {
  display: inline-block;
}
</style>

