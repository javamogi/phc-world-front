<template>
  <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                <div class="userProfileInfo">
                	<div class="image text-center">
						<img :src="imgUrl" alt="#" class="img-responsive">
						<a href="#" title="이미지 변경" class="editImage">
							<i class="fa fa-camera"></i>
						</a>
					</div>
				</div>
                    <div class="panel-heading">
                        <h3 class="panel-title">개인정보수정</h3>
                    </div>
                    <div class="panel-body">
                    	<!-- error message -->
                        <div v-show="show" class="alert alert-danger alert-dismissable">
                        	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                             {{errorMessage}} 
                         </div>
                         <!-- /error message -->
                    	
                        <form v-on:submit.prevent="submit" role="form" method="put" action="">
                        	<input type="hidden" name="id" :value="id">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="E-mail" name="email" type="email" autofocus :value="email" readonly="readonly">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" type="password" :value="password">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Name" name="name" type="text" v-model="name">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Date" name="date" type="text" v-model="createDate">
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button type="submit" class="btn btn-lg btn-success btn-block">개인정보수정</button>
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
            id: null,
            email: null,
            password: null,
            name: null,
            createDate: null,
            imgUrl: null,
            show: false,
            errorMessage: null,
            statusCode: null
        }
    },
    methods: {
        submit(){
            // const token = this.$store.getters.getToken;
            // const grantType = this.$store.getters.getGrantType;
            const token = this.$store.getters.getToken;
            const grantType = "Bearer ";
            const apiUrl = process.env.VUE_APP_API_URL;
            const instance = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: grantType + token
                }
            })

            this.statusCode = '';
            const userData = new FormData();
            userData.append("id", this.id);
            userData.append("email", this.email);
            userData.append("password", this.password);
            userData.append("name", this.name);

            instance
            .patch(apiUrl + '/api/users', userData, {})
            .then((res) => {
                console.log(res);
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
    },
    beforeMount(){
        // const token = this.$store.getters.getToken;
        // const grantType = this.$store.getters.getGrantType;
        const token = this.$store.getters.getToken;
        const grantType = "Bearer ";
        const apiUrl = process.env.VUE_APP_API_URL;
        const instance = axios.create({
            baseURL: apiUrl,
            headers: {
                Authorization: grantType + token
            }
        })

        instance
        .get('/api/users/userInfo', {})
        .then((res) => {
            console.log("------ axios Get 성공---------");
            console.log(res.data);
            this.id = res.data.id;
            this.email = res.data.email;
            this.name = res.data.name;
            this.createDate = res.data.createDate;
            this.imgUrl = "static/images/profile/" + res.data.profileImage;
        })
        .catch((res) => {
            console.error(res);
        })
    }
}
</script>

<style>

</style>