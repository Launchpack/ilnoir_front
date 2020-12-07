<template>
<div :style="pageBg">
  <div class="flex-justify">
    <div :style="pcMaxWidth">
      
      <div class="size-40 bold text-center" :style="[titleStyle, brandColor.brand]">GRIT12 굿즈</div>
    </div>
  </div>
    
    <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/38500665.png"
      :style="imgStyle">
  
  <div class="flex-justify">
    <div :style="pcMaxWidth">
      
      <div class="flex-center" style="padding:24px 0 16px">
        <div v-for="(item,idx) in categoryList" :key="'tab-'+item.id"
          class="flex-align">
          <div @click="clickTab(item)" style="padding:4px 8px"
            :style="tabStyle(item)" class="unselect">{{ item.name }}</div> 
          <div v-if="idx<categoryList.length-1" style="color:#888888">|</div> 
        </div>
      </div>
      
      <div class="flex-between position-relative" style="min-height: 112px">
        
        <div class="flex-align size-12" style="color:#CCCCCC">
          <div style="text-decoration:underline"
            >{{ productCount }}</div>
          <div>개의 상품</div>
        </div>
        <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
        
        <!-- 정렬 드롭다운 -->
        <div class="size-14 weight-500" :style="brandColor.main"
          v-click-outside="closeDropdown">
          <div class="dropdown flex-center unselect position-relative" :style="brandBgColor.main" style="z-index:1"
            @click.stop.prevent="toggleList">
            
            <!--선택된 값-->
            <i class="material-icons" style="font-size: 20px; margin-right:10px;"
              :style="{color: dropdown.isOpen ? brandColor.primary.color : brandColor.main.color}"
              >sort</i>
            <div v-if="dropdown.selected"
              :style="{color: dropdown.isOpen ? brandColor.primary.color : brandColor.main.color}"
              >{{ dropdown.selected.label }}</div>
              
            <!--리스트-->
            <ul v-if="dropdown.isOpen" class="dropdown-ul position-absolute" :style="brandBgColor.white">
              <li class="dropdown-item" style="padding: 12px 16px;"
                  v-for="(item, idx) in dropdown.options" :key="idx"
                  :style="itemStyle(idx)"
                  @click.stop.prevent="clickItem(item)"
                  @mouseover.stop.prevent="dropdown.mouseOverIndex=idx"
                  @mouseleave.stop.prevent="dropdown.mouseOverIndex=-1">
                {{ item.label }}
              </li>
            </ul>
          </div>
        </div>
        
      </div>

      <!-- 검색된 상품 목록 -->
      <list-vertical style="margin-top:32px;">
        <!--<div slot="middle-content" class="flex-between" style="align-items: flex-end; margin-bottom:16px;">-->
        <!--  <div>-->
        <!--    <div class="size-20 weight-500" :style="brandColor.main">{{ selectedCategory }}</div>-->
        <!--  </div>-->
        <!--</div>-->
        <div slot="card-grid" class="full-width">
          <transition-group name="fade" tag="div" class="full-width flex wrap">
            <div class="col-3"
              v-for="(item,idx) in list"
              :style="cardStyle(idx)"
              :key="`card-prod-${item.id}`">
              <card-product-pc :card="item"></card-product-pc>
            </div>
          </transition-group>
          <div v-if="list && list.length===0" key="empty-view"
              class="empty-view"
              :style="brandColor.sub">검색 결과가 없습니다.</div>  
              
        </div>
      </list-vertical>
      
      <pagination-default :pagingData="pagingData" :pageNum="3" :arrowEnd="false"
        @curPaginationNum="(val) => curNum(val)"
        v-if="pagingData"></pagination-default>
      
    </div>
  </div>
    <transition name="fade">
      <div v-if="showRegion" class="region-modal-bg flex-center" @click.stop.prevent="showRegion=false">
        <div class="region-modal" @click.stop>
          <block-region-pc 
            @closeRegion="showRegion=false"
            @setCurrent="currentStatus=true"
            @changePosition="region => changePosition=region"
            ></block-region-pc>
        </div>
      </div>
    </transition>
    
  </div>

  <!--  <page-header-mobile type="close" -->
  <!--  :currentStatus="currentStatus"-->
  <!--  @currentStatus="currentStatus=false"-->
  <!--  :changePosition="changePosition" -->
  <!--  @changePosition="changePosition=undefined"></page-header-mobile>-->
  <!--<div :style="[wrapperStyle, pageHeight, brandBgColor.main]">-->
  <!--  <block-region -->
  <!--    @setCurrent="currentStatus=true"-->
  <!--    @changePosition="region => changePosition=region"></block-region>-->
  <!--</div>-->
