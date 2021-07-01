<template>
  <!-- 페이지 -->
  <div class="pagination-group">
    <div class="pagination-btn-prev" @click="startPage">
      <i class="material-icons unselect" style="margin-top:3px;margin-right:-18px">keyboard_arrow_left</i>
      <i class="material-icons unselect" style="margin-top:3px">keyboard_arrow_left</i>
    </div>
    <div class="pagination-btn-prev" @click="prevPage">
      <i class="material-icons unselect" style="margin-top:3px">keyboard_arrow_left</i>
    </div>
    <div class="pagination-num" v-for="(n,idx) in calcPageList" :key="'page-'+idx">
        <span
            class="unselect"
            :class="{
            'pagination-num-selected': n === filtered.page,
            'pagination-num-not-selected': n !== filtered.page,
          }"
            @click="changePage(n)"
            style="font-size:1.2rem">{{ n }}</span>
    </div>
    <div class="pagination-btn-next" @click="nextPage">
      <i class="material-icons unselect" style="margin-top:3px">keyboard_arrow_right</i>
    </div>
    <div class="pagination-btn-next" @click="endPage">
      <i class="material-icons unselect" style="margin-top:3px">keyboard_arrow_right</i>
      <i class="material-icons unselect" style="margin-top:3px;margin-left:-18px">keyboard_arrow_right</i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      filtered: {
        type: Object,
        required: true
      }
    },
    name: "Pagination",
    data () {
      return {
        limit:10,
        block: 1,
        start: 1,
        end: 1,
      }
    },
    watch: {
      filtered: {
        handler() {
          if(this.filtered.page===1) {
            this.start = 1;
            this.block = 1;
          }
          if(this.start + 9 >= this.filtered.pages) {
            this.end = this.filtered.pages;
          }
          else if(this.block===1) {
            this.end = 10;
          }
        },
        deep: true
      }
    },
    computed: {
      calcPageList() {
        let page_list = [];
        for(let i=this.start; i<=this.end; i++) {
          page_list.push(i);
        }
        return page_list;
      }
    },
    methods: {
      changePage(num) {
        this.filtered.page = num;
        this.check = false;
        this.$emit('getData');
      },
      prevPage() {
        if (this.filtered.page - 10 >= 1) {
          this.block -= 1;
          this.start = (this.block-1)*10+1;
          this.end = this.start + 9;
          this.filtered.page = this.start;
          this.$emit('getData');
        }
      },
      nextPage() {
        if (this.filtered.page + 10 <= this.filtered.pages) {
          this.block += 1;
          this.start = (this.block-1)*10+1;
          if(this.start + 9 >= this.filtered.pages) {
            this.end = this.filtered.pages;
          }
          else {
            this.end = this.start + 9;
          }
          this.filtered.page = this.start;
          this.$emit('getData');
        }
        else {
          let next_block = this.block+1;
          if ((next_block - 1) * 10 + 1 <= this.filtered.pages) {
            this.block += 1;
            this.start = (this.block - 1) * 10 + 1;
            this.end = this.filtered.pages;
            this.filtered.page = this.start;
            this.$emit('getData');
          }
        }
      },
      startPage() {
        this.block = 1;
        this.start = (this.block-1)*10+1;
        if (this.filtered.pages>10) this.end = this.start + 9;
        else this.end = this.filtered.pages;
        this.filtered.page = 1;
        this.$emit('getData');
      },
      endPage() {
        let block = Math.floor(this.filtered.pages/10);
        let remainder = this.filtered.pages % 10;
        if(remainder > 0) block += 1;
        this.block = block;
        this.start = (this.block-1)*10+1;
        this.end = this.filtered.pages;
        this.filtered.page = this.filtered.pages;
        this.$emit('getData');
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .pagination-group
    display flex
    flex-wrap wrap
    justify-content center
    align-items center
    margin-top 20px

  .pagination-btn-prev
  .pagination-btn-next
    display inline-block

  .pagination-num
    display inline-block

  .pagination-btn-prev i
  .pagination-btn-next i
    color #18a4ed
    margin 4px
    cursor pointer

  .pagination-num
    padding 5px 8px
    cursor pointer
    font-size .9rem

  .pagination-num-selected
    color #18a4ed

  .pagination-num-not-selected
    color #666
</style>