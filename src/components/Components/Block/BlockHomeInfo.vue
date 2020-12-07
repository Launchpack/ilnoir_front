<template>
<div :style="brandColor.white" class="flex-justify" style="padding:0 68px">
  <div class="flex" style="justify-contents:space-between">
    <div class="col-6" style="padding-left:40px">
      <div class="flex-align bold margin-bottom-8">
        <div style="font-size:10vw;margin-right:8px">Grit. </div>
        <div style="font-size:2vw">연마제; 투지, 기개</div>
      </div>
      
      <div style="padding-right:20px">
        <div class="size-23 weight-500 margin-bottom-4">
          성공과 성취를 끌어내는 데 결정적 역할을 하는 투지 또는 용기
        </div>
        <div class="size-21" style="color:#CCCCCC">
          얼마나 재능이 있는가보다 얼마나 연마했는가가 <br>
          최고의 성취를 좌우합니다.
        </div>
      </div>
    </div>
    <img src="https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/37362131.png"
      :style="`height:${height}`" style="margin-top:40px" class="col-6">
  </div>
</div>
</template>
<script>

export default {
  name: 'BlockHomeInfo',
  components: {

  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "height": 0
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(()=>{
      this.setHeight();
    });
    window.addEventListener('resize', ()=>{
      this.setHeight();
    });   
  },
  
  methods: {
    setHeight() {
      this.height = window.innerWidth/2*0.92+'px';
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


