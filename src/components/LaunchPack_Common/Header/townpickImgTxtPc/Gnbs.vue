<template>
<div>
  <div class="flex-justify full-width">
    <div v-for="(item,idx) in menu"
        :key="'tab-'+item.id" class="unselect list-item position-relative col-2"
        :style="itemStyle(item.id)"
        @click.stop.prevent="clickTab(item,idx)"
        :ref="'tabItem'+idx"
        >
        <div class="flex-justify">
          <div :style="categoryImg(item)"></div>
        </div>
        <div class="ellipsis size-14" 
          style="text-align:center;margin-top:4px;width:100%">{{ item.name }}</div>
        <div class="position-absolute"></div>
          <div v-if="item.id===selectedTab" class="indicator" :style="indicatorStyle"></div>     
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
      "dragging": false,
      "selectedTab": 0
    }
  },
  created() {
    this.init();
  },
  mounted() {

  },
  
  methods: {
    itemStyle(id) {
      let obj = {
        padding: '12px 6px 12px 12px',
        color: this.brandColor.sub.color
      };

      if(id) {
        if (id===this.selectedTab) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.color = this.brandColor.main.color;
            obj.fontWeight = 'bold';
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
            obj.color = this.brandColor.main.color;
            obj.fontWeight = 'bold';
          }
        }
      }

      if (this.customItemStyle) {
        return Object.assign(obj, this.customItemStyle);
      } else {
        return obj;
      }
    },
    categoryImg(item) {
        let obj = {
          width: '80px',
          height: '80px',
          backgroundSize: 'cover',
          backgroundRepeat: 'noRepeat',
          backgroundPosition: 'center',
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

