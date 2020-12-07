<template>
  <div class="e-editor sun-editor-editable" v-html="getHtml"></div>
</template>

<script>
  export default {
    name: "EEditor",
    props: {
      html: {
        required: true
      }
    },
    data() {
      return {
        getHtml: ''
      }
    },
    created() {
      this.getHtml = this.html ? this.html.replace(/<p><\/p>/gi, '<p><br></p>') : '';
      // IE, Mac OS 10.15까지의 safari 브라우저를 제외한 나머지 브라우저 .webp로 이미지 전환
      if(this.getHtml && navigator.userAgent.indexOf('Trident')===-1 && navigator.userAgent.indexOf('Mac OS X')===-1) {
        this.getHtml = this.getHtml.replace('.jpg', '.webp').replace('.jpeg', '.webp').replace('.png', '.webp').replace('.JPG', '.webp').replace('.JPEG', '.webp').replace('.PNG', '.webp');
      }
    },
    watch: {
      html() {
        this.getHtml = this.html ? this.html.replace(/<p><\/p>/gi, '<p><br></p>') : '';
        // IE, Mac OS 10.15까지의 safari 브라우저를 제외한 나머지 브라우저 .webp로 이미지 전환
        if(this.getHtml && navigator.userAgent.indexOf('Trident')===-1 && navigator.userAgent.indexOf('Mac OS X')===-1) {
          this.getHtml = this.getHtml.replace('.jpg', '.webp').replace('.jpeg', '.webp').replace('.png', '.webp').replace('.JPG', '.webp').replace('.JPEG', '.webp').replace('.PNG', '.webp');
        }
      }
    }
  }
</script>

<style lang="stylus">
  /*.e-editor
    white-space pre-wrap*/

  .e-editor img
    max-width 100% !important
    margin 0 auto !important

  .sun-editor-editable
    background-color transparent

  .sun-editor-editable table td.se-table-selected-cell
    border 1px solid #e1e1e1
    background transparent
  .sun-editor-editable td p
    margin 0

  .sun-editor-editable .se-image-container figure
    width 100%
    margin 0 auto
  
  .sun-editor-editable table
    table-layout fixed
  
  .sun-editor-editable table img
    max-width 100% !important 
    max-height 100% !important 

</style>