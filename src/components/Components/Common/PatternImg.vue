<template>
<div class="position-relative flex-justify">
  <div class="img-pattern">
    <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/19946719.png">
    <div class="img-dim"></div>
  </div>
  <div style="z-index:1;margin-top:60px">
    <slot></slot>  
  </div>
</div>
</template>
<script>

export default {
  name: 'PatternImg',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>
<style scoped>
.img-pattern {
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    
  }
  .img-pattern img {
    width: 100%;
  }
  .img-dim {
    box-shadow: inset -20px -20px 20px 4px #0c0c23;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

