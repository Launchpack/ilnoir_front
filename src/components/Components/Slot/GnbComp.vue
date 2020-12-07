<template>
  <div class="full-width" :style="containStyle" v-if="visibleGnb">

    <slot name="banner"></slot>

    <div v-if="menu && menu.length>0 && visibleGnb && visibleDepth.indexOf(1)>-1">
      <component :is="depthOne" :depth="1" :menu="menu" @clicked="clickTabOne" :indicatorStyle="indicatorStyle"
                 :selectedItemStyle="selectedItemStyle" :customItemStyle="customItemStyle"
                 ref="oneDepth"></component>
    </div>

    <div v-if="childListOne && childListOne.length>0 && visibleGnb && visibleDepth.indexOf(2)>-1 && visiblePath">
      <slot name="townpickMobileBanner"></slot>
      <component :is="depthTwo" :depth="2"  @clicked="clickTabTwo" :indicatorStyle="indicatorStyle" :menu="childListOne"
                 :selectedItemStyle="selectedItemStyle" :customItemStyle="customItemStyle"
                 ref="twoDepth"></component>
    </div>

    <div v-if="childListTwo && childListTwo.length>0 && visibleGnb && visibleDepth.indexOf(3)>-1 && visiblePath">
      <component :is="depthThree" :depth="3"  @clicked="clickTabThree" :indicatorStyle="indicatorStyle" :menu="childListTwo"
                 :selectedItemStyle="selectedItemStyle" :customItemStyle="customItemStyle"
                 ref="threeDepth"></component>
    </div>

  </div>
</template>

<script>
  import {dragscroll} from 'vue-dragscroll'
  import MenuMixin from '@/components/Mixins/MenuMixin'
  import TownpickImgTxtTGnbs from '@/components/LaunchPack_Common/Header/townpickImgTxt/Gnbs'
