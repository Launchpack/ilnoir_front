<template>
<div class="full-width full-height">
  <e-editor v-if="limit" :html="limit" style="padding: 0 16px 16px"></e-editor>
</div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockTermsofservice',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "limit": undefined
    }
  },
  created() {
      this.$axios.get(`public/policy`)
      .then(res => {
        this.limit = res.data.policy.limit;
      })
    },
  
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


