<template>
<div class="position-relative">
<page-header :styles="styles" style="border-bottom: '1px solid #ebebeb'">
    <!-- <div slot="left">
      <i v-if="visibleMenu" class="material-icons unselect" 
        style="padding:10px;" @click.stop.prevent="clickMenu">menu</i>
    </div> -->
    <div slot="left" v-if="leftVisible">
      <i class="material-icons unselect" style="color:#585858"
        @click="clickBack">arrow_back</i>
    </div>

    <div slot="center">
      <img src="/static/image/icon/logo.svg" style="height:30px; margin: 0 16px;" @click="routerPush('insurance_search')"/>
    </div>
  </page-header>

  <div class="col-8 position-fixed" :style="[modalStyle,brandBgColor.main]" 
    v-if="modalState" v-click-outside="closeModal">
    <div class="flex wrapper">
      <div :style="menuWrap">
        <div v-for="(item,idx) in list" :key="'menu-'+idx">
          <div @click="clickItem(item)" :style="menuStyle(item)"
            class="flex-between size-15 bold">
            <div>{{ item.name }}</div>
            <i class="material-icons"
              style="color:#CCCCCC">{{ item.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</i>
          </div>
          
          <div class="child-box size-12" v-if="item.expand">
            <div v-for="(child,cidx) in item.children" :key="'child-'+cidx"
              :style="brandColor.white" class="child-menu"
              @click="clickChild(child, item)">
              {{ child.name }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex-center">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/26619349_thumb.png"
          class="icon">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/20629595_thumb.png"
          class="icon">
        <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/30456652_thumb.png"
          class="icon">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import HeaderMixin from "@/components/Mixins/HeaderMixin"

export default {
  name: 'PageHeaderMobile',
  components: {

  },
  mixins: [
    HeaderMixin
  ],
  props: {
    type: {
      type: String,
      required: false,
    },
    currentStatus: {
      type: Boolean,
      required: false,
    },
    changePosition: {
      type: Object,
      required: false,
    },

  },
  data() {
    return {
      "list": [],
      "modalState": false,
      leftInvisiblePath: ['/request_done'],
      leftVisible: true
    }
  },
  created() {
    // this.getList();
    this.getVisible();
  },
  mounted() {
  },
  
  methods: {
    getVisible() {
      if(this.leftInvisiblePath.indexOf(this.$route.path)>-1) {
        this.leftVisible = false;
      }
      else {
        this.leftVisible = true;
      }
    },
    getList() {
      let menu = this.$store.getters.brand.menu_set.filter(item =>{ return item.device === 'pc' })[0].menu;
      menu.forEach(item=> { item.expand = false; });
      this.list = menu;
    },
    menuStyle(item) {
      let deco = {
        padding: '14px 8px',
        borderBottom: this.brandBorder.sub.border
      }
      
      if(item.expand) {
        deco.color = this.brandColor.brand.color;
      }
      
      else {
        deco.color = this.brandColor.white.color;
      }
      
      return deco;
    },
    clickMenu() {
      // this.routerDrawerRight('Menu');
      this.modalState = !this.modalState;
    },
    closeModal() {
      this.modalState = false;
    },
    clickItem(item) {
      item.expand = !item.expand;
      this.menuStyle(item);
    },
    clickChild(child, item) {
      item.expand = false;
      this.routerPush(child.link)
    }
  },
  computed: {
    modalStyle() {
      return {
        height: window.innerHeight-50 + 'px',
        zIndex: '999',
        top: '50px',
        left: '0'
      }
    },
    menuWrap() {
      return {
        height: window.innerHeight -100 + 'px',
        overflowY: 'scroll'
      }
    },
    visibleMenu() {
      return !this.type && this.$store.getters.brand.menu_type <= 1;
    },
    logo() {
      if (this.$store.getters.brand) return this.$store.getters.brand.logo;
    },
    searchPage() {
      if (this.$route.path.indexOf('search')>-1) return true;
      else return false;
    },
    styles() {
      return {
        container: {
          backgroundColor: 'white',
        }
      }
    }
  },
  watch: {
    '$route.path'(n, o) {
      if(n!==o) {
        this.modalState = false;
        this.getVisible();
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  justify-content: space-between;
  flex-direction: column;
}
.icon {
  width: 24px;
  height: 24px;
  margin: 8px 16px;
}
.child-box {
  background-color: #0C0C23;
  padding: 16px 12px;
}
.child-menu {
  padding: 10px 0;
}
</style>

