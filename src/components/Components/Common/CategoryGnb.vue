<template>
<div class="size-14" v-if="visible" :style="[brandBgColor.white]">
  <gnb-comp @select="id => select(id)"
    :pagesGnb="mainPages"
    :exceptPath="exceptPath"></gnb-comp>
    
</div>
</template>
<script>

export default {
  name: 'CategoryGnb',
  components: {

  },
  mixins: [

  ],
  props: {
    mainPages: {
      type: Array,
      required: false,
    },

  },
  data() {
    return {
      "visible": false,
      "exceptPath": [
        "/search"
      ]
    }
  },
  created() {
    this.setVisible();
  },
  mounted() {

  },
  
  methods: {
    select(id) {
      // if(this.$route.path!=='/product') this.routerPush(`product?gnb=${id}`)  
    },
    setVisible() {
      if(this.$store.getters.device==='mobile') {
        this.visible = true;
      }
      else {
        this.visible = this.$route.query.gnb !== undefined;  
      }
    }
  },
  computed: {
    gnbStyle() {
      return {
        borderTop: this.brandBorder.main.border,
        borderBottom: this.brandBorder.main.border
      }
    }
  },
  watch: {
    $route() {
      this.setVisible();
    }
  }
}
</script>


