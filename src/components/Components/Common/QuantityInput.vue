<template>
  <div class="flex-align">
    <div class="flex-center unselect"
         @click="clickRemove">
      <i :style="iconLeftStyle" class="material-icons">remove</i>
    </div>

    <input type="number" :style="inputNumberStyle"
           :value="inputValue" :disabled="disabled"/>

    <div  class="flex-center unselect"
          @click="clickAdd">
      <i :style="iconRightStyle" class="material-icons">add</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuantityInput",
    props: {
      value: {
        type: [String, Number],
        required: false
      },
      inputStyle: {
        type: Object,
        required: false
      },
      btnMinusStyle: {
        type: Object,
        required: false
      },
      btnPlusStyle: {
        type: Object,
        required: false
      },
      max: {
        type: Number,
        default: 100
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    created() {
      if(this.value) this.inputValue = this.value;
    },
    watch: {
      inputValue(n) {
        this.$emit('update:value', n);
      }
    },
    methods: {
      clickAdd() {
        if(this.inputValue < this.max) {
          this.inputValue += 1;
        }
        this.$emit('update:value', this.inputValue)
      },
      clickRemove() {
        if(this.inputValue>1) {
          this.inputValue -= 1;
        }
        this.$emit('update:value', this.inputValue)
      }
    },
    computed: {
      iconLeftStyle() {
        if(this.btnMinusStyle) {
          return this.btnMinusStyle;
        }
        else {
          return {
            width: '30px',
            height: '30px',
            marginRight: '8px'
          }
        }
      },
      iconRightStyle() {
        if(this.btnPlusStyle) {
          return this.btnPlusStyle;
        }
        else {
          return {
            width: '30px',
            height: '30px',
            marginLeft: '8px'
          }
        }
      },
      inputNumberStyle() {
        if(this.inputStyle) {
          return this.inputStyle;
        } else {
          return {
            width: '33px',
            height: '30px',
            textAlign:'right',
            paddingRight:'6px'
          };
        }
      }
    }
  }
</script>

<style scoped>
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>