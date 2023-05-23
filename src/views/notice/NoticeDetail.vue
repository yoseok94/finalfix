<template>
  <div class="notice-detail">
    <div class="notice-header">
    </div>
      <div class="notice-contents">
        <div class="notice-title">
          <h3>{{ noticetitle }}</h3>
          <hr>
          <div class="notice-meta">
          <div>
          <label>작성자</label>
          <span class="notice-author">관리자</span>
          </div>
          <div>
          <label>등록일자</label>
          <span class="notice-date">{{ noticedate }}</span>
          </div>
          </div>
          <hr>
          <div class="notice-file">
            <label>파일</label>
            <span class="notice-file">{{ noticefile }}</span>
          </div>
        </div>
        <hr>
        <div class="notice-body">
          <div class="notice-image">
            <img src="" width="50%">{{ noticeimg }}
          </div>
          <br>
          <div class="ck-editor">
            <ck-editor v-model="editorContent" :editor="editor" :config="editorConfig" @ready="configureEditor" disabled />
          </div>
        </div>
      </div>
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnDelete">삭제</button>
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnList">목록</button>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default defineComponent({
  components: { 'ck-editor': CKEditor.component },
  data() { //변수생성
  return {
    requestBody: this.$route.query,
    noticeno: this.$route.query.noticeno,
      noticetitle: '',
      editorContent: '',
      noticefile: '',
      noticeimg: '',
      noticedate: '',
      editor: ClassicEditor, 
    editorConfig: {
          
    toolbar: [
        ],
    table: {
      contentToolbar: [
          ],
        },
      },
    };
  },
  mounted() {
  this.fnGetView()
  },
  methods: {
  fnGetView() {
    this.$axios.get(this.$serverUrl + '/notice/' + this.noticeno, {
    params: this.requestBody
  }).then((res) => {
    this.noticetitle = res.data.noticetitle
    this.editorContent = res.data.noticecontent
    this.noticefile = res.data.noticefile
    this.noticeimg = res.data.noticeimg
    this.noticedate = res.data.noticedate
  }).catch((err) => {
  if (err.message.indexOf('Network Error') > -1) {
    alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
  }
  })
  },
  fnList() {
    delete this.requestBody.noticeno
    this.$router.push({
    path: './list',
    query: this.requestBody
  })
  },
  fnUpdate() {
    this.$router.push({
    path: './write',
    query: this.requestBody
  })
  },
  fnDelete() {
  if (!confirm("삭제하시겠습니까?")) return
    this.$axios.delete(this.$serverUrl + '/notice/' + this.noticeno, {})
        .then(() => {
          alert('삭제되었습니다.')
          this.fnList();
        }).catch((err) => {
      console.log(err);
    })
  }
}
});
</script>

<style scoped>
.notice-detail {
  margin: 50px auto;
  max-width: 800px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
}

.notice-header {
  margin-bottom: 30px;
}

.notice-title {
  margin-bottom: 20px;
}

.notice-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.notice-meta label {
    border-right: 1px solid #ddd;
  font-weight: bold;
  margin-right: 10px;
  padding-right: 10px;
}
.notice-file label {
       border-right: 1px solid #ddd;
  font-weight: bold;
  margin-right: 10px;
  padding-right: 10px;
}

.notice-meta strong {
  font-weight: bold;
  margin-right: 10px;
}

.notice-meta span {
  margin-right: 10px;
}

.notice-body {
  margin-top: 30px;
}

.notice-image img {
  max-width: 100%;
  margin-bottom: 20px;
}

.common-buttons {
  margin-top: 50px;
  text-align: center;
}

.w3-button {
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  margin-right: 10px;
}

.w3-blue-gray {
  background-color: #607d8b;
  color: #fff;
}

.w3-red {
  background-color: #f44336;
  color: #fff;
}

.w3-gray {
  background-color: #ccc;
  color: #fff;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
}

</style>