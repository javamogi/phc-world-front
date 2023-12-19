<template>
  <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-comment fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{ countOfAnswer }}</div>
                                    <div>New Comments!</div>
                                </div>
                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                    <!-- /.panel panel-primary -->
                </div>
                <!-- /.col-lg-3 col-md-6 -->
                
                <div class="col-lg-6 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-list-alt fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{countOfFreeBoard}}</div>
                                    <div>New Posts!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                    <!-- /.panel panel-green -->
                </div>
                <!-- /.col-lg-3 col-md-6 -->
                
                <div class="col-lg-6 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-book fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{countOfDiary}}</div>
                                    <div>New Posts!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                    <!-- /.panel panel-yellow -->
                </div>
                <!-- /.col-lg-3 col-md-6 -->
                
                <div class="col-lg-6 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-bell fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{countOfAlert}}</div>
                                    <div>New Posts!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                    <!-- /.panel panel-red -->
                </div>
                <!-- /.col-lg-3 col-md-6 -->
            </div>
            <!-- /.row -->
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bell fa-fw"></i> Notifications
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="/dashboard/timeline/{{timeline.id}}" v-for="timeline in timelineList" :key="timeline.id" class="list-group-item">
                                    <i :class="[timeline.icon]"></i> {{timeline.type}}
                                    <span class="pull-right text-muted small"><em>{{timeline.formattedSaveDate}}</em>
                                    </span>
                                </a>
                            </div>
                            <!-- /.list-group -->
                            <!-- <a href="#" class="btn btn-default btn-block">View All Alerts</a> -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                    
                    
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            
        </div>
        <!-- /#page-wrapper -->
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            countOfAnswer: '0',
            countOfFreeBoard: '0',
            countOfDiary: '0',
            countOfAlert: '0',
            timelineList : []
        }
    },
    methods: {
        setCounts(data){
            this.countOfAnswer = data.countOfAnswer;
            this.countOfFreeBoard = data.countOfFreeBoard;
            this.countOfDiary = data.countOfDiary;
            this.countOfAlert = data.countOfAlert;
        }
    },
    created(){
        const token = this.$store.getters.getToken;
        if(token === null){
            this.$router.push('/login');
        }
        const grantType = "Bearer "
        const apiUrl = process.env.VUE_APP_API_URL;
        const instance = axios.create({
            baseURL: apiUrl,
            headers: {
                Authorization: grantType + token
            }
        })

        instance
        .get('/api/dashboard', {})
        .then((res) => {
            console.log("------ axios Get 성공---------");
            console.log(res.data);
            this.setCounts(res.data);
            let temp = res.data.timelineList;
            for(let i = 0; i < temp.length; i++){
                let timeline = temp[i];
                timeline.icon = "fa fa-" + timeline.icon + " fa-fw"
            }
            this.timelineList = temp;
        })
        .catch((res) => {
            console.error(res);
        })
    }
}
</script>

<style>

</style>