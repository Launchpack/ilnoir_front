
export default {
    components: {

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
      clickBack() {
      if(this.$route.query.notif) {
        this.routerPush("/splash");
      }
      else {
        this.$router.back();
      }
    }
    },
    computed: {
    
    },
    watch: {
    
    }
}
