<template>
<div>
  <div class="size-40 text-center weight-600" :style="[titleStyle, brandColor.brand]">{{ card.title }}</div>
  
  <div class="position-relative" @mouseover="onHover(card)" @mouseleave="outHover(card)">
    <img :src="card.img" :style="imgStyle">
    <div class="position-absolute dim flex-center size-25 bold" 
      :style="[bottomStyle, brandColor.main]">
      <div v-if="hoverState&&hoverId===card.id" class="text-center">
        <div class="size-25 bold margin-bottom-28" :style="brandColor.brand">
          <span>{{card.name}}</span><span>({{card.position}})</span>
        </div>
        
        <div v-if="card.id===1" class="size-15">
          <div class="bold" :style="brandColor.main">
            김해FC 선수 및 트레이너를 역임했습니다.
          </div>
          <div :style="brandColor.sub">
            유년시절부터 축구를 해오며 누구보다 아이들의 입장을 잘 헤아릴 수 있습니다.<br>
            진심을 다해 아이들의 성장을 돕겠습니다
          </div>
        </div>
        <div v-if="card.id===2" class="size-15">
          <div :style="brandColor.sub">
            GRIT12 취지와 사명에 깊이 공감하며GRIT12와 함께 하게 되었습니다.
          </div>
          <span :style="brandColor.sub">커리큘럼부터 축구대회 기획까지 </span>
          <span :style="brandColor.main" class="bold">GRIT12의 정신을 담겠습니다.</span>
        </div>
      </div>
      
      <div v-else>
        <span>{{ card.name }}</span>
        <span>({{ card.position }})</span>
      </div>
      
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'CardImgHoverTransPc',
  components: {

  },
  mixins: [

  ],
  props: {
    card: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      "hoverId": undefined,
      "imgStyle": {
        "width": "100%",
        "height": "460px",
        "objectFit": "cover"
      },
      "hoverState": false
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    onHover(item) {
      this.hoverState = true;
      this.hoverId = item.id;
    },
    outHover() {
      this.hoverState = false;
      this.hoverId = undefined;
    }
  },
  computed: {
    titleStyle() {
      return {
        padding: '80px 0 40px',
        borderBottom: this.brandBorder.main.border
      }
    },
    bottomStyle() {
      if(this.hoverState && this.card.id===this.hoverId) {
        return {
          left: '0',
          bottom: '0',
          backgroundColor: 'rgba(23,23,45,0.8)',
          width: '100%',
          height: '48%',
          transitionProperty: 'height',
          transitionDuration: '0.5s'
        }
      }
      else {
        return {
          left: '0',
          bottom: '0',
          backgroundColor: 'rgba(23,23,45,0.8)',
          width: '100%',
          height: '24%',
          transitionProperty: 'height',
          transitionDuration: '0.5s'
        }
      }
    }
  },
  watch: {
    
  }
}
</script>


