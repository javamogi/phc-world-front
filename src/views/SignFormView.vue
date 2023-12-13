<template>
  <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign Up</h3>
                    </div>
                    <div class="panel-body">
                    	<!-- <div class="alert alert-danger alert-dismissable">
                        	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                         </div> -->
                        <form v-on:submit.prevent="submit" role="form" method="post" action="">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="E-mail" name="email" type="email" v-model="email" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" type="password" v-model="password">
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Name" name="name" type="text" v-model="name">
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
            name: ''
        }
    },
    methods: {
        submit(){
            const userData = new FormData();
            userData.append("email", this.email);
            userData.append("password", this.password);
            userData.append("name", this.name);

            axios
            .post('http://localhost:8080/api/users', userData, {})
            .then((res) => {
                if(res.status === 200){
                    location.href='/login';
                }
            })
            .catch((res) => {
                console.error(res);
            })
        }
    }
}
</script>

<style>

</style>