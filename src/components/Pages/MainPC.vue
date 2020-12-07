<template>
<div style="font-weight:300">
    <page-header-local-pc v-if="showHeader"></page-header-local-pc>
    <router-view :style="pageStyle"></router-view>
    <!-- <footer-pc></footer-pc> -->
    
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
import PageHeaderLocalPc from "@/components/Components/Common/PageHeaderLocalPc"
import FooterPc from "@/components/Components/Footer/FooterPc"
import MyPage from "@/components/Components/Pages/MyPage/MyPage"
import PrivacyOverlay from "@/components/Components/Pages/PrivacyOverlay/PrivacyOverlay"
import TermsofserviceModal from "@/components/Components/Pages/TermsofserviceModal/TermsofserviceModal"
import PrivacyModal from "@/components/Components/Pages/PrivacyModal/PrivacyModal"
import MenuLoginDrawer from "@/components/Components/Pages/Menu/MenuLoginDrawer"
import PasswordEmail from "@/components/Components/Pages/PasswordEmail/PasswordEmail"
import MenuDrawer from "@/components/Components/Pages/Menu/MenuDrawer"
import StaffOverlay from "@/components/Components/Pages/StaffOverlay/StaffOverlay"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'MainPC',
  components: {
    PageHeaderLocalPc,
    FooterPc,
    MyPage,
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

  },
  data() {
    return {
      "menu": [],
      "showModal": undefined,
      "page_modal": undefined,
      "overlayLink": "",
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
    this.$axios.get('public/ui/brand/admin').then(res => {
        this.menu = res.data.menu_pc;
    });

      this.$store.commit('setAlivePage', ['Home','Category','Product','Search','BoardCat','Like','Notice', 'PartnerDetail']);

      this.$store.commit('setCommonStyle', {
        borderRadius: '6px',
        blockMarginBottom: '8px',
        blockMarginBottomPc: '8px',
        filter: {
          radio: 'full',   // default, full
          checkbox: 'full'   // default, full
        }
      });
      this.setPageTypeOn();
      
      this.$axios.get('/public/category')
      .then(res => {
        let list = res.data;
        list.unshift({
          id: "",
          name: '전체보기'
        })
        this.$store.commit('setCategory', list);
      })
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
      console.log('getPageName', prop, this.boards)
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
        this.page_overlay_props = props;
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
    drawerStyles() {
      return {
        width: `375px`,
        height: '100vh',
        background: 'white',
        overflowY: 'auto'
      }
    },
    actionsheetStyles() {
      return {
        width: `375px`,
        height: '150px',
        background: 'white',
        overflowY: 'auto'
      }
    },
    showHeader() {
      let arr = ['/signin'];
      let result = arr.some(item => {
        return this.$route.path.indexOf(item)>-1;
      })
      return !result;
    },
    pageStyle() {
      let deco = {
        minHeight: '100vh'
      };
      
      if (this.showHeader) {
        deco = {
          marginTop: '80px',
          minHeight: 'calc(100vh - 64px)',
          paddingBottom: '50px'
        };
      }
      
      return deco;
    },
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    $route(n, o) {
      if(n.path === '/signin') {
        if(o && o.path) {
          this.$store.commit('setPreviousPath', o.fullPath);
        }
      }
      
      
      if(this.$refs.drawer.active) {
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
<style scoped>
.modal-pc {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter {
  opacity: 0;
}
.page-modal .sweet-modal {
  color: #999;
  display: block !important;
}
.page-modal .sweet-modal.is-alert .sweet-content {
  padding: 0 !important;
  max-height: 70vh;
}
.overlay-modal .sweet-modal {
  overflow: hidden;
  height: 90vh;
  max-width: 600px;
}
</style>

