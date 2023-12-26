import Axios from "axios";
import store from './store'

// 1. 기본 설정 추가
const AxiosInst = Axios.create({
    baseURL : process.env.VUE_APP_API_URL   // baseURL 추가
})

// 2. 모든 요청을 intercept 해서 header값 설정(토큰)
// : Axios request일때 이 설정값을 사용한다는 것
AxiosInst.interceptors.request.use( 
    (config) => {
        let access_token = store.getters.getToken;
        if(access_token){
            config.headers.Authorization = "Bearer " + `${access_token}`;
        }
        return config;
    }
)
export default AxiosInst;