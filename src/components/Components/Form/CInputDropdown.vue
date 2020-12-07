<template>
  <div :style="containerStyle" class="full-width">
    <!-- outside click -->
    <div v-click-outside="hide"></div>

    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>

    <!-- 드롭다운 -->
    <!-- Selected -->
    <div class="dropdown position-relative unselect" ref="dropdown"
         :style="dropdownStyle"
         @click.stop.prevent="toggleList">
      <div class="flex-between full-width">
        <div class="flex-align">
          <i v-if="iconValue" class="material-icons" style="font-size: 20px; margin-right: 8px;">{{ iconValue }}</i>
          <span v-if="selectedValue" style="margin-right: 5px;">{{ selectedValue }}</span>
          <span v-else-if="placeholder" style="color: #777; margin-right: 5px;">{{ placeholder }}</span>
          <span v-else style="color: #777; margin-right: 5px;">{{ placeHolder }}</span>
        </div>

        <i :style="iconStyle" class="material-icons drop-icon">
          {{ isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</i>
      </div>
      
      <!-- List -->
      <ul v-if="isOpen && formType.dropdown !== 'modal'" class="list" :style="dropListCustomStyle">
        <li class="item unselect"
            v-for="(item, idx) in options"
            :key="idx"
            :style="[brandColor.main, brandBgColor.main, mouseOverStyle(idx), dropItemStyle]"
            @click.stop.prevent="clickItem(item)"
            @mouseover="mouseOverIndex=idx"
            @mouseleave="mouseOverIndex=undefined;">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <!-- 모달 스타일 List -->
    <sweet-modal ref="listModal" overlay-theme="dark">
      <div class="text-center">
        <div class="label-modal"> {{ label }} </div>
        <div class="item-modal unselect" @click.stop.prevent="clickItem(item)"
             v-for="(item, idx) in options"
             :key="idx"
             :style="itemModalStyle(item.label)">
          <div>{{ item.label }}</div>
          <i v-if="item.label === selectedValue" class="material-icons" :style="checkStyle">check</i>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
  import { SweetModal } from 'sweet-modal-vue';
  import FormMixin from '@/components/Mixins/FormMixin'
  import ClickOutside from 'vue-click-outside'
  export default {
    name: 'c-input-dropdown',

    directives: {
      ClickOutside
    },

    components: {
      SweetModal
    },

    mixins: [
      FormMixin
    ],

    props: {
      dropListCustomStyle: {
        type: Object,
        required: false
      },
      dropItemCustomStyle: {
        type: Object,
        required: false
      },
      iconCustomStyle: {
        type: Object,
        required: false
      },
      iconValue: {
        type: String,
        required: false
      },
      fullState: {
        type: Boolean,
        required: false
      },
      fullLength: {
        type: Number,
        required: false
      },
      addState: {
        type: Boolean,
        required: false
      }
    },

    data() {
      return {
        isOpen: false,
        mouseOverIndex: undefined,
        selectedValue: '',
        popupItem: '',
        placeHolder: '선택'
      };
    },

    mounted() {
      this.popupItem = this.$el;
    },

    created() {
      this.selectedValue = this.findLabel(this.value);
    },

    watch: {
      value(n) {
        this.selectedValue = this.findLabel(n);
      },
      selectedValue(n) {
        let value = undefined;
        if(typeof(n) === 'string') {
          let opt = find(this.options, 'label', n);
          if(opt) {
            value = opt.value;
          }
        } else {
          value = n.value;
        }

        this.$emit('update:value', value);
      },
      fullState(n) {
        if(n) {
          if(this.options&&this.options[0].type===0) {
            this.selectedValue = '';
            if(this.options[0].index===this.fullLength) {
              this.$emit('empty', this.options[0].type);
            }
          }
        }
      },
      addState(n) {
        if(n) {
          if(this.options&&this.options[0].type===1) {
            this.options.forEach(item => {
              if(item.label===this.selectedValue) {
                this.selectedValue = '';
                this.$emit('empty', item.type, item.index);
              }
            })
          }
          
        }
      }
    },

    computed: {
      iconStyle() {
        if (this.iconCustomStyle) return this.iconCustomStyle;
        else return {
          color: this.brandColor.sub.color
        };
      },
      dropItemStyle() {
        if (this.dropItemCustomStyle) return this.dropItemCustomStyle;
        else return {
          padding: '8px 16px',
          borderBottom: `1px solid ${this.getColor('기본 테두리선 색상')}`,
          fontSize: '14px'
        }
      },
      checkStyle() {
        return {
          padding: '2px',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          textAlign: 'center',
          color: 'white',
          backgroundColor: this.brandBgColor.brand.backgroundColor,
          fontSize: '15px'
        }
      }
    },

    methods: {
      hide () {
        this.isOpen = false
      },

      itemModalStyle(label) {
        return label === this.selectedValue ? this.brandColor.brand : this.brandColor.main;
      },

      // 드롭다운 아이템 스타일 계산 (hover index 감지를 위해 메소드로 처리)

      mouseOverStyle(idx) {
        let deco = {};
        if ( this.mouseOverIndex === idx ) {
          deco.backgroundColor = '#eee';
        }
        return deco;
      },

      // 드롭다운 토글
      toggleList() {
        this.isOpen = !this.isOpen;
        if(this.formType.dropdown === 'modal') {
          this.$refs.listModal.open();
        }
      },

      // 드롭다운 아이템 클릭
      clickItem(item) {
        this.selectedValue = item.label;
        this.isOpen = false;
        if(this.formType.dropdown === 'modal') {
          setTimeout(()=>{
            this.$refs.listModal.close();
            this.$emit('update:value', item.value);
            this.$emit('update:selectedValue', this.selectedValue);
          },500);
        } else {
          this.$emit('update:value', item.value);
          this.$emit('update:selectedValue', this.selectedValue);
        }
      },

      findLabel(val) {
        let result = '';
        if (this.options!==undefined) {
          this.options.forEach(opt => {
            if (opt.value === val) {
              result = opt.label;
            }
          });
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>

  .dropdown
    display flex
    align-items center
    justify-content space-between
    cursor pointer

  .list
    width 100%
    list-style none
    margin 0
    padding 0
    position absolute
    left 0
    z-index 100
    top 32px
    background white
    max-height 320px
    overflow-y auto
    box-shadow 0 2px 4px 0 rgba(0,0,0,0.1)

  .drop-icon
    font-size 17px

  .outer
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 99

  .label-modal
    border-bottom 1px solid #dddddd

  .item-modal
    display flex
    justify-content space-between

  .label-modal
  .item-modal
    padding 10px 24px
    font-size 14px

</style>
