<template>
<div class="app-main">
    <div>
      <div>
        <page-header-mobile 
          v-if="visibleHeader"></page-header-mobile>
        <!--<category-gnb :style="gnbStyle"-->
        <!--  :mainPages="mainPages"-->
        <!--  v-if="visibleGnb"></category-gnb>-->
      </div>
      <!-- 페이지 타입 : 페이지 -->
      <keep-alive :include="$store.getters.alivePage">
        <router-view :style="[visibleHeader ? {marginTop: '50px'} : {},routerViewStyle]"></router-view>
      </keep-alive>
      <footer-mobile v-if="visibleFooter && footerDelay" :style="footerStyle"></footer-mobile>
      <!-- 하단 메뉴 -->
      <bottom-menu :menu="menu" v-if="visibleMenu"></bottom-menu>
    </div>
    
    <!-- 포탈 -->
    <!-- share 컴포넌트 포탈 -->
    <portal-target name="share"></portal-target>
    <!-- BtnCall 컴포넌트 전화연결 포탈 -->
    <portal-target name="btn-call-modal"></portal-target>
    
    <!-- 아래 페이지 타입은 삭제할 경우 정상동작 하지 않음 -->
    <!-- Launchpack Page Type -->
    <!-- 페이지 타입 : 오버레이 -->
    <div class="overlay-modal">
      <sweet-modal ref="overlayModal" @close="onCloseModal">
        <component @closePage="$refs.overlayModal.close()"
          v-bind="page_overlay_props"
          v-if="page_overlay" :is="page_overlay"></component>
      </sweet-modal>
    </div>
    <!-- 페이지 타입 : 모달 -->
    <div class="page-modal">
      <sweet-modal ref="pageModal" overlay-theme="dark" @close="onCloseModal">
        <div style="overflow-y:auto;max-height:70vh;">
          <component @closePage="closeModal"
            v-bind="page_modal_props"
            v-if="page_modal" :is="page_modal"></component>
        </div>
      </sweet-modal>
    </div>
    <!-- 페이지 타입 : 드로워(왼쪽) -->
    <drawer v-if="page_drawer_left" direction="left" :exist="true" ref="pageDrawerLeft">
      <div :style="drawerStyles">
        <component @closePage="$refs.pageDrawerLeft.close()"
          v-bind="page_drawer_left_props"
          :is="page_drawer_left"></component>
      </div>
    </drawer>
    <!-- 페이지 타입 : 드로워(오른쪽) -->
    <drawer v-if="page_drawer_right" direction="right" :exist="true" ref="pageDrawerRight">
      <div :style="drawerStyles">
        <component @closePage="$refs.pageDrawerRight.close()"
          v-bind="page_drawer_right_props"
          :is="page_drawer_right"></component>
      </div>
    </drawer>
    <!-- 페이지 타입 : 액션시트 -->
    <drawer v-if="page_actionsheet" direction="bottom" :exist="true" ref="pageActionsheet">
      <div :style="actionsheetStyles">
        <component @closePage="$refs.pageActionsheet.close()"
          v-bind="page_actionsheet_props"
          :is="page_actionsheet"></component>
      </div>
    </drawer>
    <!-- Launchpack Page Type -->
  </div>
