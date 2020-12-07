<template>
<div :style="brandBgColor.main">
  <header-title-mobile>GRIT12 굿즈</header-title-mobile>
  <div style="min-height: 504px">
    <transition name="fade">
      <block-product-detail-card @fixedState="(val) => fixedState = val"></block-product-detail-card>
    </transition>
  </div>
  
  <div>
    <transition name="fade">
      <block-product-detail-tab :fixedState="fixedState"></block-product-detail-tab>
    </transition>
  </div>

</div>
</template>
<script>
import BlockProductDetailCard from "@/components/Components/Block/BlockProductDetailCard"
import BlockProductDetailTab from "@/components/Components/Block/BlockProductDetailTab"
import HeaderTitleMobile from "@/components/Components/Common/HeaderTitleMobile"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'ProductDetail',
  components: {
    BlockProductDetailCard,
    BlockProductDetailTab,
    HeaderTitleMobile
  },
  mixins: [
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "fixedState": false
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
      return {
        backgroundColor: 'rgba(255,255,255,1)'
      }
    }
  },
  watch: {
    
  }
}
</script>


