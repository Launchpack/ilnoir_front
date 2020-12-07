<template>
  <div :style="containerStyle">

    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>

    <div class="c-time-content"
         style="display: flex; align-items: center;"
         @click.stop.prevent="openPicker">
      <div class="c-date-content-date"
           :style="inputStyle"
           :class="{ 'disabled-text' : disabled}">
           {{ value === "" ? placeholder : value }}
          <i v-if="timePickerIcon" :style="timePickerIcon.style" :class="timePickerIcon.className">{{ timePickerIcon.iconName }}</i>
           </div>
    </div>

    <transition name="fade">
      <div v-show="pickerOpened"
           class="c-time-picker-bg"
           @click="closePicker">
        <div @click.stop.prevent="">
          <transition name="drawer">
            <div class="c-time-picker"
                 v-if="pickerOpened">

              <!-- AM/PM  -->
              <div class="c-time-picker-period"
              >
                <div class="lp-other-line"></div>

                <select
                    v-if="!using24"
                    id="time-ampm">
                  <option v-for="(period, idx) in periodOptions" :key="idx"
                          style="width:100px"
                          :value="period.value">{{ period.label }}</option>
                </select>

                <!-- 시  -->
                <select
                    id="time-hour">
                  <option v-for="(hour, idx) in hourOptions" :key="idx"
                          :value="hour">{{ hour }}</option>
                </select>

                <!-- 분  -->
                <select
                    id="time-min">
                  <option v-for="(minute, idx) in minuteOptions" :key="idx"
                          :value="minute">{{ minute }}</option>
                </select>
              </div>


              <div class="btns">
                <!-- 취소  -->
                <div class="c-time-picker-cancel"
                     @click.stop.prevent="clickCancel">
                  취소
                </div>
                <!-- 확인  -->
                <div class="c-time-picker-done"
                     @click.stop.prevent="clickDone">
                  확인
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import moment from 'moment'
  import { directive as onClickaway } from 'vue-clickaway'
  import FormMixin from '@/components/Mixins/FormMixin'

  export default {
    props: {
      timePickerIcon: {
        type: Object,
        required: false
      }
    },
    mixins: [
      FormMixin
    ],

    directives: {
      onClickaway: onClickaway
    },

    data() {
      return {
        hour: 0,
        minute: 0,
        period: 'am',
        pickerOpened: false,
        using24: true,
        minuteStep: 5,
      };
    },

    created() {
      this.initValue;
      this.clickDone;
    },

    computed: {
      time() {
        if (this.using24) {
          return '%02d:%02d'
            .format(this.hour, this.minute);
        } else {
          let time = moment(
            this.hour + ':' + this.minute, 'H:m');
          return time.format('A hh:mm');
        }
      },

      hourOptions() {
        if (this.using24) {
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
            13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        } else {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
      },

      minuteOptions() {
        let opts = [];
        for (let i = 0; i < 60; i += this.minuteStep) {
          opts.push(i);
        }
        opts = opts.concat(opts);

        return opts;
      },

      periodOptions() {
        if (!this.using24) {
          return [
            {
              value: 'am',
              label: '오전'
            },
            {
              value: 'pm',
              label: '오후'
            }
          ]
        } else {
          return [];
        }
      }
    },

    watch: {
      time(n) {
        this.$emit('update:value', n);
      },
      value(n) {
        this.initValue;
        this.clickDone;
        this.$emit('update:value', n);
      }
    },

    methods: {
      initValue() {
        if (this.value) {
          this.hour = this.value.split(':')[0];
          this.minute = this.value.split(':')[1];
        }
      },

      openPicker() {
        if (this.disabled) return;
        this.pickerOpened = true;
        this.setPicker();
      },

      setPicker() {
        this.$nextTick(() => {
          $('#time-ampm').drum({
            onChange: e => {
              this.period = e.value;
            },
          });
          $('#time-hour').drum({
            onChange: e => {
              this.hour = parseInt(e.value);
            }
          });
          $('#time-min').drum({
            onChange: e => {
              this.minute = parseInt(e.value);
            }
          });

          let ampmIdx = 0;
          if(this.period === 'pm') ampmIdx = 1;
          $('#time-ampm').drum('setIndex', ampmIdx);


          $('#time-hour').drum('setIndex', this.hour);
          $('#time-min').drum('setIndex', this.minuteOptions.indexOf(this.minute));
        });
      },

      closePicker() {
        this.pickerOpened = false;
      },

      clickCancel() {
        this.closePicker();
      },

      clickDone() {
        if (this.using24) {
          this.hour = this.hour;
          this.minute = this.minute;
        } else {
          let time24 = this.$_to24Format(this.period, this.hour, this.minute);
          this.hour = time24.hour;
          this.minute = time24.minute;
        }
        this.closePicker();
      },

      $_to24Format(period, hour, minute) {
        let timeString = period + ' ' + hour + ':' + minute;
        let t = moment(timeString, 'a h:m');
        return {
          hour: t.hour(),
          minute: t.minute()
        };
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .c-time-content
    display flex

  .c-time-picker-bg
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(0, 0, 0, 0.3)
    z-index 10

  .c-time-picker
    width 360px
    position fixed
    left 50%
    bottom 0
    transform translateX(-50%)
    border 1px solid #ddd
    box-shadow 0px 3px 4px 2px #00000029
    z-index 10
    background-color white
    padding-top 32px

  .c-time-picker-period
    display flex
    justify-content space-between
    width 100%
    margin 20px auto
    position relative
    padding 0 52px

  .fade-enter-active
    transition all .3s

  .fade-leave-active
    transition all 3s reverse

  .fade-enter, .fade-leave
    opacity 0

  .drawer-enter-active
    transition all .3s

  .drawer-leave-active
    transition all .3s reverse

  .drawer-enter, .drawer-leave
    bottom -300px

  .btns
    display flex
    padding 20px
    justify-content flex-end

  .c-time-picker-cancel
  .c-time-picker-ok
    padding 0 4px

  .c-time-picker-cancel
    margin-right 12px
    color #787878

  .lp-other-line
    position absolute
    top 46px
    left 0
    width 100%
    height 28px
    border-top 1px solid #ddd
    border-bottom 1px solid #ddd

  .disabled-text
    color #bbb
</style>
