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
                    <input type="text" class="form-control" id="exampleInputTitle" name="title" :value="title" :title="title" disabled>
                </div>
             </div>
             <div class="col-lg-12 col-md-12">
                <label for="title">작성일</label>
                 <div class="form-group">
                    <input type="text" class="form-control" id="exampleInputTitle" name="createDate" :value="createDate" title="작성일" disabled>
                </div>
             </div>
             <div class="col-lg-12 col-md-12">
                <label for="userId">작성자</label>
                 <div class="form-group">
                      <input type="text" class="form-control" id="exampleInputName" name="userId" :value="writer" disabled>
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
             
             <!-- <div class="col-lg-12 col-md-12">
             <article class="answer-template">
                 <label for="contents"><h1 class="comments-title"><span class="fa fa-comments"></span> Comments<span id="countOfAnswer">{{countOfAnswer}}</span></h1></label>
                {{#freeBoardAnswerList}}
                <article class="answer-article" id="answer-article">
                <div class="be-comment">
                    <div class="be-img-comment">	
                        <a href="/users/{{writer.id}}/profile">
                            <img src="/images/profile/{{writer.profileImage}}" alt="" class="be-ava-comment">
                        </a>
                    </div>
                    <div class="be-comment-content">
                        <span class="be-comment-name">
                            <a href="/users/{{writer.id}}/profile">{{writer.name}}</a>
                        </span>
                        <span class="be-comment-time">
                            <a class="answer-get" href="/freeboards/{{freeBoard.id}}/answers/{{id}}">수정</a>
                            <a class="answer-delete" href="/freeboards/{{freeBoard.id}}/answers/{{id}}">삭제</a>
                            <i class="fa fa-clock-o"></i>
                                {{updateDate}}
                        </span>
                        <p class="be-comment-text">
                            {{{contents}}}
                        </p>
                    </div>
                </div>
                </article>
                {{/freeBoardAnswerList}}
             </article>
             </div> -->
             
               <div v-if="isLogin" class="col-lg-12 col-md-12">
                 <form class="write-answer" id="form-group" action="/freeboards//answers" method="post">
                      <label for="contents">댓글 쓰기</label>
                      <div class="form-group">
                         <textarea class="col-lg-10 col-md-10" id="contents" name="contents" placeholder="내용"></textarea>
                         <div class="col-lg-2 col-md-2">
                              <button type="submit" id="save_button" class="btn btn-default">댓글등록</button>
                          </div>
                         <!-- <input type="hidden" name="writer" value="test">
                         <input type="hidden" name="boardId" value="test">
                             <div class="col-md-2 col-md-offset-10"></div> -->
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
// import axios from 'axios'
import authMixin from '@/components/checkToken'
import Axios from '@/index'

export default {
    mixins: [authMixin],
    data(){
        return {
            id: null,
            title: null,
            writer: null,
            contents: null,
            createDate: null,
            isLogin: this.$store.getters.isLogin,
            isDelete: null,
            isModify: null
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
                this.id = res.data.freeboard.id;
                this.title = res.data.freeboard.title;
                this.writer = res.data.freeboard.writer.name;
                this.contents = res.data.freeboard.contents;
                this.createDate = res.data.freeboard.createDate;
                this.isDelete = res.data.isDeleteAuthority;
                this.isModify = res.data.isModifyAuthority;
            })
            .catch((err) => {
                console.error(err);
                if(err.response && err.response.status === 401){
                    this.getNewToken(this.deleteBoard);
                }
            })
        }
    },
    created(){
        this.getBoardData();
    }
}
</script>

<style>

</style>