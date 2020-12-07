
export default {
    components: {

    },
    mixins: [

    ],
    props: {

    },
    
    
    methods: {
        clickBack() {
		  if(this.$route.query.notif) {
		    this.$router.push("/splash");
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
