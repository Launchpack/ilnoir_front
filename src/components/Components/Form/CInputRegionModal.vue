<template>
  <div :style="containerStyle" class="full-width">

    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>

    <!-- input 영역 -->
    <div :style="inputStyle" class="flex-between position-relative unselect" @click="$refs.regionModal.open()">
      <div class="flex-align">
        <i class="material-icons" style="font-size: 20px; margin-right: 8px; color: #d6d6d6">location_on</i>
        <span v-if="selectedValue">{{ selectedValue }}</span>
        <span v-else-if="placeholder">{{ placeholder }}</span>
        <span v-else>{{ placeHolder }}</span>
      </div>
      <i :style="iconStyle" class="material-icons">keyboard_arrow_down</i>
    </div>

    <!-- Modal -->
    <sweet-modal ref="regionModal" overlay-theme="dark">
      <block-regions :filterOptions="filterOptions" @selectedRegion="selectedRegion"
                    @closeModal="$refs.regionModal.close()"></block-regions>
    </sweet-modal>
    
  </div>  
</template>

<script>
import { SweetModal } from 'sweet-modal-vue';
import FormMixin from '@/components/Mixins/FormMixin';
import BlockRegions from  '../Block/BlockRegions';

export default {
  name: 'c-input-regionModal',
  components: {
    SweetModal,
    BlockRegions
  },
  mixins: [
    FormMixin
  ],
  props: {
    filterOptions: {
      type: Object
    }
  },
  data() {
    return {
      placeHolder: '지역명',
      selectedValue: ''
    }
  },
  created() {
    if (this.filterOptions.selectedValue !== undefined) {
      this.selectedValue = this.filterOptions.selectedValue;
    }
  },
  mounted() {

  },
  computed: {
    iconStyle() {
      if (this.iconCustomStyle) return this.iconCustomStyle;
      else return {
        color: this.brandColor.sub.color
      };
      },
  },
  methods: {
    selectedRegion(res) {
      this.selectedValue = `${res.sido.name} ${res.sigungu.name}`;
      this.filterOptions.selectedValue = this.selectedValue;
      this.$emit('update:filterOptions', this.filterOptions);
      this.$emit('update:value', res);
    }
  }
}
</script>

<style lang="stylus" type="stylus" scoped>

</style>