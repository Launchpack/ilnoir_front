<template>
<div class="page-header-local-pc full-width"
  style="background-color:white;border-bottom:1px solid #ebebeb;padding:14px 0"  @mouseleave="onLeave">
  <div class="flex-center">
    <div class="grid-box" :style="pcMaxWidth">
      <!-- 로고 -->
      <div class="col-2 flex-center">
        <img src="/claim/static/image/icon/logo.svg" style="height:52px; margin: 0 16px;"
          class="unselect" @click="routerPush('insurance_search')"/>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'PageHeaderLocalPc',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "showMenu": false,
      "hoverMore": false,
      "limitIndex": 4,
      "searchValue": "",
      "childrenMenu": [],
      "moreHoverIndex": undefined,
      "selectedMoreMenu": undefined,
      "hoverChildrenMenu": []
    }
  },
  created() {

  },
  mounted() {
    this.initChildMenu();
  },

  methods: {
    initChildMenu() {
      this.childrenMenu = [];
      this.list.forEach(item => {
        item.expand = false;
        item.children.forEach(child => {
          if(this.currentItem(child)) {
            item.expand = true;
            this.childrenMenu = item.children;
            this.hoverChildrenMenu = this.childrenMenu;
          }
        });
      });
    },
    clickMenu(item) {
      // this.childrenMenu = item.children;
      // this.hoverChildrenMenu = this.childrenMenu;
      this.routerPush(item.link);
    },
    onHover(item) {
      if(this.hoverChildrenMenu.length===0){
       this.hoverChildrenMenu = this.childrenMenu;
      }
      this.childrenMenu = item.children;
    },
    onLeave() {
      this.childrenMenu = this.hoverChildrenMenu;
    },
    clickChild(item) {
      this.routerPush(item.link);
    },
    getPath(item) {
      let routes = item.split('?');
      let path = routes[0];
      let query = null;
      if(routes.length>0) {
        query = {};
        routes.slice(1).forEach(res => {
          res.split('&').forEach(item => {
            let arr = item.split('=');
            query[arr[0]] = arr[1];
          });
        });
      }

      return {
        path: path,
        query: query
      }
    },
    currentItem(item) {
      let route = this.getPath(this.$route.fullPath.replace('/', ''));

      let result = false;

      if(!item.link_type || item.link_type === 'link') {
          let item_route = this.getPath(item.link);

        if(item_route.path === route.path) {
          result = true;
          if(item_route.query) {
            Object.keys(item_route.query).forEach(key=>{
              if(item_route.query[key] !== route.query[key]) {
                result = false;
              }
            });
          }
        }
      }

      return result;
    }
  },
  computed: {
    list() {
      let menu = this.$store.getters.brand.menu_set.filter(item =>{ return item.device === 'pc' })[0].menu;
      menu.forEach(item=> { item.expand = false; });
      return menu;
    }
  },
  watch: {
    '$route'() {
      this.initChildMenu();
    }
  }
}
</script>
<style scoped>
.page-header-local-pc {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.category-indicator {
  width: 100%;
  height: 3px;
  position: absolute;
  top: 58px;
  left: 0;
  right: 0;
  z-index: 1;
}
.menu-item {
  line-height: 80px;
  color: white;
}
.menu-item-selected {
  color: rgb(176 158 90);
  font-weight: 900;
}

.menu-divider {
  width: 1px;
  height: 16px;
  margin: 32px 0;
  background-color: white;
}
.bg-depth2 {
  background: linear-gradient(45deg, #074A33, #B39F5A);
  color: white;
}
.item-child {
  padding: 16px 0 10px 0;
  border-bottom: 6px solid transparent;
  text-align: center;
}
a {
  color: white;
  text-decoration: none;
}
.item-child-selected {
  border-bottom: 6px solid #074A33;
}
.divider-grident {
  width: 100%;
  height: 20px;
  background: linear-gradient(45deg, #b39f5a, #074A33);
}
</style>

