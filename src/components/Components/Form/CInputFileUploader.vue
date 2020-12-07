<template>
  <div :style="containerStyle">

    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>


    <!-- 추가된 첨부파일 -->
    <div
      v-for="(file, idx) in files"
      :key="`file-${idx}`"
      class="file-list">
      <!-- 썸네일 -->
      <div>
        <!-- 이미지 -->
        <a
          target="_blank"
          :href="file.file">
          <div
            v-if="isImage(file.extension)"
            class="thumb"
            :style="thumbStyle(file.file)"></div>
          <!-- 이미지 아닐 땐 파일 확장자명 표시 -->
          <div v-else
               :style="extColor(file.extension)"
               class="thumb ext">{{ upper(file.extension) }}</div>
        </a>
      </div>
      <div class="file-name">{{ file.name }}</div>
      <div class="trash" @click="onDelete(idx)">
        <i class="material-icons">delete</i>
      </div>
    </div>
    <!-- 첨부파일 추가하기 -->
    <div v-if="maxLength > files.length">
      <input class="file-input"
             v-if="uploadReady"
             :accept="acceptExt"
             @click.stop
             :id="uid"
             @change="onFileChange"
             type="file">

      <label :for="uid"
             @click.stop
             class="file-list">
        <div class="file-attachment-text">+ 첨부파일 추가</div>
        <div class="file-attachment" :style="brandBgColor.brand">
          <i class="material-icons" :style="brandColor.white">attachment</i>
        </div>
      </label>
    </div>
    <div class="file-desc">{{ description }}</div>

  </div>
</template>

<script>
  import moment from 'moment'
  import FormMixin from '@/components/Mixins/FormMixin'

  export default {
    name: 'c-input-fileUploader',

    mixins: [
      FormMixin
    ],

    props: {
      label: {
        type: String,
        required: false
      }
    },

    created() {
      this.uid = moment().format('SSSS');
      /*if(this.description!==undefined)
        this.description = this.description;
      if(this.acceptExt !== undefined)
        this.acceptExt = this.acceptExt;
      if(this.maxLength !== undefined)
        this.maxLength = this.maxLength;*/
      if(this.value)
        this.files = this.value;
    },

    data() {
      return {
        uid: '',
        maxLength: 5,
        acceptExt: 'image/gif, image/jpeg, image/png, .docx, .pptx, .xlsx, .hwp, .pdf',
        description: '첨부파일은 최대 5개, 10MB 까지 등록 가능합니다.\n' +
        '파일형식은 이미지(jpg, gif, png), 오피스 문서(hwp, pdf, pptx, docx, xlsx)만 가능합니다.',
        file: undefined,
        uploadReady: true,        // 초기화 용
        files: []
      };
    },

    watch: {
      files(n) {
        if(n) this.$emit('update:value', this.files);
      },
      value(n) {
        this.files = n;
      }
    },

    computed: {
    },

    methods: {
      onDelete(idx) {
        this.files.remove(idx);
      },

      upper(ext) {
        return ext.toUpperCase();
      },

      extColor(ext) {
        let deco = { backgroundColor : '' };
        switch(ext.toLowerCase()) {
          case 'hwp':
            deco.backgroundColor = '#2ebcee';
            break;
          case 'pdf':
            deco.backgroundColor = '#ef4037';
            break;
          case 'docx':
            deco.backgroundColor = '#295498';
            break;
          case 'pptx':
            deco.backgroundColor = '#d14425';
            break;
          case 'xlsx':
            deco.backgroundColor = '#207245';
            break;
        }

        return deco;
      },

      isImage(ext) {
        let isImg = false;
        let imgExt = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'tif'];
        ext = ext.toLowerCase();
        if(imgExt.indexOf(ext)>-1)
          isImg = true;

        return isImg;
      },
      thumbStyle(img) {
        let deco = {
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };

        return deco;
      },
      onFileChange(e) {
        this.file = e.target.files[0];
        if(this.file === undefined) return;

        this.uploadReady = false;
        this.$nextTick(() => { this.uploadReady = true; });

        //10MB 또는 파일 maxLength개 까지만 업로드 가능
        let totalSize = 0;
        for(let i=0; i< this.files.length; i++)
          totalSize += this.files[i].size;

        if((totalSize + this.file.size ) > 1024*1024*10 || this.files.length + 1 > this.maxLength) {
          this.toast(`최대 10MB, ${this.maxLength}개 파일까지만 업로드 가능합니다.`);
          return;
        }

        if(find(this.files, 'name', this.file.name) !== undefined) {
          this.toast('이미 업로드 된 파일입니다.');
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (f) => {
          let file = this.file.name.split('.');
          let ext = file[file.length-1];
          this.files.push({
            name : this.file.name,
            file : f.srcElement.result,
            size: this.file.size,
            extension: ext
          });
        };
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .file-list
    border 1px solid #eeeeee
    background-color #ffffff
    display flex
    justify-content space-between
    width 100%
    height 46px
    margin-top 8px

  .thumb
  .file-attachment
    width 44px
    height 44px

  .ext
    text-align center
    color white
    background-color #064160
    line-height 44px
    font-size 0.7rem
    font-weight 100

  .file-attachment-text
    padding-left 12px
    line-height 46px
    font-size 0.9rem
    color rgba(162, 174, 186, 1)

  .file-attachment
    text-align center

  .file-attachment i
    line-height 46px
    font-size 1.6rem

  .file-desc
    font-size 0.7rem
    color rgba(162, 174, 186, 1)
    white-space pre-line
    padding 8px 0

  .file-name
    padding 0 20px
    color #303841
    font-size 0.8rem
    text-overflow ellipsis
    overflow hidden
    white-space pre
    line-height 44px
    text-align left
    flex 1

  .file-input
    width 0
    height 0
    position fixed
    top -100px
    left -100px

  .trash
    width 44px
    height 44px
    text-align center

  .trash i
    line-height 44px
    color rgba(162, 174, 186, 1)
    font-size 1.4rem
</style>
