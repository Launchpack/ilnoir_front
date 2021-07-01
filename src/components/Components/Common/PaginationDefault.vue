<template>
<div class="flex-justify">
  <div class="flex" v-if="pagingData" :style="containerStyle">

    <div class="flex-center"
      :style="arrowLeftEndStyle"
      @click="clickLeftEnd" v-if="arrowEnd === true">
      <i class="material-icons">double_arrow</i>
    </div>

    <div class="flex-center" :style="arrowLeftStyle"
      @click="clickLeft">
      <i class="material-icons">keyboard_arrow_left</i>
    </div>

    <div v-for="(item,idx) in paging" :key="'key-'+idx"
      :style="pagingData.cur_page==item ? selectedNumStyle : numStyle"
      @click="clickNum(item)" class="unselect">
      {{ item }}
    </div>

    <div class="flex-center" :style="arrowRightStyle"
      @click="clickRight">
      <i class="material-icons">keyboard_arrow_right</i>
    </div>

    <div class="flex-center" :style="arrowRightEndStyle"
      @click="clickRightEnd" v-if="arrowEnd === true">
      <i class="material-icons">double_arrow</i>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'PaginationDefault',
  components: {

  },
  mixins: [

  ],
  props: {
    pageNum: {
      type: Number,
      required: true,
    },
    arrowEnd: {
      type: Boolean,
      required: false,
    },
    pagingData: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      "paging": [],
      "arrLeft": false,
      "endPage": undefined,
      "arrRight": false,
      "startPage": 1
    }
  },
  created() {
    this.getPaging();
  },

  methods: {
    getPaging() {
      // 현재 페이지네이션 중에서 맨 첫번째 시작 넘버 계산
      this.startPage = parseInt((this.pagingData.cur_page-1) / this.pageNum) * this.pageNum + 1
      // 현재 페이지네이션 중에서 맨 마지막 넘버 계산
      this.endPage = this.startPage + this.pageNum -1

      // if (this.pageNum<this.pagingData.total_page) {
      //   this.arrLeft = true;
      // }
      // else this.arrLeft = false;

      // if (this.pageNum < this.pagingData.total_page) {
      //   this.arrRight = true;
      // }

      if (this.endPage >= this.pagingData.total_page) {
        this.endPage = this.pagingData.total_page;
      }

      if (Number(this.pagingData.cur_page) === 1) {
        this.arrLeft = false;
      }
      else {
        this.arrLeft = true;
      }

      if (Number(this.pagingData.cur_page) === this.pagingData.total_page) {
        this.arrRight = false;
      }
      else {
        this.arrRight = true;
      }

      this.paging = [];
      for(let i=this.startPage;i<=this.endPage; i++) {
        this.paging.push(i)
      }
    },
    clickNum(item) {
      this.$emit('curPaginationNum', item);
      this.pagingData.cur_page = item;
      this.getPaging();
    },
    clickRight() {
      if(this.endPage >= this.pagingData.total_page) {
        if(this.pagingData.cur_page < this.pagingData.total_page) {
          this.pagingData.cur_page = Number(this.pagingData.cur_page);
          this.pagingData.cur_page += 1;
        }
      }
      else {
        this.pagingData.cur_page = this.endPage + 1;
      }

      this.$emit('curPaginationNum', this.pagingData.cur_page);
      this.getPaging();
    },
    clickLeft() {
      if (this.startPage===1) {
        this.pagingData.cur_page = Number(this.pagingData.cur_page);
        if (this.pagingData.cur_page > 1) {
          this.pagingData.cur_page -= 1;
        }
      }
      else this.pagingData.cur_page = this.startPage - 1;
      this.$emit('curPaginationNum', this.pagingData.cur_page);
      this.getPaging();
    },
    clickLeftEnd() {
      this.pagingData.cur_page = 1;
      this.$emit('curPaginationNum', this.pagingData.cur_page);
      this.getPaging();
    },
    clickRightEnd() {
      this.pagingData.cur_page = this.pagingData.total_page;
      this.$emit('curPaginationNum', this.pagingData.cur_page);
      this.getPaging();
    }
  },
  computed: {
    containerStyle() {
      let deco = {};
      if(this.$store.getters.device==='pc') {
        deco.marginTop = '60px'
      }
      if(this.$store.getters.device==='mobile') {
        deco.marginTop = '32px'
      }
      return deco;
    },
    numStyle() {
      return {
        width: '20px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        color: this.brandColor.sub.color
      }
    },
    selectedNumStyle() {

      return {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: '500',
        color: this.brandColor.main.color
      }
    },
    arrowLeftStyle() {
      let deco = {
        width: '32px',
        height: '32px',
        borderRadius: '4px',
        color: this.brandColor.sub.color,
        marginRight: '20px'
      }
      if(this.arrLeft===false) {
        deco.opacity = '0.4'
      }
      else {
        deco.cursor = 'pointer'
      }
      return deco;
    },
    arrowRightStyle() {
      let deco = {
        width: '32px',
        height: '32px',
        borderRadius: '4px',
        color: this.brandColor.sub.color,
        marginLeft: '20px'
      }
      if(this.arrRight===false) {
        deco.opacity = '0.4'
      }
      else {
        deco.cursor = 'pointer'
      }
      return deco;
    },
    arrowLeftEndStyle() {
      let deco = {
        width: '32px',
        height: '32px',
        borderRadius: '4px',
        color: this.brandColor.sub.color,
        marginRight: '8px',
        transform: 'rotate(180deg)',
      }
      if(this.arrLeft===false) {
        deco.opacity = '0.8'
      }
      else {
        deco.cursor = 'pointer'
      }
      return deco;
    },
    arrowRightEndStyle() {
      let deco = {
        width: '32px',
        height: '32px',
        backgroundColor: 'white',
        borderRadius: '4px',
        color: '#000000',
        marginLeft: '8px',
      }
      if(this.arrRight===false) {
        deco.opacity = '0.2'
      }
      else {
        deco.cursor = 'pointer'
      }
      return deco;
    }
  },
  watch: {
    'pagingData.total_page'() {
      this.getPaging();
    }
  }
}
</script>


