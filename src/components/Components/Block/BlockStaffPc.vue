<template>
<div class="flex-justify">
  <div style="padding:0 0 100px" :style="pcMaxWidth">
    <transition name="fade">
      <div class="grid-box">
        <div class="col-6" style="padding-right:4px">
          <card-img-hover-trans-pc :card="list[0]"/>
        </div>
        <div class="col-6" style="padding-left:4px">
          <card-img-hover-trans-pc :card="list[1]"/>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>
<script>
import CardImgHoverTransPc from "@/components/Components/Card/CardImgHoverTransPc"
import PaginationDefault from "@/components/Components/Common/PaginationDefault"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockStaffPc',
  components: {
    CardImgHoverTransPc,
    PaginationDefault
  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": [
        {
          "id": 1,
          "img": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/14121482.png",
          "name": "손한휘",
          "title": "감독",
          "position": "대표 및 감독"
        },
        {
          "id": 2,
          "img": "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/08723935.png",
          "name": "임현석",
          "title": "코칭 스태프",
          "position": "브랜드 매니저"
        }
      ]
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    subStyle() {
      return {
        padding: '32px 0',
        borderBottom: this.brandBorder.sub.border,
        height: '48px'
      }
    }
  },
  watch: {
    
  }
}
</script>


