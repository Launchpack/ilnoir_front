<template>
  <div>
    <div :style="elStyle" @click="doCopy" class="ellipsis unselect" style="width:100%">{{ url }}</div>
    <div :style="brandColor.sub" style="font-size:11px;text-align:center;margin-top:4px">URL을 누르시면 복사할 수 있습니다</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  Vue.use(VueClipboard);

  export default {
    name: "BtnUrlCopy",
    props: {
      url: {
        type: String,
        default: location.href
      }
    },

    computed: {
      elStyle() {
        return {
          border: 0,
          padding: '16px',
          fontSize: '14px',
          borderRadius: '4px',
          backgroundColor: this.getColor('보조 배경 색상'),
          color: this.getColor('브랜드 강조 색상')
        };
      }
    },
    methods: {
      doCopy() {
        this.$copyText(this.url).then(e => {
          this.toast('URL이 복사되었습니다.')
          this.$emit('onShare');
        }, e => {
          this.toast('URL 복사에 실패했습니다.')
        })
      }
    }
  }
</script>

<style scoped>

</style>