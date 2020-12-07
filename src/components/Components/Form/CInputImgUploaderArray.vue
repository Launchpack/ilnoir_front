<template>
  <div class="flex wrap">
    {{ hello }}
    <c-input-imgUploader
        v-bind="$props"
        v-for="(el, idx) in files"
        :value.sync="el"
        :index="idx"
        @update:value="addImg"
        @delImg="delImg"
        :key="`img-uploader-array-${idx}`"
    ></c-input-imgUploader>
  </div>
</template>

<script>
  import FormMixin from '@/components/Mixins/FormMixin'
  import CInputImgUploader from "./CInputImgUploader";
  export default {

    components: {CInputImgUploader},
    name: "c-input-imgUploaderArray",

    mixins: [
      FormMixin
    ],

    props: {
      data: {
        type: String,
        required: false
      },
      label: {
        type: String,
        required: false
      },
    },

    data() {
      return {
        files: this.value,
        hello: ''
      }
    },
    created() {
      if(this.value.length===0) this.files = [''];
    },

    computed: {
    },
    watch: {
      value(n) {
        if(n.length===0) this.files = [''];
        else this.files = n;
      }
    },
    methods: {
      addImg(value) {
        // multiple images
        if (Array.isArray(value)) {
          this.files.pop();
          this.files = this.files.concat(value);
          this.files.push("");
        }
        // single image
        else {
          this.files.splice(this.files.length-1, 0, value);
        }
        this.$emit('update:value', this.files);
      },
      delImg(index) {
        this.files.remove(index);
      }
    }
  }
</script>

<style scoped>

</style>
