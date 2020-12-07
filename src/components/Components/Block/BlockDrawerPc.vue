<template>
<div :style="[pagePadding]" style="paddingBottom:32px; width:240px;">
  <div class="flex-justify wrap" style="padding:32px 0">
    <img :src="dummyImage.person" class="profile-img object-fit-cover radius-half" />
    <div class="full-width flex-center" style="padding-top:16px;">
      <btn-pill title="로그인" @clicked="routerPush('signin')" bg="primary" color="white" :fontSize="12"></btn-pill>
    </div>
  </div>
  <div>
    <template v-for="item in menu">
      <a v-if="item.link_type === 'outlink'" :href="item.outlink" target="_blank">
        <div :key="item.link"
          class="size-12 weight-500 menu-item unselect" 
          :style="[brandColor.main, {borderBottom: brandBorder.main.border}]"
          >{{item.name}}</div>
      </a>
      <div :key="item.link" v-else
        class="size-12 weight-500 menu-item unselect" 
        :style="[brandColor.main, {borderBottom: brandBorder.main.border}]"
        @click="clickMenu(item);">{{item.name}}</div>
    </template>
  </div>
</div>
</template>
<script>
import BtnPill from "@/components/Components/Button/BtnPill"
import PageMixin from "@/components/Components/Mixin/PageMixin"

export default {
  name: 'BlockDrawerPc',
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
      return item.device === 'pc' && item.style === 'hamburger';
    });
    if(menuSet.length>0) {
      this.menu = menuSet[0].menu;
    }
  },
  mounted() {

  },
  
  methods: {
    clickMenu(item) {
      this.$emit('closeMenu');
      
      if (item.link_type && item.link_type !== 'link') {
        this.$root.$emit('page_'+item.link_type, item.link);
      }
      else {
        this.routerPush(item.link);
      }
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
  width: 48px;
  height: 48px;
}
.menu-item {
  padding: 16px 8px;
}
</style>

