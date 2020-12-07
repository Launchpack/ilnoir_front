<template>
<div :style="btnStyle()" class="unselect"
  @click="clickBtn"><slot></slot></div>
</template>
<script>

export default {
  name: 'BtnPc',
  components: {

  },
  mixins: [

  ],
  props: {
    width: {
      type: String,
      default: "223px",
      required: false,
    },
    height: {
      type: String,
      default: "48px",
      required: false,
    },
    styles: {
      type: String,
      default: "more",
      required: false,
    },

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
    btnStyle() {
      let deco = {
        width: `${this.width}`,
        height: `${this.height}`,
        textAlign: 'center',
        lineHeight: `${this.height}`,
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold'
      };
      if(this.styles==='more') {
        deco.border = `1px solid ${this.getColor('보조 테두리선 색상')}`
        deco.backgroundColor = 'white'
        deco.color = `${this.getColor('보조 내용 색상')}`
      }
      if(this.styles==='reverse') {
        deco.backgroundColor = `#c3996b`
        deco.color = 'white'
      }
      if(this.styles==='brand') {
        deco.backgroundColor = `${this.getColor('브랜드 강조 색상')}`
        deco.color = 'white'
      }
      if(this.styles==='primary') {
        deco.backgroundColor = `${this.getColor('Primary Color')}`
        deco.color = 'white'
      }
      return deco;
    },
    clickBtn() {
      this.$emit('onClick');
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


