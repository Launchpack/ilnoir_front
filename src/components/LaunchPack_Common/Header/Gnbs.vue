<template>
<div>
  <div class="list-wrap full-width"
         v-dragscroll.x="true"
         @dragscrollmove.prevent.self="onDrag"
         :class="{'dragscroll':isIE}"
         ref="dragscroll"
         :style="grabStyle">
      <div class="grab-bing flex-align full-width" ref="grabbing">
        <div v-for="(item,idx) in menu"
             :key="'tab-'+item.id" class="unselect list-item"
             :style="itemStyle(item.id)"
             @click.stop.prevent="clickTab(item,idx)"
             :ref="'tabItem'+idx">
             {{ item.name }}
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
      "dragging": false,
      "selectedTab": undefined
    }
  },
  created() {
    this.times = this.moment().get('millisecond')
    this.init();
  },
  mounted() {

  },
  
  methods: {
    itemStyle(id) {
      let obj = {
        padding: '13px 16px'
      };

      if (id) {
        if (id===this.selectedTab) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.color = this.brandColor.brand.color;
            obj.borderBottom = `2px solid ${this.brandColor.brand.color}`;
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
            obj.color = this.brandColor.brand.color;
            obj.borderBottom = `2px solid ${this.brandColor.brand.color}`;
          }
        }
      }
      

      if (this.customItemStyle) {
        return Object.assign(obj, this.customItemStyle);
      } else {
        return obj;
      }
    }
  },
  computed: {
    
  },
  watch: {
    '$route.query.gnb'(n) {
      if(n) this.itemStyle(Number(n));
    }
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