</template>
<script>
import LocationComp from "@/components/Components/Common/LocationComp"
import CardProductPc from "@/components/Components/Card/CardProductPc"
import FooterMobile from "@/components/Components/Footer/FooterMobile"
import BlockRegionPc from "@/components/Components/Block/BlockRegionPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import ListMixin from "@/components/Mixins/ListMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'ProductPc',
  components: {
    LocationComp,
    CardProductPc,
    FooterMobile,
    BlockRegionPc,
    BreadCrumbPc,
    PaginationDefault
  },
  mixins: [
    PageMixin,
    HeaderMixin,
    ListMixin,
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": undefined,
      "sorted": {
        "value": ""
      },
      "address": undefined,
      "category": undefined,
      "dropdown": {
        "isOpen": false,
        "options": [],
        "selected": {
          "label": "",
          "value": ""
        },
        "mouseOverIndex": -1
      },
      "imgStyle": {
        "width": "100%",
        "objectFit": "cover"
      },
      "breadcrumb": [],
      "pagingData": undefined,
      "setAddress": undefined,
      "showRegion": false,
      "searchValue": "",
      "selectedTab": 27,
      "sortOptions": undefined,
      "categoryList": [],
      "productCount": 0,
      "categoryAllId": "",
      "currentStatus": false,
      "selectedTabId": "",
      "changePosition": undefined,
      "curPaginationNum": undefined,
      "selectedCategory": "",
      "headerCenterStyle": {}
    }
  },
  created() {
    this.init();
  },
  
  methods: {
    curNum(num) {
      this.curPaginationNum = num;
      this.getData();
    },
    clickTab(item) {
      this.selectedTab = item.id;
      this.tabStyle(item);
      this.getData();
    },
    tabStyle(item) {
      let deco = {};
      
      if(item.id===this.selectedTab) {
        deco.color = 'white';
        deco.fontWeight = 'bold'
      }
      else {
        deco.color = '#888888'
      }
      
      return deco;
    },
    init() {
        this.pageLoadType = 'infinite';
        
        this.headerCenterStyle = {
          position: 'static',
          transform: 'none',
          left: 0
        };      

        // 카테고리
        // this.$axios.get('public/category').then(res=> {
        //   this.category = res.data;
        //   this.category.unshift({id:this.categoryAllId, name:'전체보기'})
          
          this.$axios.get('public/category')
        .then(res => {
          this.category = res.data;

          let lis = [];
          this.category.forEach(item => {
            if(item.packages&&item.packages.length>0) {
              if(item.packages[0]==='call') {
                lis.push(item);
              }
            }
          });
          this.categoryList = lis;

        })
          this.categoryList = lis;
          
          this.$axios.get(`public/service/set/filter/${1}`)
          .then(res =>{
            
            this.sortOptions = res.data.sort;

            // active 필터링            
            this.sortOptions = this.sortOptions.filter(item => item.is_active);
            
            // '거리순' 초기값 설정
            let distance = find(this.sortOptions, 'value', 'distance');
            if (distance) {
              let rmIdx = this.sortOptions.indexOf(distance);
              this.sortOptions.splice(rmIdx,1);
              this.sortOptions.unshift(distance);
              this.sorted = '-created_time'
            }
            
            // 정렬옵션 initialize
            if(this.sortOptions && this.sortOptions.length>0) {
              this.dropdown.options = this.sortOptions;
              this.dropdown.selected =this.dropdown.options[0];
            }         

            this.getData();
          });

        // })

      },
    getData() {
        // let location = '';
        // if (this.$store.getters.currentPosition===undefined) location = '';
        // else {
        //   location = `${this.$store.getters.currentPosition.lng},${this.$store.getters.currentPosition.lat}`;
        // }
        
        // if(this.$route.query.search) {
        //   this.searchValue = this.$route.query.search;
        // }
        // else this.searchValue = '';

        // let sorting = ''
        // if (typeof(this.sorted)==='string' && this.sorted !== '') {
        //   sorting = {
        //     value: this.sorted.replace('-visit', '-partner__visit').replace('-pop_score', '-partner__pop_score')
        //   }
        // }
        
        let num = 1;
        if(this.curPaginationNum) {
          num = this.curPaginationNum;
        }
        
        if (typeof(this.sorted)==='object'&&this.sorted.value!==undefined) this.sorted = this.sorted.value; 

        this.url = `user/${this.user.user_id}/mapping/product?fields=id,name,img,like_count,shared_count,visit,simple_desc,rate,reviews_count,partner,products.category,price`
        // this.url += '&search_keyword=' + encodeURI(this.searchValue);
        this.url += `&page_num=${num}&page_length=12`;
        // this.url += `&location=${location}`;
        this.url += `&ordering=${this.sorted}`;
        this.url += `&category=${this.selectedTab}`;
        
        // 카테고리로 브래드크럼 세팅
        //this.setBreadCrumb();
        // 카테고리 한글네임
        this.setCategoryName();
        
        this.currentPage = 1;

        this.$axios.get(this.url).then(res => {
          this.totalPages = res.data.total_page;
          this.totalCount = res.data.count;
          this.currentPage = 2;
          this.list = res.data.data;
          this.pagingData = res.data;
          this.productCount = res.data.count;
        });
      },
    setCategoryName() {
      if (this.category && this.category.length>0) {
        let sel = this.category.filter(item => item.id===this.tabId)[0];
        if (sel) {
          this.selectedCategory = sel.name;
        }
        else this.selectedCategory = '';
      }
    },
    setBreadCrumb() {
      this.breadcrumb = [];
      
      this.breadcrumb.push({
        "link": "home",
        "name": "홈"
      });

      // 카테고리 브래드크럼      
      let catList = [];
      this.category.forEach(cat => {
        let search = this.$route.query.search ? this.$route.query.search : '';
        cat.link = `product?tab=${cat.id}&search=${search}`
        catList.push(cat);
      })
      let currentBread;
      if (this.$route.query.tab===undefined || this.$route.query.tab==='') currentBread = catList[0];
      else currentBread = find(catList, 'id', parseInt(this.$route.query.tab));
      
      this.breadcrumb.push({
        name: currentBread.name,
        link: currentBread.link,
        list: catList
      })
    },
    onSelectSorted(val) {
        this.sorted = val;
        this.getData();
      },
    onClickTab(item) {
        this.selectedTabId = item;
        this.getData();
        this.setCategoryName();
      },
    updatePosition() {
        this.getData();
      },
    onVMap(value) {
        if (value) {
          this.headerCenterStyle = {
            position: 'absolute',
            transform: 'none',
            left: 0
          };
        }
        else {
          this.headerCenterStyle = {
            position: 'static',
            transform: 'none',
            left: 0
          };
        }
      },
    // 정렬 옵션 드롭다운
    toggleList() {
      this.dropdown.isOpen = !this.dropdown.isOpen;
    },
    closeDropdown() {
      this.dropdown.isOpen = false;
    },
    clickItem(item) {
      this.dropdown.selected = item;
      this.dropdown.isOpen = false;
      // this.$emit('selectSorted', item.value);
      this.onSelectSorted(item.value);
    },
    itemStyle(idx) {
      if (this.dropdown.mouseOverIndex==idx) {
        return {
          color: this.brandColor.primary.color
        }
      }
      else {
        return {
          color: this.brandColor.main.color
        }
      }
    },
    cardStyle(idx) {
      let obj = {
        // display: 'inline-block',
        // width: '320px',
        height: '316px',
      };
      
      let gutters = 16;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.marginBottom = `60px`;

      // if(idx%4===0) obj.paddingLeft = 0;
      // else if(idx%4===3) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    titleStyle() {
      return {
        padding: '140px 0 40px',
        borderBottom: this.brandBorder.main.border,
        marginBottom: '48px'
      }
    },
    pageBg() {
      return this.brandBgColor.main;
    },
    tabId() {
      let tab = "";
      if (this.$route.query.tab===undefined || this.$route.query.tab==="") tab = "";
      else tab = parseInt(this.$route.query.tab);
      return tab;
    },
    currentAddress() {
      // 현재 주소
      let add = this.address;
      if (add && add.sido && add.sigungu) {
        return `${add.sido} ${add.sigungu}`;
      }
      else return '';
    },
    containerStyle() {
        return {
          marginTop: '50px',
          minHeight: 'calc(100vh - 50px)',
          paddingBottom: '20px'
        }
      },
    headerStyles() {
        return {
          container: {
            // backgroundColor: 'white',
            color: '#fff',
            // fontWeight: 400
          }
        }
      },
    filtered() {
        return this.$store.getters.filtered.length > 0;
      },
    inputStyle() {
        return {
          border: 'none',
          width: '100%',
          height: '48px',
          backgroundColor: 'white',
          padding: '12px 40px 12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '12px',
          fontSize: '14px'
        }
      },
    iconSearchStyle() {
        return {
          position: 'absolute',
          top: '12px',
          right: '16px'
        }
      },
    btnStyles() {
        return {
          container: {
            // backgroundColor: 'white',
            // color: this.brandColor.primary.color,
            color: '#fff',
            fontWeight: 400
          }
        }
      },
    unsetCenter() {
        return {
          position: 'static',
          transform: 'none',
          left: 0
        }
      },
    selectedTabStyle() {
        return {
          padding: '12px 16px 11px',
          textAlign: 'center',
          fontSize: '14px',
          borderTop: this.brandBorder.main.border,
          borderBottom: `2px solid ${this.brandColor.primary.color}`,
          backgroundColor: '#fff',
          color: this.brandColor.primary.color
        }
      },
    unselectedTabStyle() {
        return {
          padding: '12px 16px',
          textAlign: 'center',
          fontSize: '14px',
          color: this.brandColor.main.color,
          backgroundColor: '#fff',
          borderTop: this.brandBorder.main.border,
        }
      }
  },
  watch: {
    $route(n) {
      this.list = undefined;
      this.getData();
    },
    address(n) {
      if (n) this.getData();
    }
  }
}
</script>
<style scoped>
.dropdown {
  border-radius: 8px;
  justify-content: space-between;
  padding: 14px;  
}
.dropdown-ul {
  background-color: white;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.24);
  border-radius: 4px;
  padding: 10px 0;
  top: 60px;
  right: 0;
  width: 120px;
}

.location-comp-absolute {
  position: absolute;
  left: calc(50% - 128px);
  background-color: #fff;
}

.location-comp-fixed {
  position: fixed;
  z-index: 101;
  background-color: #fff;  
  top: calc(((((100% - 64px - 540px) / 2) - 48px) / 2) + 64px); 
  left: calc(50% - 128px);
}

.region-modal-bg {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background: rgba(0,0,0,0.5);
  z-index: 100;
}
.region-modal {
  padding: 32px;
  width: 860px;
  height: 540px;
  background: #fff;
  border-radius: 8px;
  /*overflow-y: auto;*/
}
</style>

