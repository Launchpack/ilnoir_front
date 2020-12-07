<template>
<div class="flex-justify" style="min-height: 218px">  
  <transition-group name="fade" tag="div" class="grid-box" :style="pcMaxWidth" style="padding: 48px 160px">
    <div v-for="item in list" :key="item.id" 
      class="col-2 flex-center wrap unselect" style="margin-bottom: 20px;"
      @click="clickCat(item)">
      <div class="img-wrap flex-center wrap">
        <img class="cat-img" :src="item.img_before" />
      </div>
      <div class="full-width size-12 text-center weight-500" style="margin-top: 4px;">{{ item.name }}</div>
    </div>
  </transition-group>
</div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockHomeCategoryPc',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "list": []
    }
  },
  created() {
    this.getData();
  },
  mounted() {
  
  },
  
  methods: {
    getData() {
      this.$axios.get('public/category')
      .then(res => {
        this.list = res.data;
      })
    },
    clickCat(item) {
      this.routerPush(`product?tab=${item.id}`);
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.img-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
}
.cat-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>

