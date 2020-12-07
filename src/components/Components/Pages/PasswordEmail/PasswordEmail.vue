<template>
<div style="padding:32px">
    <block-password-email @Success="$emit('close_page_modal')"></block-password-email>
  </div>
</template>
<script>
import BlockPasswordEmail from "@/components/Components/Block/BlockPasswordEmail"

export default {
  name: 'PasswordEmail',
  components: {
    BlockPasswordEmail
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


