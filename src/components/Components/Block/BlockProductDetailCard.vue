<template>
<div v-if="product" ref="cardHeight"
  :style="pagePadding">
  <div style="padding:16px 0">
    <div v-lazy:background-image="product.img" class="lazy-background-image" :style="imgStyle"></div>
  </div>
  
    <div :style="brandColor.white">
      <div class="size-20 margin-bottom-18 bold" style="font-weight:500">{{ product.name }}</div>
      
      <div class="flex-align margin-bottom-10">
            <div class="size-12 col-3" style="color:#CCCCCC">판매가</div>
            <div class="size-15 bold" :style="brandColor.white">{{product.price.sale_price | currency}}</div>
          </div>       
          
          <div class="flex-align margin-bottom-30" v-if="constructor">
            <div class="size-12 col-3" style="color:#CCCCCC">제조사</div>
            <div class="size-12" style="color:#CCCCCC">{{constructor}}</div>
          </div>    
          
      <btn-pc styles="primary" @onClick="$refs.callModal.open()"
        class="margin-bottom-16"
        width="100%">구매 문의</btn-pc>
      <!--<btn-ordering :product="product"></btn-ordering>-->
        
    </div>

  <!-- 전화연결 팝업 -->
  <sweet-modal ref="callModal" overlay-theme="dark">
    <modal @confirm="clickCall" @cancel="$refs.callModal.close()">
      <div slot="header">전화연결</div>
      <div slot="content">연결 버튼을 누르시면 전화연결이 진행됩니다. 진행하시겠습니까?</div>
    </modal>
  </sweet-modal>

</div>
</template>
<script>
import BtnPc from "@/components/Components/Button/BtnPc"

export default {
  name: 'BlockProductDetailCard',
  components: {
    BtnPc
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "product": undefined,
      "fixedState": false,
      "constructor": ""
    }
  },
  created() {
    this.getData();
    this.detectClientHeight();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.detectClientHeight);
    });
  },
  updated() {
    this.detectClientHeight();
  },
  destroyed() {
    this.product = undefined;
  },
  
  methods: {
    getData() {
      this.$axios.get(`/user/${this.user.user_id}/mapping/product/${this.$route.query.id}?fields=id,img,name,simple_desc,tags,form,
      order_conversion_type,category1,category2,category3,rate,stock,input,like_count,reviews_count,visit,price,partner,
      address,dong,distance,params,imgs,info,operating_time,phone,params,order_conversion_type`)
      .then(res => {
          this.product = res.data;
          this.product_params = this.cloneItem(this.product.params);
          
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
    }
  },
  computed: {
    imgStyle() {
      return {
        width: '100%',
        height: '360px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // backgroundImage: `url("${this.product.img}")`
      }
    },
    partnerStyle() {
      return {
        padding: '16px',
        border: `1px solid ${this.getColor('기본 테두리선 색상')}`
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
    }
  },
  watch: {
    
  }
}
</script>