</template>
<script>
import BottomMenu from "@/components/LaunchPack_Common/BottomMenu/BottomMenu"
import MyPage from "@/components/Components/Pages/MyPage/MyPage"
import PageHeaderMobile from "@/components/Components/Common/PageHeaderMobile"
import CategoryGnb from "@/components/Components/Common/CategoryGnb"
import FooterMobile from "@/components/Components/Footer/FooterMobile"
import PrivacyOverlay from "@/components/Components/Pages/PrivacyOverlay/PrivacyOverlay"
import TermsofserviceModal from "@/components/Components/Pages/TermsofserviceModal/TermsofserviceModal"
import PrivacyModal from "@/components/Components/Pages/PrivacyModal/PrivacyModal"
import MenuLoginDrawer from "@/components/Components/Pages/Menu/MenuLoginDrawer"
import PasswordEmail from "@/components/Components/Pages/PasswordEmail/PasswordEmail"
import MenuDrawer from "@/components/Components/Pages/Menu/MenuDrawer"
import StaffOverlay from "@/components/Components/Pages/StaffOverlay/StaffOverlay"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'Main',
  components: {
    BottomMenu,
    MyPage,
    PageHeaderMobile,
    CategoryGnb,
    FooterMobile,
    PrivacyOverlay,
    TermsofserviceModal,
    PrivacyModal,
    MenuLoginDrawer,
    PasswordEmail,
    MenuDrawer,
    StaffOverlay
  },
  mixins: [
    PageMixin
  ],
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      "menu": [],
      "address": {},
      "footerTo": undefined,
      "mainPages": [
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth": [
              1
            ],
            "depth1": "Gnbs",
            "visible": true
          },
          "name": "product",
          "header": true
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "region",
          "header": false
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "signin",
          "header": false
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "signup",
          "header": true
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "password",
          "header": false
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "insurance_search",
          "header": false
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "splash",
          "header": false
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "termsofservice",
          "header": false
        },
        {
          "gnb": {
            "all": [],
            "board": [],
            "depth1": "Gnbs",
            "visible": false
          },
          "name": "privacy",
          "header": false
        }
      ],
      "mainHeader": {
        "default": {
          "gnb": true,
          "header": true
        }
      },
      "pageFooter": [
        "media_detail",
        "media",
        "training_detail",
        "program",
        "call_list",
        "product",
        "contact",
        "contact_detail",
        "event",
        "product_detail",
        "search",
        "home",
        "notice",
        "partner_detail",
        "event_detail",
        "inquiry_reg",
        "like",
        "notice_detail",
        "contact_reg",
        "signup",
        "staff",
        "competition_detail",
        "competition_register",
        "competition",
        "training",
        "info"
      ],
      "page_modal": undefined,
      "footerDelay": false,
      "page_overlay": undefined,
      "page_actionsheet": undefined,
      "page_drawer_left": undefined,
      "page_modal_props": undefined,
      "page_drawer_right": undefined,
      "page_overlay_props": undefined,
      "page_actionsheet_props": undefined,
      "page_drawer_left_props": undefined,
      "page_drawer_right_props": undefined,
      "boards": [
        {
          "name": "Menu",
          "components": [
            {
              "template_name": "",
              "name": "MenuDrawer",
              "folder__name": "Menu",
              "login_required": false,
              "grade": null,
              "partner_grade": null
            },
            {
              "template_name": "",
              "name": "MenuLoginDrawer",
              "folder__name": "Menu",
              "login_required": true,
              "grade": 1,
              "partner_grade": null
            }
          ]
        },
        {
          "name": "PasswordEmail",
          "components": [
            {
              "template_name": "",
              "name": "PasswordEmail",
              "folder__name": "PasswordEmail",
              "login_required": false,
              "grade": null,
              "partner_grade": null
            }
          ]
        },
        {
          "name": "PrivacyModal",
          "components": [
            {
              "template_name": "",
              "name": "PrivacyModal",
              "folder__name": "PrivacyModal",
              "login_required": false,
              "grade": null,
              "partner_grade": null
            }
          ]
        },
        {
          "name": "PrivacyOverlay",
          "components": [
            {
              "template_name": "",
              "name": "PrivacyOverlay",
              "folder__name": "PrivacyOverlay",
              "login_required": false,
              "grade": null,
              "partner_grade": null
            }
          ]
        },
        {
          "name": "StaffOverlay",
          "components": [
            {
              "template_name": "",
              "name": "StaffOverlay",
              "folder__name": "StaffOverlay",
              "login_required": false,
              "grade": null,
              "partner_grade": null
            }
          ]
        },
        {
          "name": "TermsofserviceModal",
          "components": [
            {
              "template_name": "",
              "name": "TermsofserviceModal",
              "folder__name": "TermsofserviceModal",
              "login_required": false,
              "grade": null,
              "partner_grade": null
            }
          ]
        }
      ]
    }
  },
  created() {
    // this.$axios.get('public/ui/brand/admin').then(res => {
    //     this.menu = res.data.menu;
    // });
    
    this.$store.commit('setAlivePage', ['Home','Search','Like','Notice','Event']);

    this.$store.commit('setCommonStyle', {
      borderRadius: '6px',
      blockMarginBottom: '8px',
      blockMarginBottomPc: '8px',
      dummyImage: {
        bg: 'https://s3.ap-northeast-2.amazonaws.com/launchpack-dessertplace/media/img_dummy.png',
        person: 'https://s3.ap-northeast-2.amazonaws.com/launchpack-storage/media/img/default/img_person.png'
      },
      filter: {
        radio: 'full',   // default, full
        checkbox: 'full'   // default, full
      }
    });      

    // 필터 ID 세팅
    this.$store.commit('setCommonFilter', {
      productFilter: 1
    })
    
    this.setPageTypeOn();
    
    this.footerDelay=false;
    setTimeout(()=>{
      this.footerDelay=true;
    },500);
  },
  
  methods: {
    onCloseModal() {
      let body = document.getElementsByTagName('body')[0];
      body.removeAttribute('style')
    },
    closeModal() {
      this.page_modal = undefined;
      this.$refs.pageModal.close();
    },
    getPageName(prop) {
      let boards = this.boards.filter(item => { return item.name === prop })[0].components;

      if(this.isLogin) {
        let name = '';
        if(this.user.grade) {
          for(let i=this.user.grade.order; i>=1; i--) {
            name = this.getBoardsUserGrade(boards, i);
            if(name!=='') {
              break;
            }
          }
        }
        else {
          name = this.getBoardsUserLogin(boards);
        }

        if(name === '') {
          name = this.getBoardsGuest(boards);
        }
        return name;
      }
      else {
        return this.getBoardsGuest(boards);
      }
    },
    getName(board) {
      if(board.template_name !== '') {
        return this.dashToPascal(`${board.template_name}${board.name}`);
      } else {
        return board.name;
      }
    },
    dashToPascal(value) {
      let camel = value.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
          .replace('-', '')
          .replace('_', '');
      });
      return camel[0].toUpperCase() + camel.substring(1);
    },
    getBoardsGuest(boards) {
      let board = boards.filter(item=>{ return item.login_required === false });
      return board.length === 0 ? '' : this.getName(board[0]);
    },
    getBoardsUserLogin(boards) {
      let board = boards.filter(item=>{ return item.login_required === true && (item.grade === 1 || !item.grade) });
      return board.length === 0 ? '' : this.getName(board[0]);
    },
    getBoardsUserGrade(boards, grade) {
      let board = boards.filter(item=>{ return item.login_required === true && item.grade === grade });
      return board.length === 0 ? '' : this.getName(board[0]);
    },
    setPageTypeOn() {
      this.$root.$on('page_overlay', (res, props) => {
        this.page_overlay = this.getPageName(res);
        this.page_overlay_props = {prop: props};
        this.$refs.overlayModal.open();
      });
      this.$root.$on('page_modal', (res, props) => {
        this.page_modal = this.getPageName(res);
        this.page_modal_props = props;
        this.$refs.pageModal.open();
      });
      this.$root.$on('page_drawer_left', (res, props) => {
        this.page_drawer_left = this.getPageName(res);
        this.page_drawer_left_props = props;
        setTimeout(() => {
          this.$refs.pageDrawerLeft.open();
        }, 200);
      });
      this.$root.$on('page_drawer_right', (res, props) => {
        this.page_drawer_right = this.getPageName(res);
        this.page_drawer_right_props = props;
        setTimeout(() => {
          this.$refs.pageDrawerRight.open();
        }, 200);
      });
      this.$root.$on('page_actionsheet', (res, props) => {
        this.page_actionsheet = this.getPageName(res);
        this.page_actionsheet_props = props;
        setTimeout(() => {
          this.$refs.pageActionsheet.open();
        }, 200);
      });
    }
  },
  computed: {
    visibleHeader() {
      let obj = find(this.mainPages, 'name', this.$route.path.replace('/',''));
      if(!obj) return this.mainHeader.default.header;
      else return obj.header;
    },
    visibleGnb() {
      let obj = find(this.mainPages, 'name', this.$route.path.replace('/',''));
      if(!obj) return this.mainHeader.default.gnb;
      else return obj.gnb;
    },
    gnbStyle() {
      return {
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border
      }
    },
    visibleFooter() {
      // 현재 path
      let path = this.$route.path;
      if(this.previewPath) {
        path = this.previewPath;
      }
      path = path.replace('/','');
      
      return this.pageFooter.filter(item=>{ return path === item  }).length > 0;
    },
    drawerStyles() {
      return {
        width: `${this.$store.getters.deviceWidth}px`,
        height: '100vh',
        background: 'white',
        overflowY: 'auto'
      }
    },
    actionsheetStyles() {
      return {
        width: `${this.$store.getters.deviceWidth}px`,
        height: '150px',
        background: 'white',
        overflowY: 'auto'
      }
    },
    routerViewStyle() {
      let deco = {
        minHeight: 'calc(100vh - 50px)',
        paddingBottom: '50px'
      };
      if(this.visibleMenu)
        deco.paddingBottom = '72px'
      return deco;  
    },
    visibleMenu() {
        // if(this.$store.getters.brand.menu_type === 1) return false;
        if(this.$route.path.indexOf('signin')>-1) return true;
        else {
          let visible = false;

          return visible;
        }
      },
    footerStyle() {
      let deco = {};
      if(this.visibleMenu) {
        deco.paddingBottom = '50px';
      }
      return deco;
    }
  },
  watch: {
    $route(n, o) {
      if(n.path === '/signin') {
        if(o && o.path) {
          this.$store.commit('setPreviousPath', o.fullPath);
        }
      }
      
      if(this.$refs.drawer && this.$refs.drawer.active) {
        this.$refs.drawer.close();
      }
      if(this.footerTo) {
        clearTimeout(this.footerTo);
      }
      this.footerDelay=false;
      this.footerTo = setTimeout(()=>{
        this.footerDelay=true;
      },500);
    }
  }
}
</script>

