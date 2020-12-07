<template>
<div :style="[containerStyle, pageBg]">
    
    <page-header-mobile @currentAddress="val=>address=val"></page-header-mobile>
    
    <div>

          <!-- 검색된 상품 목록 -->
          <list-vertical :style="pagePadding">

            <!-- 검색창 -->
            <div slot="above-sort" class="position-relative full-width" style="margin: 24px 0;">
              <input :style="inputStyle" type="text" placeholder="검색어를 입력하세요"
                     :value="searchValue" @input="e => searchValue = e.target.value" @keyup.enter="getData">
              <i class="material-icons unselect" :style="iconSearchStyle" @click="getData">search</i>
            </div>
            
            <div slot="middle-content" class="flex-between" style="align-items: flex-end; margin-bottom:16px;">
              
              <div>
                <div v-if="selectedCategory" class="size-20 weight-500" :style="brandColor.main">{{ selectedCategory }}</div>
                <div class="size-14" :style="brandColor.sub">{{ currentAddress }}의 상품들</div>
              </div>
              
              <!-- 정렬 드롭다운 -->
              <div class="size-12 weight-500" :style="brandColor.main" style="min-width:84px;"
                v-click-outside="closeDropdown">
                <div class="dropdown flex-center unselect" :style="brandBgColor.white" style="z-index:1"
                  @click.stop.prevent="toggleList">
                  
                  <!--선택된 값-->
                  <i class="material-icons" style="font-size: 20px; margin-right:2px;"
                    :style="{color: dropdown.isOpen ? brandColor.primary.color : brandColor.main.color}"
                    >sort</i>
                  <div v-if="dropdown.selected"
                    :style="{color: dropdown.isOpen ? brandColor.primary.color : brandColor.main.color}"
                    >{{ dropdown.selected.label }}</div>
                    
                  <!--리스트-->
                  <ul v-if="dropdown.isOpen" class="dropdown-ul position-absolute" :style="brandBgColor.white">
                    <li class="dropdown-item" style="padding: 8px 12px;"
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

            <div slot="card" v-if="list" style="min-height: 252px;">
            <transition-group name="fade" tag="div" class="grid-box">
                <card-product 
                  v-for="(item,idx) in list"
                  class="col-6"
                  :style="cardStyle(idx)"
                  :key="`card-prod-${item.id}-${idx}`"
                  :card="item"></card-product>
            </transition-group>
            </div>
            
          </list-vertical>

          <div v-if="list && list.length===0"
              class="empty-view"
              :style="brandColor.sub">검색 결과가 없습니다.</div>


    </div>
    
  </div>
</template>
<script>
import PageHeaderMobile from "@/components/Components/Common/PageHeaderMobile"
import CardProduct from "@/components/Components/Card/CardProduct"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import HeaderMixin from "@/components/Mixins/HeaderMixin"
import ListMixin from "@/components/Mixins/ListMixin"

export default {
  name: 'Search',
  components: {
    PageHeaderMobile,
    CardProduct
  },
  mixins: [
    PageMixin,
    HeaderMixin,
    ListMixin
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
      "dropdown": {
        "isOpen": false,
        "options": [],
        "selected": {
          "label": "",
          "value": ""
        },
        "mouseOverIndex": -1
      },
      "setAddress": undefined,
      "searchValue": "",
      "sortOptions": undefined,
      "selectedCategory": "",
      "headerCenterStyle": {}
    }
  },
  created() {
    this.setCategoryName();
    this.init();
  },
  updated() {
    // 현재 카테고리
    this.setCategoryName();
  },
  
  methods: {
    init() {
        this.pageLoadType = 'infinite';
        
        this.headerCenterStyle = {
          position: 'static',
          transform: 'none',
          left: 0
        };      

        let filterId = 1;
        if (this.$store.getters.commonFilter) {
          filterId = this.$store.getters.commonFilter.productFilter;
        }
        this.$axios.get(`public/service/set/filter/${filterId}`)
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
            this.sorted = 'distance'
          }
          
          // 정렬옵션 initialize
          if(this.sortOptions && this.sortOptions.length>0) {
            this.dropdown.options = this.sortOptions;
            this.dropdown.selected =this.dropdown.options[0];
          }         

          this.getData();
        });


        if(this.$route.query.search_tag) {
          this.searchValue = this.$route.query.search_tag;
        }

      },
    getData() {
        let location = '';
        if (this.$store.getters.currentPosition===undefined) location = '';
        else {
          location = `${this.$store.getters.currentPosition.lng},${this.$store.getters.currentPosition.lat}`;
        }

        let sorting = ''
        if (typeof(this.sorted)==='string' && this.sorted !== '') {
          sorting = {
            value: this.sorted.replace('-visit', '-partner__visit').replace('-pop_score', '-partner__pop_score')
          }
        }
        
        // 필터 정렬 사용X
        // else {
        //   sorting = this.$store.getters.sorted;
        // }

        this.url = this.urlAppendFilter(this.$store.getters.filtered, sorting,
          `user/${this.user.user_id}/mapping/product?fields=id,name,img,like_count,shared_count,visit,simple_desc,rate,reviews_count,partner,products.category` +
          '&search_keyword=' + encodeURI(this.searchValue));
        
        this.url += '&page_num=1&page_length=12';
        this.url += `&location=${location}`;
        
        if(Number(this.$route.query.gnb)) {
          this.url += `&category=${this.$route.query.gnb}`;
        }
        else {
          this.url += '&category=';
        }

        this.currentPage = 1;

        this.$axios.get(this.url).then(res => {
          this.totalPages = res.data.total_page;
          this.totalCount = res.data.count;
          this.currentPage = 2;
          this.list = res.data.data;
        });
      },
    setCategoryName() {
      let menu = this.$store.getters.brand.menu_set.filter(item => { return item.name === 'GNB' });
      if(menu && menu.length>0 && this.$route.query.gnb) {
        let sel = menu[0].menu.filter(item => { return item.id === Number(this.$route.query.gnb) })[0];
        if (sel) {
          this.selectedCategory = sel.name;
        }
        else this.selectedCategory = '';
      }
    },
    onSelectSorted(val) {
        this.sorted = val;
        this.getData();
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
      let obj = {}
      
      let gutters = this.$store.getters.brand.layout_gutters;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.paddingBottom = `${gutters}px`;
      
      if(idx%2===0) obj.paddingLeft = 0;
      else if(idx%2===1) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    pageBg() {
      return this.brandBgColor.main;
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
          minHeight: 'calc(100vh - 50px)'
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
    '$route.query.gnb'(n) {
      this.setCategoryName();
      this.getData();
    }
  }
}
</script>
<style scoped>
.dropdown {
    border-radius: 4px;
    justify-content: space-between;
    padding: 6px 10px;
  }
  
  .dropdown-ul {
    background-color: white;
    top: 40px;
    width: 96px;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.24);
    border-radius: 4px;
    right: 0;
    padding: 10px 0;
  }
</style>

