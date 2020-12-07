<template>
  <div class="flex" :style="iconStyle">
    <i class="material-icons unselect" :style="iconStyle" @click="clickBtn">{{ icon }}</i>
  </div>
</template>

<script>
  export default {
    name: "IconBtnShare",
    props: {
      size: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: 'sub'
      },
      icon: {
        type: String,
        default: 'open_in_new'
      }
    },
    methods: {
      clickBtn() {
        this.$emit('share');
      }
    },
    computed: {
      iconStyle() {
        let deco = this.brandColor[this.color];
        deco.fontSize = this.size+'px';
        deco.height = deco.fontSize;
        return deco;
      }
    }
  }
</script>
