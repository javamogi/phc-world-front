<template>
  <div></div>
</template>

<script>
// import axios from 'axios'

export default {
    created(){
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setRefreshToken', null);
        this.$router.push('/');
        // const token = this.$store.getters.getToken;
        // const grantType = "Bearer "
        // const apiUrl = process.env.VUE_APP_API_URL;
        // const instance = axios.create({
        //     baseURL: apiUrl,
        //     headers: {
        //         Authorization: grantType + token
        //     }
        // })

        // instance
        // .get('/api/users/logout', {})
        // .then((res) => {
        //     if(res.status === 200){
        //         console.log(res);
        //         this.$store.dispatch('setToken', null);
        //         this.$router.push('/');
        //     }
        // })
        // .catch((res) => {
        //     console.error(res);
        // })
    }
}
</script>

<style>

</style>