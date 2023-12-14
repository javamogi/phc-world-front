<template>
  <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign Up</h3>
                    </div>
                    <div class="panel-body">
                        <div v-show="show" >
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                {{ errorMessages }}
                            </div>
                        </div>
                        <form v-on:submit.prevent="submit" role="form" method="post" action="">
                            <fieldset>
                                <div class="form-group">
                                    <input @keyup="regexEmail" class="form-control" placeholder="E-mail" name="email" type="email" v-model="email" autofocus>
                                </div>
                                <div class="form-group">
                                    <input @keyup="regexPassword" class="form-control" placeholder="Password" name="password" type="password" v-model="password">
                                </div>
                                <div class="form-group">
                                    <input @keyup="regexName" class="form-control" placeholder="Name" name="name" type="text" v-model="name">
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button type="submit" class="btn btn-lg btn-success btn-block">Sign Up</button>
                            </fieldset>
                        </form>
                    </div>
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
            name: '',
            statusCode: '',
            errorMessages: [],
            show: false
        }
    },
    methods: {
        regexEmail(){
            const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
            let email = this.email;
            if(email.length < 3){
                this.statusCode = 400;
                this.errorMessages = "이메일은 3자 이상으로 해야합니다.";
                this.show = true;
            } else if(!regex.test(email)){
                this.statusCode = 400;
                this.errorMessages = "이메일 형식이 아닙니다";
                this.show = true;
            } else {
                this.show = false;
            }
        },
        regexPassword(){
            let password = this.password;
            if(password.length < 4){
                this.statusCode = 400;
                this.errorMessages = "비밀번호는 4자 이상으로 해야합니다.";
                this.show = true;
            } else {
                this.show = false;
            }
        },
        regexName(){
            const regex = /^[가-힣a-zA-Z0-9]+$/;
            let name = this.name;
            if(name === ''){
                console.log("-------------------------- null 체크 실행")
                this.statusCode = 400;
                this.errorMessages = "이름을 입력하세요.";
                this.show = true;
            } else if(!regex.test(name)){
                this.statusCode = 400;
                this.errorMessages = "이름은 한글, 영문, 숫자만 가능합니다.";
                this.show = true;
            } else if(name.length < 3){
                this.statusCode = 400;
                this.errorMessages = "이름은 영문 3자 이상 20자 이하 또는 한글 두자이상 6자 이하로 해야합니다.";
                this.show = true;
            } else {
                this.show = false;
            }
        },
        submit(){
            this.regexEmail();
            this.regexPassword();
            this.regexName();
            if(this.show){
                return;
            }
            const apiUrl = this.$store.state.apiUrl;

            this.statusCode = '';
            const userData = new FormData();
            userData.append("email", this.email);
            userData.append("password", this.password);
            userData.append("name", this.name);

            axios
            .post(apiUrl + '/api/users', userData, {})
            .then((res) => {
                if(res.status === 200){
                    location.href='/login';
                }
            })
            .catch((res) => {
                let statusCode = res.response.status;
                this.statusCode = statusCode;
                this.show = true;
                if(statusCode === 400){                    
                    this.errorMessages = res.response.data.messages;
                } else {
                    this.errorMessages = res.response.data.error;
                }
            })
        }
    }
}
</script>

<style>

</style>