<template>
  <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">PHC World</a>
            </div>
            <!-- /.navbar-header -->
            
            <ul class="nav navbar-top-links navbar-right">
			<li class="dropdown">
               <a href="/login"><i class="fa fa-sign-in"> 로그인</i></a>
             </li>
                <!-- /.dropdown -->
			<li class="dropdown">
               <a href="/sign"><i class="fa fa-pencil-square-o"> 회원가입</i></a>
            </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <SideNavbar v-if="$route.name !== 'sign'"/>
        </nav>
</template>

<script>
import SideNavbar from '@/components/layout/SideNavbar.vue'

export default {
    components: {
        SideNavbar
    }
}
</script>

<style>

</style>