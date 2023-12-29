<template>
  <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">자유게시판</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            FreeBoard
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                        <div class="table-responsive-lg">
                            <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th scope="col">번호</th>
                                        <th scope="col">제목</th>
                                        <th scope="col">날짜</th>
                                        <th scope="col">작성자</th>
                                        <th scope="col">조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(board, idx) in boards" :key="board.id" class="info">
                                        <td>{{idx + 1}}</td>
                                        <td>
                                            <router-link :to="{name: 'board', query: {id: board.id}}">{{board.title}}</router-link>
                                            <span v-if="board.isNew" class="badge badge-danger">New</span>
                                            <span v-if="board.count > 0" class="badge badge-primary">{{board.count}}</span>
                                        </td>
                                        <td id="date">{{board.createDate}}</td>
                                        <td class="center">
                                            <img :src="board.writer.profileImage" :title="board.writer.name" class="avatar img-circle"> 
                                            <a href="#" :title="board.writer.name">{{board.writer.name}}</a>
                                        </td>
                                        <td class="center">{{board.count}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- /.table-responsive -->
                           <a class="btn btn-primary" href="/boardForm" role="button"><span class="glyphicon glyphicon-pencil"></span> 새 글 쓰기</a>
                        </div>
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
import authMixin from '@/components/checkToken'
import Axios from '@/index'

export default {
    mixins: [authMixin],
    data(){
        return {
            boards: null
        }
    },
    methods: {
        getFreeBoardData() {
            Axios
            .get('/api/freeboards', {
                params: {
                    pageNum: 1,
                    pageSize: 10,
                    searchType: 0,
                    keyword: ''
                }
            })
            .then((res) => {
                this.boards = res.data;
            })
            .catch((err) => {
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.getFreeBoardData);
                }
            })
        }
    },
    created(){
        this.getFreeBoardData();
    }
}
</script>

<style>
#dataTables-example > tbody > tr > td .avatar {
  width: 22px;
  border: 1px solid #CCC;
}
</style>