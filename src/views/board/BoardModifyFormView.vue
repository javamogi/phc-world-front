<template>
  <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">자유게시판 수정</h1>
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
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                
                                    <form role="form" v-on:submit.prevent="submit" class="form-group" id="form-group" method="patch" action="">
                                        <input type="hidden" v-model="id">
                                        <div class="form-group">
                                            <label for="title">제목</label>
                                            <input class="form-control" id="title" name="title" placeholder="Title" v-model="title">
                                        </div>
                                        <div class="form-group">
                                            <label for="contents">내용</label>
     											<!-- <textarea id="sample_contents_source" style="display:none;">
												</textarea> -->
                                                <QuillEditor v-model:content="contents" contentType="html" class="form-control" toolbar="full"/>
                                        </div>
                                        <button type="submit" class="btn btn-info">수정</button>
                                        <button @click="cancel" class="btn btn-danger" type="button">취소</button>
                                    </form>
                                    <!-- /form -->
                                  </div>
                                  <!-- /.col-lg-12 -->
                                </div>
                                <!-- /.row -->
                              </div>
                              <!-- /.panel-body -->
                            </div>
                            <!-- /.panel panel-default -->
                          </div>
                          <!-- /.col-lg-12 -->
                        </div>
                        <!-- /.row -->
                                  
        
    	</div>
        <!-- /#page-wrapper -->
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
// import axios from 'axios'
import authMixin from '@/components/checkToken'
import Axios from '@/index'

export default {
    mixins: [authMixin],
    components: {
        QuillEditor
    },
    data(){
        return {
            id: null,
            title: null,
            contents: null
        }
    },
    methods: {
        submit(){
            if(this.title === null || this.title === ''){
                alert("제목을 입력하세요.");
                return;
            }
            if(this.contents === null || this.contents === ''){
                alert("내용을 입력하세요");
                return;
            }

            const boardData = JSON.stringify({
                id: this.id,
                title: this.title,
                contents: this.contents,
            })

            const headers = {
                "Content-Type": 'application/json'
            };

            Axios
            .patch('/api/freeboards', boardData, {headers})
            .then((res) => {
                if(res.status == 200){
                    alert("수정 성공");
                    this.$router.push({name: 'board', query: {id: this.id}});
                }
            })
            .catch((err) => {
                console.error(err);
                if(err.response.status === 401){
                    this.getNewToken(this.submit);
                } else {
                    alert("다시 로그인하세요.");
                    this.$store.dispatch('setToken', null);
                    this.$store.dispatch('setGrantType', null);
                    this.$store.dispatch('setRefreshToken', null);
                    this.$router.push('/login');
                }
            })
        },
        getBoardData(){
            let boardId = this.$route.query.id;
            const headers = {
                "Content-Type": 'application/json'
            };

            Axios
            .get('/api/freeboards/' + boardId, {headers})
            .then((res) => {
                this.id = res.data.freeboard.id;
                this.title = res.data.freeboard.title;
                this.contents = res.data.freeboard.contents;
            })
            .catch((err) => {
                console.error(err);
                if(err.response.status === 401){
                    this.getNewToken(this.getBoardData);
                } else {
                    alert("다시 로그인하세요.");
                    this.$store.dispatch('setToken', null);
                    this.$store.dispatch('setGrantType', null);
                    this.$store.dispatch('setRefreshToken', null);
                    this.$router.push('/login');
                }
            })
        },
        cancel(){
            // console.log(document.referrer);
            history.back();
        }
    },
    created(){
        this.getBoardData();
    }
}
</script>

<style>
@import '@vueup/vue-quill/dist/vue-quill.snow.css';
.ql-editor{ 
  height: 350px;
  max-height: 800px;
  overflow: auto;
}
</style>