<template>
  <div class="c-input-editor" :style="[containerStyle, fullWidth]">
    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>
    <textarea id="editor"></textarea>
  </div>
</template>

<script>

  import suneditor from 'suneditor'
  import plugins from 'suneditor/src/plugins'
  import table from 'suneditor/src/plugins/submenu/table'
  import lang from 'suneditor/src/lang'
  import FormMixin from "../../Mixins/FormMixin";

  export default {
    name: "CInputEditor",
    mixins: [
      FormMixin
    ],
    props: {
      text: {
        type: String
      },
      height: {
        type: Number,
        default: 500
      },
      disablePhoto: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
      this.editor = suneditor.create('editor', {
        plugins: plugins,
        buttonList: [
          ['undo', 'redo'], [ 'font', 'fontSize'], ['fontColor', 'hiliteColor'],
          ['bold', 'italic'], ['underline', 'strike'],
          ['align', 'outdent', 'indent'],
          ['list', 'table' ],
          ['horizontalRule', 'video', 'image', 'link'],
        ],
        font: [
          "Nanum Gothic",
          "Noto Sans Korean",
          "Spoqa Han Sans",
          "BM DoHyeon",
          "BM HANNA",
          "BM YEONSUNG",
          "BM KIRANGHAERANG",
          "BM JUA"
        ],
        lang: lang.ko,
        width: '100%',
        height: 'auto',
        minHeight: '200px',
        maxHeight: this.$store.getters.device === 'pc' ? 'calc(100vh - 350px)' : '100%',
        stickyToolbar: this.$store.getters.device === 'pc' ? '144px' : 0,
        defaultStyle: 'font-size:16px',
        resizingBar: false
      });

      this.$nextTick(()=>{
        let list = document.getElementsByClassName('se-btn-list');
        for(let i=0; i<list.length; i++) {
          let item = list[i];
          let title = item.title;
          switch(title) {
            case "Nanum Gothic":  title = '나눔 고딕'; break;
            case "BM DoHyeon":  title = 'BM 도현체'; break;
            case "BM HANNA":  title = 'BM 한나체'; break;
            case "BM YEONSUNG":  title = 'BM 연성체'; break;
            case "BM KIRANGHAERANG":  title = 'BM 기랑해랑체'; break;
            case "BM JUA":  title = 'BM 주아체'; break;
          }
          if(title) {
            item.title = title;
            item.innerText = title;
            //item.setAttribute('data-value', title);
          }
        }

        this.editor.setContents(this.value);
        // 테이블에서 한글 쌍자음 입력 오류 문제로 keydown 이벤트 제거
        let wrapper = document.getElementsByClassName('se-wrapper-inner')[0];
        let listner = wrapper.getEventListeners('keydown')[0].listener;
        wrapper.removeEventListener('keydown', listner);

        let el = document.getElementsByClassName('se-wrapper-inner')[0];
        el.blur();
      });

      this.editor.onChange = (e) => {
        this.$emit('update:value', e);
      };
    },
    data() {
      return {
        editor: undefined
      }
    },
    computed: {
      fullWidth() {
        if(this.$store.getters.device === 'pc') {
          return '';
        } else {
          let left = this.pagePadding.paddingLeft;
          let right = this.pagePadding.paddingRight;
          return {
            marginLeft: `-${left}`,
            marginRight: `-${right}`
          }
        }
      }
    },
    watch: {
      value(n,o) {
        if(o === '' && n !== '' && this.editor.getContents() !== n) {
          this.editor.setContents(n);
        }
      }
    }
  }
</script>

<style lang="stylus">
  .sun-editor
    border 1px solid #f1f1f1 !important
    border-radius 8px

  .e-editor img
    max-width 100%
    display inline

  .sun-editor-editable table td.se-table-selected-cell
    border 1px solid #e1e1e1
    background transparent
  .sun-editor-editable td p
    margin 0

  .sun-editor-editable .se-component.__se__float-left
  .sun-editor-editable .se-component.__se__float-right
    margin 0


</style>