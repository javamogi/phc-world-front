export default{
    created() {
        this.checkToken();
    },
    methods: {
        checkToken(){
            const token = this.$store.getters.getToken;
            if(token === null){
                this.$router.push('/login');
            }
        }
    }
}