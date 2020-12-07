<template>
<div class="position-relative flex-justify" :style="[pageBg]">
    <!--<bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
    <pattern-img>
      <block-competition-register-pc style="flex:1;margin-top: 32px"></block-competition-register-pc>
    </pattern-img>
</div>
</template>
<script>
import BlockCompetitionRegisterPc from "@/components/Components/Block/BlockCompetitionRegisterPc"
import PatternImg from "@/components/Components/Common/PatternImg"
import PageMixin from "@/components/Components/Mixin/PageMixin"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'CompetitionRegisterPc',
  components: {
    BlockCompetitionRegisterPc,
    PatternImg
  },
  mixins: [
    PageMixin,
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "vDelay": false,
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "link": "contact",
          "name": "1:1문의 목록"
        },
        {
          "link": "",
          "name": "1:1문의 작성"
        }
      ]
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.vDelay = true;
    }, 500);
  },
  
  methods: {
    
  },
  computed: {
    gnbStyle() {
      return {
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border
      }
    },
    pageBg() {
      return this.brandBgColor.main;
    }
  },
  watch: {
    
  }
}
</script>


