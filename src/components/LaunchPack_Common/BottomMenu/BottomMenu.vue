<template>
<div class="flex-align full-width" :style="containerStyle">
  <div :style="menuItemStyle" class="unselect" @click="clickBottomMenu(item)"
    v-for="item in menu" :key="`menu-${item.link}`">
    <div class="flex-center">
      <div class="position-relative" style="width:24px;height:24px">
        <i class="material-icons p-icon position-relative" :style="iconStyle(item)" v-if="item.icon && item.icon!==''">{{ item.icon }}</i>
        <div v-else-if="item.img_before || item.img_after"
             style="width:24px;height:24px"
             :style="imgStyle(item)"></div>
        <badge v-if="hasFeed(item)" :val="item.feed"></badge>
      </div>
    </div>
    <div :style="titleStyle(item)">{{ item.name }}</div>
  </div>
</div>
</template>
<script>

export default {
  name: 'BottomMenu',
  components: {

  },
  mixins: [

  ],
  props: {
    menu: {
      type: Array,
    },

  },
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    clickBottomMenu(item) {
        if (item.emit) {
          this.$emit(item.emit);
        }
        else if(item.link_type === 'outlink') {
          if(item.outlink.indexOf('http')>0) {
            location.href = item.outlink;
          } else {
            this.$router.push(item.outlink);
          }
        }
        else if (item.link!==undefined) {
          if(item.link_type && item.link_type !== 'link') {
            this.$root.$emit('page_'+item.link_type, item.link);
          }
          else {
           this.$router.push(item.link); 
          }
        }
      },
    currentPath(path) {
        return this.$route.path.indexOf(path) > -1;
      },
    imgStyle(item) {
        let deco = {
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
        if(this.currentPath(item.link)) {
          deco.backgroundImage = `url(${item.img_before})`;
        } else {
          deco.backgroundImage = `url(${item.img_after})`;
        }
        return deco;
      },
    iconStyle(item) {
        let deco = {};

        if(this.currentPath(item.link)) {
          deco = cloneItem(this.brandColor.brand);
        } else {
          deco = cloneItem(this.brandColor.sub);
        }
        return deco;
      },
    titleStyle(item) {
        let deco = {};

        if(this.currentPath(item.link)) {
          deco = cloneItem(this.brandColor.brand);
        } else {
          deco = cloneItem(this.brandColor.sub);
        }
        deco.fontSize = '10px';
        deco.marginTop = '4px';
        return deco;
      },
    hasFeed(item) {
        return item.feed && item.feed !== '' && item.feed !== '0' && item.feed !== 0;
      }
  },
  computed: {
    containerStyle() {
        let sub = 0;
        if(this.$store.getters.browserType === 'pc')
          sub = 4;
        return {
          position: 'fixed',
          zIndex: 10,
          background: 'white',
          borderTop: '1px solid #eee',
          width: `${this.$store.getters.deviceWidth - sub}px`,
          bottom: 0
        }
      },
    menuItemStyle() {
        let width = 100 / this.menu.length;
        return {
          width: `${width}%`,
          padding: '5px 0',
          textAlign: 'center',
          height:'50px'
        };
      }
  },
  watch: {
    
  }
}
</script>