import TownpickImgTGnbs from '@/components/LaunchPack_Common/Header/townpickImg/Gnbs'
import ModowaImgTxtTGnbs from '@/components/LaunchPack_Common/Header/modowaImgTxt/Gnbs'
import TownpickImgTxtPcTGnbs from '@/components/LaunchPack_Common/Header/townpickImgTxtPc/Gnbs'
import Gnbs from '@/components/LaunchPack_Common/Header/Gnbs'
import TownpickImgPcTGnbs from '@/components/LaunchPack_Common/Header/townpickImgPc/Gnbs'
import BetweenTxtTGnbs from '@/components/LaunchPack_Common/Header/betweenTxt/Gnbs'
  export default {
    name: "GnbComp",
    components: {
      TownpickImgTxtTGnbs,
TownpickImgTGnbs,
ModowaImgTxtTGnbs,
TownpickImgTxtPcTGnbs,
Gnbs,
TownpickImgPcTGnbs,
BetweenTxtTGnbs
    },
    directives: {
      dragscroll
    },
    mixins: [
      MenuMixin
    ],
    props: {
      defaultGnb: {
        type: Object,
        required: false,
        default: function() {
          return {
            visible: true,
            depth1: 'Gnbs'
          }
        }
      },
      pagesGnb: {
        type: Array,
        required: false
      },
      // /product로 푸쉬하지 않을 path 지정
      exceptPath: {
        type: Array,
        required: false
      },
      // default path는 아니지만 gnb 2뎁스 이상을 보이게 하고 싶은 path
      displayPath: {
        type: Array,
        required: false
      },
      // 이동할 default path
      defaultPath: {
        type: String,
        required: false,
        default: '/product'
      },
      // 뎁스 클릭시 다음 뎁스 첫번째 항목 클릭 여부 default
      clickFirst: {
        type: Boolean,
        required: false,
        default: false
      },
      containStyle: {
        type: Object,
        required: false,
        default: function() {
          return {
            marginTop: '50px'
          }
        }
      },
      // 선택된 탭 id
      // qeury와 같이 number로 판단하고 싶을때 number로 치환시켜 보내주어야 한다
      initialTab: {
        type: [String, Number],
        required: false
      },
      selectedItemStyle: {
        type: Object,
        required: false
      },
      customItemStyle: {
        type: Object,
        required: false
      },
      indicatorStyle: {
        type: Object,
        required: false
      },
      scrollable: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    created() {
      if (this.initialTab!==undefined) {
        if (typeof(this.initialTab)==='number') {
          this.selectedTab = parseInt(this.initialTab);
        }
        else if (typeof(this.initialTab)==='string') {
          this.selectedTab = this.initialTab;
        }
      }
      this.menu = this.$store.getters.brand.menu_set.filter(item => { return item.style==='gnb' })[0].menu;

      if(this.$route.path===this.defaultPath || (this.exceptPath && this.exceptPath.filter(item => { return item===this.$route.path}).length>0)) {
        this.visiblePath = true;
      }
      else {
        this.visiblePath = false;
      }
      
      this.init();
      // this.getMenu();
    },
    mounted() {
    },
    data() {
      return {
        selectedTab: 0,
        selectedChildTab: undefined,
        selectedChildTabTwo: undefined,

        selectedBoard: undefined,
        depthOne: '',
        depthTwo: '',
        depthThree: '',
        visibleDepth: [1,2,3],
        visibleGnb: this.defaultGnb.visible,
        dragging: false,
        scrollArray: [],
        scrollArrayTwo: [],
        scrollArrayThree: [],
        selectedIndex1: undefined,
        selectedIndex2: undefined,
        selectedIndex3: undefined,
        visiblePath: false,

        childListOne: [],
        childListTwo: [],

        menu: undefined
      }
    },

    computed: {
      childStateOne() {
        let menu = this.computedMenu[0];
        if(menu && menu.child && menu.child.length>0) {
          return true;
        }
        else {
          return false;
        }
      },
      childStateTwo() {
        let menu = this.computedChildMenu ? this.computedChildMenu[0] : [];
        if(menu && menu.child && menu.child.length>0) {
          return true;
        }
        else {
          return false;
        }
      },
      grabStyle() {
        return {
          borderBottom: this.brandBorder.main.border,
        }
      },
      computedChildMenu() {
        let result = [];
        if(this.childStateOne && this.childListOne.length>0) {
          this.childListOne.forEach(item => {
            if(item.id === this.selectedChildTab) {
              result.push(item);
            }
          })
          return result;
        }
      },
      computedMenu() {
        let result = [];
        this.menu.forEach(item => {
          if(item.id === this.selectedTab)
            result.push(item);
        });
        return result;
      },
      divider1Style() {
        let deco = {
          backgroundColor: this.getColor('기본 테두리선 색상'),
          width: '100%',
          height: '1px'
        };
        if (this.dividerStyle!==undefined) deco = this.dividerStyle;
        return deco;
      },
      tabListStyle() {
        let deco = {};
        if(this.scrollable) {
          deco = {
            overflowX: 'scroll',
            flexWrap: 'nowrap',
            display: '-webkit-box'
          }
        }
        return deco;
      },
      isIE() {
        if (navigator.userAgent.indexOf('Trident') > -1) return true;
        else return false;
      }
    },

    watch: {
      '$route'(n,o) {
        if(n.path!==o.path) {
          if(n.path===this.defaultPath || (this.exceptPath && this.exceptPath.filter(item => { return item===n.path}).length>0) || (this.displayPath && this.displayPath.filter(item => { return item===n.path}).length>0) || (this.displayPath && this.displayPath.filter(item => { return item===n.path}).length>0)) {
            this.visiblePath = true;
          }
          else {
            this.visiblePath = false;

            // getVisibleDepth clickFirst 조건 초기화
            this.selectedChildTab = undefined;
            this.selectedChildTabTwo = undefined;
            
            if(this.$refs.oneDepth && this.$refs.oneDepth.$refs.dragscroll) {
              this.$refs.oneDepth.$refs.dragscroll.scrollTo({
                behavior: 'smooth',
                left: 0
              });
            }
          }
        }

        // if(this.$store.getters.device==='pc') {
          let n2 = n.query.category2;
          let n1 = n.query.category1;
          let menu = [];
          let child = [];
          if(n1) {
            menu = this.menu.filter(item1 => { return item1.id===Number(n1)});
            if(menu.length>0) {
              let index = this.menu.indexOf(menu[0]);
              if(this.$refs.oneDepth.$refs.dragscroll.scrollLeft===0) this.setScroll(index, 'one');
              if(menu[0].child) {
                this.childListOne = menu[0].child;
                if(menu[0].child.length>0 && n2) {
                  child = menu[0].child.filter(item2 => { return item2.id===Number(n2)});
                  if(child.length>0 && child[0].child) this.childListTwo = child[0].child;
                }
                this.getVisibleDepth();
              }
            }
          }
        // }
        
      }
    },

    methods: {
      // 클릭시 뎁스에 따라 알맞게 쿼리 변경
      clickDepth1(item, idx) {
        if(item.link) {
          this.routerPush(item.link);
        } else {
          let query = cloneItem(this.$route.query);
          if(this.selectedTab===0) query.gnb = '';
          else query.gnb = this.selectedTab;
          query.category1 = this.selectedTab;
          if(query.category2) delete query.category2;
          if(query.category3) delete query.category3;
          this.$route.meta.clickPush = true;
          if(this.exceptPath && this.exceptPath.length>0 && this.exceptPath.indexOf(this.$route.path)>-1) {
            this.$router.replace({
              path: this.$route.path,
              query: query
            }, ()=>{
              this.getVisibleDepth();
              this.scrollDepth1(item, idx);
            });
          }
          else {
            this.$router.replace({
              path: this.defaultPath,
              query: query
            }, ()=>{
              this.getVisibleDepth();
              this.scrollDepth1(item, idx);
            });
          }
        }
      },
      clickDepth2(item, idx) {
        let query = cloneItem(this.$route.query);
        query.gnb = this.selectedChildTab;
        query.category1 = this.selectedTab;
        query.category2 = this.selectedChildTab;
        if(query.category3) delete query.category3;
        this.$route.meta.clickPush = true;
        this.$router.replace({
          path: this.$route.path,
          query: query
        }, ()=>{
              this.getVisibleDepth();
              this.scrollDepth2(item, idx);
        });
      },
      clickDepth3(item, idx) {
        let query = cloneItem(this.$route.query);
        query.gnb = this.selectedChildTabTwo;
        query.category1 = this.selectedTab;
        query.category2 = this.selectedChildTab;
        query.category3 = this.selectedChildTabTwo;
        this.$route.meta.clickPush = true;
        this.$router.replace({
          path: this.$route.path,
          query: query
        }, ()=>{
            this.getVisibleDepth();
            this.scrollDepth3(item, idx);
        });
      },
      scrollDepth1(item, idx) {


        // 스크롤
        setTimeout(() => {
          this.$nextTick(() => {
            this.scrollArrayTwo = [];
            if(this.$refs.oneDepth&&this.$refs.oneDepth.$refs.dragscroll) {
              this.dragging = false;
              if(this.childListOne.length>0) {
                let totalWidth = 0;
                // 스크롤아이템 width 저장
                for (let i=0; i<this.childListOne.length; i++) {
                  if (this.$refs.twoDepth&&this.$refs.twoDepth.$refs.dragscroll&&this.$refs.twoDepth.$refs[`tabItem${i}`]&&this.$refs.twoDepth.$refs[`tabItem${i}`][0]) {
                    // console.log('refs', this.$refs.twoDepth.$refs[`tabItem${i}`])
                    let width = this.$refs.twoDepth.$refs[`tabItem${i}`][0].offsetWidth;
                    this.scrollArrayTwo.push({
                      id : this.childListOne[i].id,
                      name : this.childListOne[i].name,
                      width: width,                        // 본인 너비
                      accumulatedWidth: totalWidth+width   // 본인 누적너비
                    });
                    totalWidth += width;                   // 총 너비
                  }
                }
              }

              // 스크롤 중앙 정렬
              if(this.selectedTab === Number(this.$route.query.category1)) this.setScroll(idx, 'one');
            }
          })
        },300)

      },
      scrollDepth2(item, idx) {

        // 스크롤
        setTimeout(() => {
          this.$nextTick(() => {
            this.scrollArrayThree = [];
            if(this.$refs.twoDepth&&this.$refs.twoDepth.$refs.dragscroll) {
              this.dragging = false;
              if(this.childListTwo.length>0) {
                let totalWidth = 0;
                // 스크롤아이템 width 저장
                for (let i=0; i<this.childListTwo.length; i++) {
                  if (this.$refs.threeDepth&&this.$refs.threeDepth.$refs.dragscroll&&this.$refs.threeDepth.$refs[`tabItem${i}`]&&this.$refs.threeDepth.$refs[`tabItem${i}`][0]) {
                    // console.log('refs', this.$refs.threeDepth.$refs[`tabItem${i}`])
                    let width = this.$refs.threeDepth.$refs[`tabItem${i}`][0].offsetWidth;
                    this.scrollArrayThree.push({
                      id : this.childListTwo[i].id,
                      name : this.childListTwo[i].name,
                      width: width,                        // 본인 너비
                      accumulatedWidth: totalWidth+width   // 본인 누적너비
                    });
                    totalWidth += width;                   // 총 너비
                  }
                }
              }

              // 스크롤 중앙 정렬
              if(this.selectedChildTab === Number(this.$route.query.category2)) this.setScroll(idx, 'two');
            }
          })
        },300)

      },
      scrollDepth3(item ,idx) {
        if(this.$refs.twoDepth&&this.$refs.twoDepth.$refs.dragscroll) {
          this.dragging = false;

          // 스크롤 중앙 정렬
          if(this.selectedChildTabTwo === Number(this.$route.query.category3)) this.setScroll(idx, 'three');
        }
      },
      scrollInit1() {
        // 스크롤
        setTimeout(() => {
          this.$nextTick(() => {
            let totalWidth = 0;
            // 스크롤아이템 width 저장
            let index;
            for (let i=0; i<this.menu.length; i++) {
              if (this.$refs.oneDepth&&this.$refs.oneDepth.$refs.dragscroll&&this.$refs.oneDepth.$refs[`tabItem${i}`]&&this.$refs.oneDepth.$refs[`tabItem${i}`][0]) {
                // console.log('refs', this.$refs.oneDepth.$refs[`tabItem${i}`])
                let width = this.$refs.oneDepth.$refs[`tabItem${i}`][0].offsetWidth;
                this.scrollArray.push({
                  id : this.menu[i].id,
                  name : this.menu[i].name,
                  width: width,                        // 본인 너비
                  accumulatedWidth: totalWidth+width   // 본인 누적너비
                });
                totalWidth += width;                   // 총 너비
              }
              // 현재 선택된 탭 index 저장
              if (this.menu[i].id === this.selectedTab) {
                index = i;
              }
            }
            // 스크롤 중앙 정렬
            // if(this.selectedTab === Number(this.$route.query.category1)) this.setScroll(index, 'one');
          })
        },200)
      },
      scrollInit2() {
        // 스크롤
        setTimeout(() => {
          this.$nextTick(() => {
            let totalWidth = 0;
            // 스크롤아이템 width 저장
            let index;
            for (let i=0; i<this.childListOne.length; i++) {
              if (this.$refs.twoDepth&&this.$refs.twoDepth.$refs.dragscroll&&this.$refs.twoDepth.$refs[`tabItem${i}`]&&this.$refs.twoDepth.$refs[`tabItem${i}`][0]) {
                // console.log('refs', this.$refs.twoDepth.$refs[`tabItem${i}`])
                let width = this.$refs.twoDepth.$refs[`tabItem${i}`][0].offsetWidth;
                this.scrollArrayTwo.push({
                  id : this.childListOne[i].id,
                  name : this.childListOne[i].name,
                  width: width,                        // 본인 너비
                  accumulatedWidth: totalWidth+width   // 본인 누적너비
                });
                totalWidth += width;                   // 총 너비
              }
              // 현재 선택된 탭 index 저장
              if (this.childListOne[i].id === this.selectedChildTab) {
                index = i;
              }
            }
            // 스크롤 중앙 정렬
            // if(this.selectedChildTab === Number(this.$route.query.category2)) this.setScroll(index, 'two');
          })
        },200)
      },
      scrollInit3() {
        // 스크롤
        setTimeout(() => {
          this.$nextTick(() => {
            let totalWidth = 0;
            // 스크롤아이템 width 저장
            let index;
            for (let i=0; i<this.childListTwo.length; i++) {
              if (this.$refs.threeDepth&&this.$refs.threeDepth.$refs.dragscroll&&this.$refs.threeDepth.$refs[`tabItem${i}`]&&this.$refs.threeDepth.$refs[`tabItem${i}`][0]) {
                // console.log('refs', this.$refs.threeDepth.$refs[`tabItem${i}`])
                let width = this.$refs.threeDepth.$refs[`tabItem${i}`][0].offsetWidth;
                this.scrollArrayThree.push({
                  id : this.childListTwo[i].id,
                  name : this.childListTwo[i].name,
                  width: width,                        // 본인 너비
                  accumulatedWidth: totalWidth+width   // 본인 누적너비
                });
                totalWidth += width;                   // 총 너비
              }
              // 현재 선택된 탭 index 저장
              if (this.childListTwo[i].id === this.selectedChildTabTwo) {
                index = i;
              }
            }
            // 스크롤 중앙 정렬
            // if(this.selectedChildTabTwo === Number(this.$route.query.category3)) this.setScroll(index, 'three');
          })
        },200)
      },
      async getMenu() {
        let menu = await this.setMenus('gnb', 'mobile');
        // 임시
        // menu.unshift({
        //   name: "메인",
        //   link: "home"
        // });
        // let disableMenu = menu.filter(item=>{ return item.name === '매장거래' })[0];
        // disableMenu.disabled = true;
        //////

        this.menu = menu;

        this.init();
      },
      addAll(bor) {
        // 특정 뎁스 카테고리에 전체를 추가하는 로직

        // 2뎁스 이상 이동에서만 menu 전체 삭제 예외 처리
        if(this.$route.query&&!this.$route.query.category2) {
          if(bor.all && bor.all.indexOf(1)===-1) {
            if(this.menu.length>0&&this.menu[0].index===-1) {
              this.menu.splice(0,1);
            }
          }
        }

        if(bor.all && bor.all.length>0) {
          bor.all.forEach(item => {
            if(item===1) {
              if(this.menu.length>0&&this.menu[0].index!==-1) {
                this.menu.unshift({
                  id: 0,
                  value: 0,
                  label: '전체',
                  name: '전체',
                  index: -1,
                });
              }
            }

            if(item===2) {
              if(this.childListOne.length>0 && this.childListOne[0].index!==-1) {
                this.childListOne.unshift({
                  id: this.menu[this.selectedIndex1].id,
                  value: this.menu[this.selectedIndex1].id,
                  label: '전체',
                  name: '전체',
                  index: -1,
                  parent_id: this.menu[this.selectedIndex1].id
                });
              }
            }

            if(item===3) {
              if(this.childListTwo.length>0 && this.childListTwo[0].index!==-1) {
                this.childListTwo.unshift({
                  id: this.menu[this.selectedIndex1].child[this.selectedIndex2].id,
                  value: this.menu[this.selectedIndex1].child[this.selectedIndex2].id,
                  label: '전체',
                  name: '전체',
                  index: -1,
                  parent_id: this.menu[this.selectedIndex1].child[this.selectedIndex2].id
                });
              }
            }
          })
        }
      },
      getVisibleDepth() {
        console.log('getVisibleDepth')
        // 각 페이지보드마다 따로 정의한 visible gnb, depth 있는지 찾는 로직
        if (this.pagesGnb && this.pagesGnb.length>0) {
          console.log('pagesGnb')
          for (let i=0;i<this.pagesGnb.length;i++) {
            if('/'+this.pagesGnb[i].name === this.$route.path) {
              console.log('path', this.$route.path);
              if(this.pagesGnb[i].gnb.visible) {
                if(this.pagesGnb[i].gnb.board && this.pagesGnb[i].gnb.board.length>0) {

                  if(this.$route.query.category3) {
                    let bor = this.pagesGnb[i].gnb.board.filter(item => {
                      return item.category===Number(this.$route.query.category3)
                    })
                    if(bor.length>0) {
                      this.addAll(bor[0]);
                      this.visibleGnb = bor[0].visible;
                      this.visibleDepth = bor[0].depth;
                      if (bor[0].depth1) {
                        bor[0].depth1 = this.camelToDash(bor[0].depth1.replace('/','T'));
                        this.depthOne = bor[0].depth1;
                      }
                      if (bor[0].depth2) {
                        bor[0].depth2 = this.camelToDash(bor[0].depth2.replace('/','T'));
                        this.depthTwo = bor[0].depth2;
                      }
                      if (bor[0].depth3) {
                        bor[0].depth3 = this.camelToDash(bor[0].depth3.replace('/','T'));
                        this.depthThree = bor[0].depth3;
                      }
                      break;
                    }
                  }

                  if(this.$route.query.category2) {
                    let bor = this.pagesGnb[i].gnb.board.filter(item => {
                      return item.category===Number(this.$route.query.category2)
                    })
                    if(bor.length>0) {
                      this.addAll(bor[0]);
                      this.visibleGnb = bor[0].visible;
                      this.visibleDepth = bor[0].depth;
                      if (bor[0].depth1) {
                        bor[0].depth1 = this.camelToDash(bor[0].depth1.replace('/','T'));
                        this.depthOne = bor[0].depth1;
                      }
                      if (bor[0].depth2) {
                        bor[0].depth2 = this.camelToDash(bor[0].depth2.replace('/','T'));
                        this.depthTwo = bor[0].depth2;
                      }
                      if (bor[0].depth3) {
                        bor[0].depth3 = this.camelToDash(bor[0].depth3.replace('/','T'));
                        this.depthThree = bor[0].depth3;
                      }
                      // 첫뎁스 클릭
                      if (bor[0].clickFirst ? bor[0].clickFirst : this.clickFirst) {
                        if(this.childListTwo && this.childListTwo.length>0 && !this.selectedChildTabTwo) {
                          let query = cloneItem(this.$route.query);
                          this.selectedChildTabTwo = this.childListTwo[0].id;
                          query.gnb = this.selectedChildTabTwo;
                          query.category3 = this.selectedChildTabTwo;
                          this.$route.meta.clickPush = true;
                          this.$router.replace({
                            path: this.$route.path,
                            query: query
                          });
                        }
                      }
                      break;
                    }
                  }

                  if(this.$route.query.category1) {
                    let bor = this.pagesGnb[i].gnb.board.filter(item => {
                      return item.category===Number(this.$route.query.category1)
                    })
                    if(bor.length>0) {
                      this.addAll(bor[0]);
                      this.visibleGnb = bor[0].visible;
                      this.visibleDepth = bor[0].depth;
                      if (bor[0].depth1) {
                        bor[0].depth1 = this.camelToDash(bor[0].depth1.replace('/','T'));
                        this.depthOne = bor[0].depth1;
                      }
                      if (bor[0].depth2) {
                        bor[0].depth2 = this.camelToDash(bor[0].depth2.replace('/','T'));
                        this.depthTwo = bor[0].depth2;
                      }
                      if (bor[0].depth3) {
                        bor[0].depth3 = this.camelToDash(bor[0].depth3.replace('/','T'));
                        this.depthThree = bor[0].depth3;
                      }
                      // 첫뎁스 클릭
                      if (bor[0].clickFirst ? bor[0].clickFirst : this.clickFirst) {
                        if(this.childListOne && this.childListOne.length>0 && !this.selectedChildTab) {
                          let query = cloneItem(this.$route.query);
                          this.selectedChildTab = this.childListOne[0].id;
                          query.gnb = this.selectedChildTab;
                          query.category2 = this.selectedChildTab;
                          if(query.category3) delete query.category3;
                          this.$route.meta.clickPush = true;
                          this.$router.replace({
                            path: this.$route.path,
                            query: query
                          });
                        }
                      }
                      break;
                    }
                  }

                  this.visibleDepth = this.pagesGnb[i].gnb.depth ? this.pagesGnb[i].gnb.depth : [1,2,3];
                  this.visibleGnb = this.pagesGnb[i].gnb.visible;
                  this.addAll(this.pagesGnb[i].gnb);
                  console.log('GnbComp1', this.pagesGnb[i].gnb.depth2)
                  if(this.visibleDepth.indexOf(2)>-1 || this.visibleDepth.indexOf(3)>-1) {
                    if(this.pagesGnb[i].gnb.depth1) {
                      this.pagesGnb[i].gnb.depth1 = this.camelToDash(this.pagesGnb[i].gnb.depth1.replace('/','T'));
                      this.depthOne = this.pagesGnb[i].gnb.depth1;
                    }
                    if(this.pagesGnb[i].gnb.depth2) {
                      this.pagesGnb[i].gnb.depth2 = this.camelToDash(this.pagesGnb[i].gnb.depth2.replace('/','T'));
                      this.depthTwo = this.pagesGnb[i].gnb.depth2;
                      console.log('GnbComp2', this.depthTwo)
                    }
                    if(this.pagesGnb[i].gnb.depth3) {
                      this.pagesGnb[i].gnb.depth3 = this.camelToDash(this.pagesGnb[i].gnb.depth3.replace('/','T'));
                      this.depthThree = this.pagesGnb[i].gnb.depth3;
                    }
                  }
                  else {
                    if(this.pagesGnb[i].gnb.depth1) {
                      this.pagesGnb[i].gnb.depth1 = this.camelToDash(this.pagesGnb[i].gnb.depth1.replace('/','T'));
                      this.depthOne = this.pagesGnb[i].gnb.depth1;
                    }
                    else this.depthOne = this.camelToDash(this.defaultGnb.depth1.replace('/','T'));;
                  }
                  // 첫뎁스 클릭
                  if(this.$route.query.category2) {
                    if (this.pagesGnb[i].gnb.clickFirst ? this.pagesGnb[i].gnb.clickFirst : this.clickFirst) {
                      if(this.childListTwo && this.childListTwo.length>0 && !this.selectedChildTabTwo) {
                        let query = cloneItem(this.$route.query);
                        this.selectedChildTabTwo = this.childListTwo[0].id;
                        query.gnb = this.selectedChildTabTwo;
                        query.category3 = this.selectedChildTabTwo;
                        this.$route.meta.clickPush = true;
                        this.$router.replace({
                          path: this.$route.path,
                          query: query
                        });
                        break;
                      }
                    }
                  }
                  if(this.$route.query.category1) {
                    if (this.pagesGnb[i].gnb.clickFirst ? this.pagesGnb[i].gnb.clickFirst : this.clickFirst) {
                      if(this.childListOne && this.childListOne.length>0 && !this.selectedChildTab) {
                        let query = cloneItem(this.$route.query);
                        this.selectedChildTab = this.childListOne[0].id;
                        query.gnb = this.selectedChildTab;
                        query.category2 = this.selectedChildTab;
                        if(query.category3) delete query.category3;
                        this.$route.meta.clickPush = true;
                        this.$router.replace({
                          path: this.$route.path,
                          query: query
                        });
                        break;
                      }
                    }
                  }

                }

                else {
                  this.visibleDepth = this.pagesGnb[i].gnb.depth ? this.pagesGnb[i].gnb.depth : [1,2,3];
                  this.visibleGnb = this.pagesGnb[i].gnb.visible;
                  this.addAll(this.pagesGnb[i].gnb);

                  if(this.visibleDepth.indexOf(2)>-1 || this.visibleDepth.indexOf(3)>-1) {
                    if(this.pagesGnb[i].gnb.depth1) {
                      this.pagesGnb[i].gnb.depth1 = this.camelToDash(this.pagesGnb[i].gnb.depth1.replace('/','T'));
                      this.depthOne = this.pagesGnb[i].gnb.depth1;
                    }
                    if(this.pagesGnb[i].gnb.depth2) {
                      this.pagesGnb[i].gnb.depth2 = this.camelToDash(this.pagesGnb[i].gnb.depth2.replace('/','T'));
                      this.depthTwo = this.pagesGnb[i].gnb.depth2;
                    }
                    if(this.pagesGnb[i].gnb.depth3) {
                      this.pagesGnb[i].gnb.depth3 = this.camelToDash(this.pagesGnb[i].gnb.depth3.replace('/','T'));
                      this.depthThree = this.pagesGnb[i].gnb.depth3;
                    }
                  }
                  else {
                    if(this.pagesGnb[i].gnb.depth1) {
                      this.pagesGnb[i].gnb.depth1 = this.camelToDash(this.pagesGnb[i].gnb.depth1.replace('/','T'));
                      this.depthOne = this.pagesGnb[i].gnb.depth1;
                    }
                    else this.depthOne = this.camelToDash(this.defaultGnb.depth1.replace('/','T'));;
                  }
                  // 첫뎁스 클릭
                  if(this.$route.query.category2) {
                    if (this.pagesGnb[i].gnb.clickFirst ? this.pagesGnb[i].gnb.clickFirst : this.clickFirst) {
                      if(this.childListTwo && this.childListTwo.length>0 && !this.selectedChildTabTwo) {
                        let query = cloneItem(this.$route.query);
                        this.selectedChildTabTwo = this.childListTwo[0].id;
                        query.gnb = this.selectedChildTabTwo;
                        query.category3 = this.selectedChildTabTwo;
                        this.$route.meta.clickPush = true;
                        this.$router.replace({
                          path: this.$route.path,
                          query: query
                        });
                        break;
                      }
                    }
                  }
                  if(this.$route.query.category1) {
                    if (this.pagesGnb[i].gnb.clickFirst ? this.pagesGnb[i].gnb.clickFirst : this.clickFirst) {
                      if(this.childListOne && this.childListOne.length>0 && !this.selectedChildTab) {
                        let query = cloneItem(this.$route.query);
                        this.selectedChildTab = this.childListOne[0].id;
                        query.gnb = this.selectedChildTab;
                        query.category2 = this.selectedChildTab;
                        if(query.category3) delete query.category3;
                        this.$route.meta.clickPush = true;
                        this.$router.replace({
                          path: this.$route.path,
                          query: query
                        });
                        break;
                      }
                    }
                  }

                }

              }
              else {
                this.visibleGnb = this.pagesGnb[i].gnb.visible;
              }
            }
          }
          if(this.depthOne === '') {
            this.depthOne = this.camelToDash(this.defaultGnb.depth1.replace('/','T'));;
          }
        }
      },
      init() {
        // 1,2,3차 카테고리 목록 가져오기
        this.childListOne = [];
        this.childListTwo = [];

        if(this.$route.query.gnb && this.menu && this.menu.length>0) {
          for(let i=0;i<this.menu.length;i++) {
            if(this.menu[i].id === Number(this.$route.query.gnb)) {
              this.selectedTab = this.menu[i].id;
              this.selectedIndex1 = i;
              this.selectedChildTab = undefined;
              this.selectedChildTabTwo = undefined;
              if(this.menu[i].child.length>0) this.childListOne = this.menu[i].child;
              this.scrollInit1();
              this.clickDepth1(this.menu[i], i);
              break;
            }
            else {
              if(this.menu[i].child && this.menu[i].child.length>0) {
                for(let j=0;j<this.menu[i].child.length;j++) {
                  if(this.menu[i].child[j].id === Number(this.$route.query.gnb)) {
                    this.selectedTab = this.menu[i].id;
                    this.selectedChildTab = this.menu[i].child[j].id;
                    this.selectedChildTabTwo = undefined;
                    this.selectedIndex1 = i;
                    this.selectedIndex2 = j;
                    this.childListOne = this.menu[i].child;
                    if(this.menu[i].child[j].child.length>0) this.childListTwo = this.menu[i].child[j].child;
                    this.scrollInit1();
                    this.scrollInit2();
                    this.clickDepth2(this.menu[i].child[j], j);
                    break;
                  }
                  else {
                    if(this.menu[i].child[j].child && this.menu[i].child[j].child.length>0) {
                      for(let k=0;k<this.menu[i].child[j].child.length;k++) {
                        if(this.menu[i].child[j].child[k].id === Number(this.$route.query.gnb)) {
                          this.selectedTab = this.menu[i].id;
                          this.selectedChildTab = this.menu[i].child[j].id;
                          this.selectedChildTabTwo = this.menu[i].child[j].child[k].id;
                          this.selectedIndex1 = i;
                          this.selectedIndex2 = j;
                          this.selectedIndex3 = k;
                          this.childListOne = this.menu[i].child;
                          this.childListTwo = this.menu[i].child[j].child;
                          this.scrollInit1();
                          this.scrollInit2();
                          this.scrollInit3();
                          this.clickDepth3(this.menu[i].child[j].child[k], k);
                        }
                      }
                    }
                  }
                }
              }
            }

          }
          // this.selectedTab = Number(this.$route.query.gnb);
          // this.selectedChildTab = Number(this.$route.query.gnb);

          if(this.isIE) {
            setTimeout(() => {
              dragscroll.reset();
            },1000);
          }
          this.getVisibleDepth()
        }
        this.getVisibleDepth();
        this.scrollInit1();
      },
      itemStyle(id) {
        let obj = {
          padding: '13px 16px'
        };

        if (id===this.selectedTab) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.color = this.brandColor.brand.color;
            obj.borderBottom = `2px solid ${this.brandColor.brand.color}`;
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
          width: '36px',
          height: '36px',
          backgroundSize: 'cover',
          backgroundRepeat: 'noRepeat',
          borderRadius: '4px'
        };
        if(item.id===this.selectedChildTab) {
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

      childStyle(id) {
        let obj = {
          padding: '10px 0',
          borderBottom: this.brandBorder.main.border,
          borderRight: this.brandBorder.main.border
        };

        if (id===this.selectedChildTab) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.color = this.brandColor.brand.color;
          }
        }

        if (this.customItemStyle) {
          return Object.assign(obj, this.customItemStyle);
        } else {
          return obj;
        }
      },

      childTwoStyle(id) {
        let obj = {
          padding: '13px 16px'
        };

        if (id===this.selectedChildTabTwo) {
          if(this.selectedItemStyle) {
            return Object.assign(obj, this.selectedItemStyle);
          }
          else {
            obj.color = this.brandColor.brand.color;
            obj.borderBottom = `2px solid ${this.brandColor.brand.color}`;
          }
        }

        if (this.customItemStyle) {
          return Object.assign(obj, this.customItemStyle);
        } else {
          return obj;
        }
      },

      clickTabOne(item, idx) {

        // 드래그앤드 시 클릭방지
        if (this.dragging) {
          this.dragging = false;
          return;
        }
        else {

          this.childListOne = [];
          this.childListTwo = [];
          this.selectedChildTab = undefined;
          this.selectedChildTabTwo = undefined;
          this.selectedIndex2 = undefined;
          this.selectedIndex3 = undefined;
          this.selectedTab = item.id;
          this.selectedIndex1 = idx;
          if(item.child) this.childListOne = item.child;
          console.log('childListOne',this.childListOne)
          this.clickDepth1(item, idx);
          if(this.childListOne.length===0) {
            if(this.selectedTab || this.selectedTab===0) this.$emit('select', this.selectedTab, item);
          }

        }
      },
      clickTabTwo(item, idx) {
        // 드래그앤드 시 클릭방지
        if (this.dragging) {
          this.dragging = false;
          return;
        }
        else {

          this.childListTwo = [];
          this.selectedChildTabTwo = undefined;
          this.selectedIndex3 = undefined;
          this.selectedIndex2 = idx;
          this.selectedTab = item.parent_id;
          this.selectedChildTab = item.id;
          if(item.child) this.childListTwo = item.child;

          this.clickDepth2(item, idx);
          if(this.childListTwo.length===0) {
            this.$emit('select', this.selectedChildTab, item);
          }
        }
      },
      clickTabThree(item, idx) {
        console.log('clickTabThree', item, idx);
        // 드래그앤드 시 클릭방지
        if (this.dragging) {
          this.dragging = false;
          return;
        }
        else {
          this.selectedChildTab = item.parent_id;
          this.selectedChildTabTwo = item.id;
          this.selectedIndex3 = idx;

          this.clickDepth3(item, idx);
          this.$emit('select', this.selectedChildTabTwo, item);
        }
      },
      onDrag(e) {
        // 기종별 감도차이 때문에 0이 아닌 1로 약간의 여유있게 줌
        if (Math.abs(e.detail.deltaX) > 1) {
          this.dragging = true;
        }
      },
      // 선택된 탭을 스크롤 중앙으로
      setScroll(index, str) {
        let target = undefined;
        if(str==='one') {
          target = this.scrollArray[index];
          if (target) {
            let result = (target.accumulatedWidth - (target.width/2));
            result -= (this.$store.getters.deviceWidth/2);
            this.$refs.oneDepth.$refs.dragscroll.scrollTo({
              behavior: 'smooth',
              left: result
            });
          }
        }
        else if(str==='two') {
          target = this.scrollArrayTwo[index];
          if (target) {
            let result = (target.accumulatedWidth - (target.width/2));
            result -= (this.$store.getters.deviceWidth/2);
            this.$refs.twoDepth.$refs.dragscroll.scrollTo({
              behavior: 'smooth',
              left: result
            });
          }
        }
        else if(str==='three') {
          target = this.scrollArrayThree[index];
          if (target) {
            let result = (target.accumulatedWidth - (target.width/2));
            result -= (this.$store.getters.deviceWidth/2);
            this.$refs.threeDepth.$refs.dragscroll.scrollTo({
              behavior: 'smooth',
              left: result
            });
          }
        }

      }
    }

  }
</script>

<style lang="stylus" type="stylus" scoped>

  .list-horizontal
    overflow hidden

  .list-wrap
    overflow hidden

  .grab-bing
    white-space nowrap
    position relative

  .list-item
    display inline-block

</style>
