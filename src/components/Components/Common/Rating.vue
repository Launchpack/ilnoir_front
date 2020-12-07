<template>
  <div class="rating">
    <star-rating :star-size="rateSize"
                 :border-width="2"
                 inactive-color="#ffffff"
                 :border-color="rateColor"
                 :increment="0.5"
                 :active-color="rateColor"
                 :show-rating="showRating"
                 :read-only="disabled"
                 v-model="value"
                 :rounded-corners="roundShape ? true : false"
                 :star-points="roundShape ? [23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17] : []"></star-rating>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating';

  export default {
    name: "Rating",

    components: {
      StarRating
    },

    props: {
      value: {
        type: Number,
        required: true
      },
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
        default: true
      },
      roundShape: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>