<template>
<article v-for="(answer, index) in answers" :key="answer.id" class="answer-article" id="answer-article">
<div class="be-comment">
<div class="be-img-comment">	
    <a href="#">
        <img :src="answer.writer.profileImage" alt="" class="be-ava-comment">
    </a>
</div>
<div class="be-comment-content">
    <span class="be-comment-name">
        <a href="#">{{answer.writer.name}}</a>
    </span>
    <span class="be-comment-time">
        <button type="button" class="answer-get" @click="editAnswer(index)">수정</button>
        <button type="button" class="answer-delete" @click="deleteAnswer(index, answer.id)">
            삭제
        </button>
        <i class="fa fa-clock-o"></i>
            {{answer.updatedDate}}
    </span>
    <p v-if="!answer.isEditing" class="be-comment-text">
        {{ answer.contents }}
    </p>
    <div v-else class='col-lg-12 col-md-12'>
        <div class='form-group'>
            <textarea v-model="answer.contents" class='col-lg-10 col-md-10'></textarea>
            <div class='col-lg-2 col-md-2'>
                <button type="button" @click="saveEditedAnswer(index)" class='answer-get'>수정</button>
                <!-- <button type="button" class='answer-get'>취소</button> -->
            </div>
        </div>
    </div>
</div>
</div>
</article>
</template>

<script>
export default {
    props: {
        answers: Array,
        deleteAnswer: Function,
        saveEditedAnswer: Function
    },
    methods: {
        editAnswer(index) {
            this.$emit('edit-answer', index);
        }
    }
}
</script>

<style>

</style>