<style>
.app-main .sweet-modal {
  overflow: hidden;
}

.app-main .sweet-modal .sweet-box-actions {
  top: 4px;
  right: 8px;
  z-index: 1000;
}
.app-main .sweet-modal .sweet-box-actions .sweet-action-close {
  color: #fff;
  display: none;
}
.app-main .sweet-modal .sweet-box-actions .sweet-action-close:hover {
  background: transparent !important;
}
.app-main .sweet-modal .sweet-content {
/*padding 0 !important*/
  text-align: left !important;
}

@media screen and (max-width: 600px) {
  .app-main .sweet-modal.is-mobile-fullscreen {
    height: unset;
    position: relative;
  }
  .app-main .page-modal .sweet-modal.is-mobile-fullscreen {
    height: unset;
    position: relative;
    width: 90%;
  }
  .app-main .overlay-modal .sweet-modal.is-mobile-fullscreen {
    height: unset;
    position: relative;
    width: 100%;
  }
  .app-main .sweet-modal-overlay {
    align-items: center;
    justify-content: center;
    display: flex;
  }
}

.modal-mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: 0;
  background: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-modal .sweet-modal {
  overflow: hidden;
  height: 100vh;
  max-width: 414px;
  overflow-y: hidden;
}

.overlay-modal .sweet-modal.is-alert .sweet-content {
  padding: 0 !important;
  height: 100vh;
}

.page-modal .sweet-modal {
  color: #999;
  display: block !important;
}
.page-modal .sweet-modal.is-alert .sweet-content {
  padding: 0 !important;
  max-height: 70vh;
}

/* transition */
.fade-enter-active {
  transition: opacity .5s ease-in-out;
}
.fade-enter {
  opacity: 0;
}
</style>
