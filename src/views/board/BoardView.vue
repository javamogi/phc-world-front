<template>
  <div id="page-wrapper">

<div class="container-fluid">

    <!-- Page Heading -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">
                자유게시판 보기 
            </h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->

    <div class="row">
              <div class="col-lg-12 col-md-12">
                <label for="title">제목</label>
                 <div class="form-group">
                    <input type="text" class="form-control" name="title" :value="title" :title="title" disabled>
                </div>
             </div>
             <div class="col-lg-12 col-md-12">
                <label for="date">작성일</label>
                 <div class="form-group">
                    <input type="text" class="form-control" name="createDate" :value="createDate" title="작성일" disabled>
                </div>
             </div>
             <div class="col-lg-12 col-md-12">
                <label for="userId">작성자</label>
                 <div class="form-group">
                      <input type="text" class="form-control" name="userId" :value="writer" disabled>
                </div>
              </div>
               <div class="col-lg-12 col-md-12">
                  <label for="contents">내용</label>
                  <div class="form-group">
                      <div class="well" style="line-height:2.8em; width:100%;">
                      <div v-html="contents"></div>
                      </div>
                  </div>
             </div>
             
             <div class="col-lg-12 col-md-12">
                <article class="answer-template">
                <label for="contents">
                    <h1 class="comments-title">
                        <span class="fa fa-comments"></span> 
                        Comments
                        <span id="countOfAnswer">{{countOfAnswerStr}}</span>
                    </h1>
                </label>
                <BoardAnswer :saveEditedAnswer="saveEditedAnswer" :answers="answers" :deleteAnswer="deleteAnswer" @edit-answer="showEditForm"/>
                </article>
             </div>
             
               <div v-if="isLogin" class="col-lg-12 col-md-12">
                 <form v-on:submit.prevent="registerAnswer" class="write-answer" id="form-group" action="#" method="post">
                      <label for="contents">댓글 쓰기</label>
                      <div class="form-group">
                         <textarea class="col-lg-10 col-md-10" id="contents" name="contents" placeholder="내용" v-model="answerContents"></textarea>
                         <div class="col-lg-2 col-md-2">
                              <button type="submit" id="save_button" class="btn btn-default">댓글등록</button>
                          </div>
                      </div>
                </form>
              </div>
           <!-- /.answer -->
           <div v-else class="col-lg-12 col-md-12">
                 <div class="bg-info">
                    <router-link to="/login">로그인</router-link>을 해야 댓글을 작성할 수 있습니다.
                  </div>
            </div>
         <div class="col-lg-12 col-md-12"><br></div>
         <div class="col-lg-12 col-md-12">
            <router-link to="/boards" class="btn btn-primary" role="button">목록</router-link>
            <button v-if="isModify" @click="modifyForm" class="btn btn-info" role="button">수정</button>
            <button v-if="isDelete" @click="deleteBoard" class="btn btn-danger" type="button">삭제</button>
         </div>
    </div>
    <!-- /.row -->
</div>
<!-- /.container-fluid -->

</div>
<!-- /#page-wrapper -->
</template>

<script>
import authMixin from '@/components/checkToken'
import Axios from '@/index'
import BoardAnswer from '@/components/BoardAnswer.vue'

