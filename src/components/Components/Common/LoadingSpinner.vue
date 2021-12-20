<template>
  <div class="loading-container">
    <div class="loading-wrapper">
      <div class="message">{{ message }}</div>
      <div class="flex-center">
        <div class="lp-spinner">
          <div v-for="idx in 12" :key="'spn-'+idx"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      message: {
        type: String,
        default: '진행중입니다'
      }
    },
    created() {
      document.body.style.overflow = 'hidden';
    },
    beforeDestroy() {
      document.body.style.overflow = '';
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .loading-container
    position fixed
    z-index 1000
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
    top 0

  .loading-wrapper
    background rgba(0,0,0,0.8)
    border-radius 8px
    padding 0 32px

  @keyframes lp-spinner
    0%
      opacity 1
    100%
      opacity 0

  @-webkit-keyframes lp-spinner
    0%
      opacity 1
    100%
      opacity 0

  .lp-spinner
    position relative

  .lp-spinner div
    left 94px
    top 48px
    position absolute
    -webkit-animation lp-spinner linear 1s infinite
    animation lp-spinner linear 1s infinite
    width 12px
    height 24px
    border-radius 40%
    -webkit-transform-origin 6px 52px
    transform-origin 6px 52px
    background-color #4f76ff

  .lp-spinner div:nth-child(1)
    -webkit-transform rotate(0deg)
    transform rotate(0deg)
    -webkit-animation-delay -0.916666666666667s
    animation-delay -0.916666666666667s

  .lp-spinner div:nth-child(2)
    -webkit-transform rotate(30deg)
    transform rotate(30deg)
    -webkit-animation-delay -0.833333333333333s
    animation-delay -0.833333333333333s

  .lp-spinner div:nth-child(3)
    -webkit-transform rotate(60deg)
    transform rotate(60deg)
    -webkit-animation-delay -0.75s
    animation-delay -0.75s

  .lp-spinner div:nth-child(4)
    -webkit-transform rotate(90deg)
    transform rotate(90deg)
    -webkit-animation-delay -0.666666666666667s
    animation-delay -0.666666666666667s

  .lp-spinner div:nth-child(5)
    -webkit-transform rotate(120deg)
    transform rotate(120deg)
    -webkit-animation-delay -0.583333333333333s
    animation-delay -0.583333333333333s

  .lp-spinner div:nth-child(6)
    -webkit-transform rotate(150deg)
    transform rotate(150deg)
    -webkit-animation-delay -0.5s
    animation-delay -0.5s

  .lp-spinner div:nth-child(7)
    -webkit-transform rotate(180deg)
    transform rotate(180deg)
    -webkit-animation-delay -0.416666666666667s
    animation-delay -0.416666666666667s

  .lp-spinner div:nth-child(8)
    -webkit-transform rotate(210deg)
    transform rotate(210deg)
    -webkit-animation-delay -0.333333333333333s
    animation-delay -0.333333333333333s

  .lp-spinner div:nth-child(9)
    -webkit-transform rotate(240deg)
    transform rotate(240deg)
    -webkit-animation-delay -0.25s
    animation-delay -0.25s

  .lp-spinner div:nth-child(10)
    -webkit-transform rotate(270deg)
    transform rotate(270deg)
    -webkit-animation-delay -0.166666666666667s
    animation-delay -0.166666666666667s

  .lp-spinner div:nth-child(11)
    -webkit-transform rotate(300deg)
    transform rotate(300deg)
    -webkit-animation-delay -0.083333333333333s
    animation-delay -0.083333333333333s

  .lp-spinner div:nth-child(12)
    -webkit-transform rotate(330deg)
    transform rotate(330deg)
    -webkit-animation-delay 0s
    animation-delay 0s

  .lp-spinner
    width 80px !important
    height 80px !important
    -webkit-transform translate(-40px, -40px) scale(0.4) translate(40px, 40px)
    transform translate(-40px, -40px) scale(0.4) translate(40px, 40px)

  .message
    color white
    text-align center
    margin 32px 0 4px 0
    font-size 17px
    background-color rgba(0,0,0,0.8)
</style>
