<template>
<div :style="pageBg" style="padding-top:20px">
  
  <transition name="fade">
    <pattern-img>
    <div class="flex-justify">
      <div :style="pcMaxWidth">
        <div style="margin-top:40px">
          <div class="size-12" :style="brandColor.white">
            <span>홈</span> > 
            <span>GOODS</span> >
            <span>GRIT12 굿즈</span>
          </div>
        </div>
      </div>
    </div>
    <block-product-detail-card-pc></block-product-detail-card-pc>
    </pattern-img>
  </transition>
  
  <transition name="fade">
    <block-product-detail-tab-pc></block-product-detail-tab-pc>
  </transition>
  
</div>
</template>
<script>
import BlockProductDetailCardPc from "@/components/Components/Block/BlockProductDetailCardPc"
import BlockProductDetailTabPc from "@/components/Components/Block/BlockProductDetailTabPc"
import BlockMixin from "@/components/Mixins/BlockMixin"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ProductDetailPc',
  components: {
    BlockProductDetailCardPc,
    BlockProductDetailTabPc
  },
  mixins: [
    BlockMixin,
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {
    if(this.$route.query.id === '31') {
      let head = document.getElementsByTagName('head')[0];
      let script = document.createElement('script');
      script.append(`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '635691007070270');
fbq('track', 'PageView');`);
      let noscript = document.createElement('noscript');
      let img = document.createElement('img');
      img.width = 1;
      img.height = 1;
      img.src = "https://www.facebook.com/tr?id=635691007070270&ev=PageView&noscript=1";
      noscript.appendChild(img);
      head.appendChild(document.createComment('Facebook Pixel Code'));
      head.appendChild(script);
      head.appendChild(noscript);
      head.appendChild(document.createComment('End Facebook Pixel Code'));
    }
  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>