export default {
    mixins: [authMixin],
    components: {
        BoardAnswer
    },
    data(){
        return {
            id: null,
            title: null,
            writer: null,
            contents: null,
            createDate: null,
            countOfAnswer: null,
            countOfAnswerStr: null,
            isLogin: this.$store.getters.isLogin,
            isDelete: null,
            isModify: null,
            answers: [],
        }
    },
    methods: {
        deleteBoard(){
            Axios
            .delete('/api/freeboards/' + this.id, {})
            .then((res) => {
                if(res.status == 200){
                    alert(res.data.message);
                    history.back();
                }
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.deleteBoard);
                } else {
                    alert("다시 로그인하세요.");
                    this.$store.dispatch('setToken', null);
                    this.$store.dispatch('setGrantType', null);
                    this.$store.dispatch('setRefreshToken', null);
                    this.$router.push('/login');
                }
            })
        },
        modifyForm(){
            this.$router.push({name: 'boardModifyForm', query: {id: this.id}});
        },
        getBoardData(){
            let boardId = this.$route.query.id;
            Axios
            .get('/api/freeboards/' + boardId, {})
            .then((res) => {
                console.log(res);
                this.id = res.data.freeboard.id;
                this.title = res.data.freeboard.title;
                this.writer = res.data.freeboard.writer.name;
                this.contents = res.data.freeboard.contents;
                this.createDate = res.data.freeboard.createDate;
                this.isDelete = res.data.isDeleteAuthority;
                this.isModify = res.data.isModifyAuthority;
                this.countOfAnswer = res.data.freeboard.countOfAnswer;
                if(this.countOfAnswer > 0){
                    this.countOfAnswerStr = "[" + this.countOfAnswer + "]";
                }
                const answersWithEditingState = res.data.freeboard.answers.map(
                    answer => ({
                        ...answer,
                        isEditing: false,
                        editedText: ''
                    })
                );
                this.answers = answersWithEditingState;
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.deleteBoard);
                } else {
                    alert("다시 로그인하세요.");
                    this.$store.dispatch('setToken', null);
                    this.$store.dispatch('setGrantType', null);
                    this.$store.dispatch('setRefreshToken', null);
                    this.$router.push('/login');
                }
            })
        },
        registerAnswer(){
            const headers = {
                "Content-Type": 'application/json'
            };

            const answerData = JSON.stringify({
                boardId: this.id,
                contents: this.answerContents
            })

            Axios
            .post('/api/freeboards/answers', answerData, {headers})
            .then((res) => {
                console.log(res);
                this.answers.push(res.data);
                this.answerContents = '';
                this.countOfAnswer = this.countOfAnswer + 1;
                if(this.countOfAnswer > 0){
                    this.countOfAnswerStr = "[" + this.countOfAnswer + "]";
                }
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.registerAnswer);
                }
            })
        },
        deleteAnswer(index, answerId) {
            Axios
            .delete('/api/freeboards/answers/' + answerId, {})
            .then((res) => {
                console.log(res);
                this.answers.splice(index, 1);
                this.countOfAnswer = this.countOfAnswer - 1;
                if(this.countOfAnswer > 0){
                    this.countOfAnswerStr = "[" + this.countOfAnswer + "]";
                } else {
                    this.countOfAnswerStr = '';
                }
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.deleteAnswer);
                } else {
                    alert("다시 로그인하세요.");
                    this.$store.dispatch('setToken', null);
                    this.$store.dispatch('setGrantType', null);
                    this.$store.dispatch('setRefreshToken', null);
                    this.$router.push('/login');
                }
            })
        },
        showEditForm(index) {
            this.answers[index].isEditing = true;
        },
        saveEditedAnswer(index) {
            const headers = {
                "Content-Type": 'application/json'
            };

            const answerData = JSON.stringify({
                answerId: this.answers[index].id,
                contents: this.answers[index].contents
            })

            Axios
            .patch('/api/freeboards/answers', answerData, {headers})
            .then((res) => {
                if(res.status === 200){
                    this.answers[index].isEditing = false;
                }
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.deleteAnswer);
                } else {
                    alert("다시 로그인하세요.");
                    this.$store.dispatch('setToken', null);
                    this.$store.dispatch('setGrantType', null);
                    this.$store.dispatch('setRefreshToken', null);
                    this.$router.push('/login');
                }
            })
        },
        
    },
    created(){
        this.getBoardData();
    }
}
</script>

<style>
@import '../../../public/static/vendor/bootstrap/css/freeBoard.css';
</style>