<template>
<div class="flex-justify" style="min-height: 50vh"
  >
  <div v-if="product" :style="pcMaxWidth">
    <!--<div ref="cardHeight" style="min-height: 112px;">-->
    <!--  <transition name="fade">-->
        <!--<bread-crumb-pc :breadcrumb="breadcrumb" v-if="breadcrumb"></bread-crumb-pc>-->
    <!--  </transition>-->
    <!--</div>-->
    
    <div :style="wrapStyle" class="flex-align">
      <div class="col-6">
        <!--<img :src="product.img" :style="imgStyle">-->
        <div style="margin-right: 16px" class="full-width">
          <!--<div v-lazy:background-image="product.img" class="lazy-background-image" :style="imgStyle"></div>-->
          <img v-if="product.imgs.length === 0" :src="product.img" :style="imageStyle">
          <block-product-detail-images v-else :imgs="product.imgs"></block-product-detail-images>
        </div>
        
      </div>
      
      <div class="col-6">
        <!--상품 정보-->
        <div style="padding-left:80px" :style="brandColor.white">
          <div class="size-28 margin-bottom-30 bold">{{ product.name }}</div>
          
          <div class="flex-align margin-bottom-20">
            <div class="size-17 col-3" style="color:#CCCCCC">판매가</div>
            <div class="size-20 bold" :style="brandColor.white">{{product.price.sale_price | currency}}</div>
          </div>       
          
          <div class="flex-align" style="margin-bottom:60px" v-if="constructor">
            <div class="size-17 col-3" style="color:#CCCCCC">제조사</div>
            <div class="size-15" style="color:#CCCCCC">{{constructor}}</div>
          </div>          
          
          <btn-pc styles="primary" style="cursor:default" @onClick="$refs.callModal.open()"
            width="100%">구매 문의</btn-pc>
          <!--<icon-circle-like likeType="product" color="main"></icon-circle-like>-->
        </div>
      </div>

      
      <!-- 전화연결 팝업 -->
      <sweet-modal ref="callModal" overlay-theme="dark">
        <modal @confirm="clickCall" @cancel="$refs.callModal.close()">
          <div slot="header">전화연결</div>
          <div slot="content">연결 버튼을 누르시면 전화연결이 진행됩니다. 진행하시겠습니까?</div>
        </modal>
      </sweet-modal>
    </div>
  </div>
</div>
</template>
<script>
import BtnPc from "@/components/Components/Button/BtnPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockProductDetailImages from "@/components/Components/Block/BlockProductDetailImages"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockProductDetailCardPc',
  components: {
    BtnPc,
    BreadCrumbPc,
    BlockProductDetailImages
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "product": undefined,
      "breadcrumb": [],
      "fixedState": true,
      "imageStyle": {
        "width": "100%",
        "height": "460px",
        "objectFit": "cover"
      },
      "constructor": "",
      "layoutWidth": undefined
    }
  },
  created() {
    this.getMaxWidth();
    this.getData();
    // this.detectClientHeight();

  },
  mounted() {
    // this.$nextTick(() => {
    //   window.addEventListener('scroll', this.detectClientHeight);
    // });
  },
  updated() {
    this.detectClientHeight();
  },
  
  methods: {
    getMaxWidth() {
      this.$axios.get('public/ui/brand/admin').then(res => {
        this.layoutWidth = res.data.layout_maxwidth;
      })
    },
    getData() {
      this.$axios.get(`/user/${this.user.user_id}/mapping/product/${this.$route.query.id}?fields=id,img,name,simple_desc,tags,form,order_conversion_type,category1,category2,category3,rate,stock,input,like_count,reviews_count,visit,price,partner,address,dong,distance,params,imgs,info,operating_time,phone,params,location`)
      .then(res => {
          this.product = res.data;
          this.product_params = this.cloneItem(this.product.params);
          this.setBreadCrumb();
          
          if(this.product.params&&this.product.params.length>0) {
            this.product.params.forEach(item => {
              if(item.param_id===7&&item.value) {
                this.constructor = item.value;
              }
            })
          }
        });
      },
    detectClientHeight() {
      this.$nextTick(function() {
        if(this.$refs.cardHeight) {
          if (document.documentElement.scrollTop > this.$refs.cardHeight.clientHeight) {
            this.fixedState = true;
            this.$emit('fixedState', true);
          }
          else {
            this.fixedState = false;
            this.$emit('fixedState', false);
          }
        }
      })
    },
    clickCall() {
      let user_id = this.$store.getters.user.user_id;
        let url = `user/${user_id}/product/${this.$route.query.id}/call`;
        this.$axios.get(url).then(res=>{
          location.href = `tel:${res.data.call}`;
          this.$refs.callModal.close();
        })
    },
    setBreadCrumb() {
      this.breadcrumb.push({
        "link": "home",
        "name": "홈"
      });
      
      for(let i=0;i<this.categories.length;i++) {
        this.categories[i].link = `product?tab=${this.categories[i].id}`
        
        if(this.product&&this.product.category1 === this.categories[i].id) {
          this.breadcrumb.push({
            name: this.categories[i].name,
            link: this.categories[i].link,
            list: this.categories
          })
        }
      }
      
      this.breadcrumb.push({
        link: `product_detail?id=${this.product.id}`,
        name: this.product.name
      })
      
      // let catList = [];
      // this.category.forEach(cat => {
      //   let search = this.$route.query.search ? this.$$route.query.search : '';
      //   cat.link = `product?tab=${cat.id}&search=${search}`
      //   catList.push(cat);
      // })
      // let currentBread;
      // if (this.$route.query.tab===undefined || this.$route.query.tab==='') currentBread = catList[0];
      // else currentBread = find(catList, 'id', parseInt(this.$route.query.tab));
      
      // this.breadcrumb.push({
      //   name: currentBread.name,
      //   link: currentBread.link,
      //   list: catList
      // })
      
      
    },
    clickUp() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    },
    clickDown() {
      document.documentElement.scrollTop = document.body.scrollHeight;
    }
  },
  computed: {
    wrapStyle() {
      return {
        padding: '32px 0',
        borderBottom: `2px solid ${this.getColor('보조 테두리선 색상')}`
      }
    },
    productImgWidth() {
      return parseInt(this.pcMaxWidth.width, 10) * 66/100;
    },
    imgStyle() {
      return {
        width: '100%',
        objectFit: 'cover'
      }
    },
    partnerImg() {
      return {
        width: '48px',
        height: '48px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("${this.product.partner.img}")`,
        borderRadius: '50%'
      }
    },
    categories() {
      return this.$store.getters.category;
    },
    iconWrapStyle() {
      return {
        width: '32px',
        height: '32px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)'
      }
    }
  },
  watch: {
    $route(n, o) {
      if(n.path === o.path) {
        this.getData();
      }
    }
  }
}
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
</style>

