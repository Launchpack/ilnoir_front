<template>
<div :style="[pageHeight, pagePadding]">
  <div class="flex-justify wrap" style="padding:32px 0">
    <img :src="dummyImage.person" class="profile-img object-fit-cover radius-half" />
    <div class="full-width flex-center" style="padding-top:16px;">
      <btn-pill title="로그인" @clicked="clickLogin" bg="primary" color="white"></btn-pill>
    </div>
  </div>
  <div>
    <template v-for="item in menu">
      <a v-if="item.link_type === 'outlink'" :href="item.outlink" target="_blank">
        <div :key="item.link"
          class="size-20 weight-500 menu-item unselect" 
          :style="[brandColor.main, {borderBottom: brandBorder.main.border}]"
          >{{item.name}}</div>
      </a>
      <div :key="item.link" v-else
        class="size-20 weight-500 menu-item unselect" 
        :style="[brandColor.main, {borderBottom: brandBorder.main.border}]"
        @click="clickMenu(item)">{{item.name}}</div>
    </template>
  </div>
</div>
</template>
<script>
import BtnPill from "@/components/Components/Button/BtnPill"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'BlockDrawer',
  components: {
    BtnPill
  },
  mixins: [
    PageMixin
  ],
  props: {

  },
  data() {
    return {
      "menu": [
        {
          "link": "notice",
          "name": "공지사항"
        },
        {
          "link": "event",
          "name": "이벤트"
        },
        {
          "link": "TermsofserviceModal",
          "name": "이용약관",
          "link_type": "modal"
        },
        {
          "link": "PrivacyModal",
          "name": "개인정보 보호방침",
          "link_type": "modal"
        }
      ]
    }
  },
  created() {
    let menuSet = this.$store.getters.brand.menu_set.filter(item=>{
      return item.device === 'mobile' && item.style === 'hamburger';
    });
    if(menuSet.length>0) {
      this.menu = menuSet[0].menu;
    }
  },
  mounted() {

  },
  
  methods: {
    clickLogin() {
      this.$emit('closePage');
      this.routerPush('signin');
    },
    clickMenu(item) {
      if (item.link_type && item.link_type !== 'link') {
        console.log('page_'+item.link_type, item.link)
        this.$root.$emit('page_'+item.link_type, item.link);
      }
      else {
        this.routerPush(item.link);
      }
      this.$emit('closePage');
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.profile-img {
  width: 64px;
  height: 64px;
}
.menu-item {
  padding: 20px 16px;
}
</style>

