<template>
  <div class="c-rating" :style="containerStyle">


    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>

    <star-rating :star-size="starSize"
                 :border-width="2"
                 inactive-color="#ffffff"
                 :border-color="rateColor"
                 :increment="0.5"
                 :active-color="rateColor"
                 :show-rating="showRating"
                 :read-only="disabled"
                 v-model="rating"></star-rating>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating';
  import FormMixin from "@/components/Mixins/FormMixin"

  export default {
    name: "c-input-rating",
    props: {
      rateColor: {
        type: String,
        required: false,
        default: '#fddb46'
      },
      rateSize: {
        type: Number,
        required: false,
        default: 25
      },
      showRating: {
        type: Boolean,
        required: false,
        default: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    mixins: [
      FormMixin
    ],

    components: {
      StarRating
    },

    data() {
      return {
        rating: this.value
      }
    },

    watch: {
      rating(n) {
        this.$emit('update:value', n);
      },
      value(n) {
        this.rating = n;
      }
    },

    computed: {
      starSize() {
        return this.rateSize;
      }
      /*
            rating: {
              get() {
                let change = this.$store.state.builder.backendChange;

                if (typeof(this.properties.rating) === 'number') {
                  return this.properties.rating
                }

                let text = this.cloneItem(this.properties.rating);
                let dataSet = this.getDataSet(text);
                // text에서 {} 로 매핑할 데이터 구성한 경우
                if (text.search('{') > -1) {
                  // dataSet이 없을 때, 관리자의 경우 dummy값 출력
                  if (dataSet === undefined) {
                    text = '';
                  }

                  else {
                    let arr = text.match(/\{([^}]+)\}/g);
                    if (arr === null) return '';
                    for (let i = 0; i < arr.length; i++) {
                      let val = arr[i];
                      let val_org = val;
                      let isLength = false;
                      if (val.search('.length') > -1) {
                        isLength = true;
                        val = val.replace('.length', '');
                      }

                      let dataVal = this.objectValue(dataSet, val);
                      if (dataVal === undefined) {
                        if (this.isAdmin())
                          text = this.properties.emptyView;
                        else
                          text = '';
                        break;
                      } else {
                        if (isLength) {
                          dataVal = dataVal.length.toString();
                        }
                      }
                      text = text.replace(val_org, dataVal);
                    }
                  }
                }

                if (text === "undefined" || text === undefined || text === '') {
                  if (this.isAdmin())
                    text = this.properties.emptyView;
                  else
                    text = '';
                }
                if (text === '') text = 0;
                text = parseInt(text);
                return text;
              },

              set(newValue) {
                this.properties.rating = newValue;
              }
            }*/
    }
  }
</script>
<style type="stylus" lang="stylus">
  .c-rating
    margin-bottom 6px

  .not-form .c-rating
    margin 0 !important

</style>
