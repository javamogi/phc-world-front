<template>
  <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign In</h3>
                    </div>
                    <div class="panel-body">
                        <div v-show="show" >
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                {{ errorMessage }}
                            </div>
                        </div>
                        <form v-on:submit.prevent="submit" role="form" method="post" action="">
                            <fieldset>
                                <div class="form-group">
                                    <input @keyup="regexEmail" class="form-control" placeholder="E-mail" id="email" name="email" type="email" v-model="email" autofocus>
                                </div>
                                <div class="form-group">
                                    <input @keyup="regexPassword" class="form-control" placeholder="Password" name="password" type="password" v-model="password">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input id="remember" name="remember" type="checkbox" value="Remember Me">Remember Me
                                    </label>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button type="submit" id="loginButton" class="btn btn-lg btn-success btn-block">Login</button>
                            </fieldset>
                        </form>
                    </div>
                    <!-- <div class="panel-body">
                        <a class="btn btn-block btn-social btn-facebook">
                           <i class="fa fa-facebook"></i> Sign in with Facebook
                        </a>
                        <a class="btn btn-block btn-social btn-google-plus">
                           <i class="fa fa-google-plus"></i> Sign in with Google
                        </a>
                    </div>  -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            email: '',
            password: '',
            statusCode: '',
            errorMessage: '',
            show: false
        }
    },
    methods: {
        regexEmail(){
            const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
            let email = this.email;
            if(email.length < 3){
                this.errorMessage = "이메일은 3자 이상으로 해야합니다.";
                this.show = true;
            } else if(!regex.test(email)){
                this.errorMessage = "이메일 형식이 아닙니다";
                this.show = true;
            } else {
                this.show = false;
            }
        },
        regexPassword(){
            let password = this.password;
            if(password.length < 4){
                this.errorMessage = "비밀번호는 4자 이상으로 해야합니다.";
                this.show = true;
            } else {
                this.show = false;
            }
        },
        submit(){
            this.regexEmail();
            this.regexPassword();
            if(this.show){
                return;
            }
           
            const apiUrl = process.env.VUE_APP_API_URL;
            const instance = axios.create({
                baseURL: apiUrl,
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const userData = JSON.stringify({
                email: this.email,
                password: this.password
            })

            instance
            .post('/api/users/login', userData, {})
            .then((res) => {
                if(res.status === 200){
                    this.$store.dispatch('setToken', res.data.accessToken);
                    this.$store.dispatch('setGrantType', res.data.grantType);
                    this.$router.push('/');
                }
            })
            .catch((res) => {
                console.error(res);
                let statusCode = res.response.status;
                this.statusCode = statusCode;
                this.show = true;
                if(statusCode === 400){                    
                    this.errorMessage = "비밀번호가 틀렸습니다."
                } else {
                    this.errorMessage = "존재하지 않는 아이디입니다.";
                }
            })
        }
    }
}
</script>

<style>

</style>