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
                <router-link class="navbar-brand" to="/">PHC World</router-link>
            </div>
            <!-- /.navbar-header -->
            
            <ul class="nav navbar-top-links navbar-right">
            <template v-if="isLogin">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-envelope fa-fw"></i><span id="countOfMessageHeader" class="badge badge-danger">countMessage</span> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-messages">
                        <li>
                            <a href="#tab-item-3">
                                <div>
                                    <strong>보낸사람</strong>
                                    <span class="pull-right text-muted">
                                        <em>날짜</em>
                                    </span>
                                </div>
                                <div>내용</div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li> 메세지가 없습니다. </li>
                   		<li class="divider"></li>
                        <li>
                            <a class="text-center" href="#">
                                <strong>Read All Messages</strong>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-bell fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-alerts">
                    	<li>
                            <a href="/post">
                                <div>
                                        이름 님이 어디 게시물에 댓글을 달았습니다.
                                    <span class="pull-right text-muted small">formattedCreateDate</span>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li> 알림이 없습니다. </li>
                        <li class="divider"></li>
                        <li>
                            <a class="text-center" href="#">
                                <strong>See All Alerts</strong>
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>       
                    </ul>
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li>
                            <a href="/profile"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li>
                            <!-- <a href="/setting"><i class="fa fa-gear fa-fw"></i> Settings</a> -->
                            <router-link to="setting"><i class="fa fa-gear fa-fw"></i> Settings</router-link>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="/logout"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </template>
            <template v-else>
                <li class="dropdown">
                    <a href="/login"><i class="fa fa-sign-in"> 로그인</i></a>
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a href="/sign"><i class="fa fa-pencil-square-o"> 회원가입</i></a>
                </li>
                <!-- /.dropdown -->
            </template>
            </ul>
            <SideNavbar v-if="isView"/>
        </nav>
</template>

<script>
import SideNavbar from '@/components/layout/SideNavbar.vue'

export default {
    data(){
        return {
            isLogin: this.$store.getters.isLogin,
            isView: true
        }
    },
    components: {
        SideNavbar
    },
    computed:{
        updateLogin(){
            return this.$store.getters.isLogin;
        },
        updateRouteName(){
            return this.$route.name;
        }
    },
    watch: {
        updateLogin(val){
            this.isLogin = val;
        },
        updateRouteName(name){
            this.isView = true;
            if(name === 'sign' || name === 'login' || name === 'setting'){
                this.isView = false;
            }
        }
    }
}
</script>

<style>

</style>