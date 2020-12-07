<template>
<div class="full-width full-height">
  <e-editor v-if="term" :html="term" style="padding: 0 16px 16px"></e-editor>
</div>
</template>
<script>
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockPrivacy',
  components: {

  },
  mixins: [
    BlockMixin
  ],
  props: {

  },
  data() {
    return {
      "term": undefined
    }
  },
  created() {
      this.$axios.get('public/policy')
      .then(res => {
        this.term = res.data.policy.term;
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


