<template>
<transition-group name="fade" tag="div" class="grid-box" style="padding: 12px 16px;">
  <div v-for="item in list" :key="item.id" class="col-4 flex-center wrap unselect" style="padding: 12px 16px;" @click="clickCat(item)">
    <div class="img-wrap flex-center wrap">
      <img class="cat-img" :src="item.img_before" />
    </div>
    <div class="full-width size-12 text-center weight-500" style="margin-top: 4px;">{{ item.name }}</div>
  </div>
</transition-group>
</template>
<script>

export default {
  name: 'BlockHomeCategory',
  components: {

  },
  mixins: [

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

