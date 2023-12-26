import Axios from '@/index'
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
        }, 
        getNewToken(callback){
            this.$store.dispatch('setToken', this.$store.getters.getRefreshToken);
            Axios
            .get('/api/users/newToken', {})
            .then((res) => {
                if(res.status === 200){
                    this.$store.dispatch('setToken', res.data.accessToken);
                    this.$store.dispatch('setGrantType', res.data.grantType);
                    this.$store.dispatch('setRefreshToken', res.data.refreshToken);
                    callback();
                }
            })
            .catch((err) => {
                console.log("new token 요청 실패");
                console.error(err);
            })
        }
    }
}