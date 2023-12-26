import axios from 'axios'
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
        getNewToken(callback = () => {}){
            const token = this.$store.getters.getRefreshToken;
            const grantType = "Bearer "
            const apiUrl = process.env.VUE_APP_API_URL;
            const instance = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: grantType + token
                }
            })
    
            instance
            .get('/api/users/newToken', {})
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    this.$store.dispatch('setToken', res.data.accessToken);
                    this.$store.dispatch('setGrantType', res.data.grantType);
                    this.$store.dispatch('setRefreshToken', res.data.refreshToken);
                    callback();
                }
            })
            .catch((res) => {
                console.error(res);
            })
        }
    }
}