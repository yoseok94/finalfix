<template>

<div class="notice-detail">
    <h3>공지글 등록</h3>
    <hr>
<!-- <div class="common-buttons">
<button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button> &nbsp;
<button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
</div> -->
<div class="notice_title">
<input type="text" v-model="notice_title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
<hr>
<label for="notice_author">작성자</label>
<input type="text" v-model="notice_author" class="w3-input w3-border" placeholder="작성자를 입력해주세요." v-if="idx === undefined">
<label for="created_at">등록일</label>
<input type="date" v-model="created_at" class="w3-input w3-border" placeholder="등록일자">
<hr>
<label for="ntorigin_file">파일</label>
<input type="file" ref="fileInput" @change="handleFileUpload()" accept="image/*" id="ntorigin_file" class="w3-input w3-border">
<hr>
<label for="ntorigin_img">이미지 파일</label>
<input type="file" ref="fileInput" @change="handleFileUpload()" accept="image/*" id="ntorigin_img" class="w3-input w3-border">


</div>
<label for="notice_contents">내용 &nbsp;</label>
<div class="editor">
 <ck-editor v-model="editorContent" :editor="editor" :config="editorConfig"  />
</div>

<div class="common-buttons">
<button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">등록</button> &nbsp;
<button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
</div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default defineComponent({
  components: { 'ck-editor': CKEditor.component },
  data() {
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,
      title: '',
      author: '',
      contents: '',
      created_at: '',
      editorContent: "",
      editor: ClassicEditor, 
    editorConfig: {
      
  toolbar: [
          'heading',
          '|',
          'fontBackgroundColor',
          'fontColor',
          'fontSize',
          'bold',
          'italic',
          '|',
          'alignment',
          'bulletedList',
          'numberedList',
          'indent',
          'outdent',
          '|',
          'imageUpload',
          'insertTable',
          'link',
          '|',
          'undo',
          'redo',
        ],
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
        image: {
          resize: true,
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignRight',
            'imageStyle:inline',
            'imageStyle:side',
          ],
        },
      },
    };
  },
  methods: {
fnGetView() {
if (this.idx !== undefined) {
this.$axios.get(this.$serverUrl + '/notice/' + this.idx, {
params: this.requestBody
}).then((res) => {
this.title = res.data.title
this.author = res.data.author
this.contents = res.data.contents
this.created_at = res.data.created_at
}).catch((err) => {
console.log(err)
})
}
},
fnList() {
delete this.requestBody.idx
this.$router.push({
path: './list',
query: this.requestBody
})
},
fnView(idx) {
this.requestBody.idx = idx
this.$router.push({
path: './detail',
query: this.requestBody
})
},
    fnSave() {
let apiUrl = this.$serverUrl + '/notice'
this.form = {
"idx": this.idx,
"title": this.title,
"contents": this.contents,
"author": this.author
}

  if (this.idx === undefined) {
    //INSERT
    this.$axios.post(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.idx)
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
      }
    })
  } else {
    //UPDATE
    this.$axios.patch(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.idx)
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
      }
    })
  }
},
    // ...기타 필요한 애플리케이션 관련 메소드 추가
  },
  mounted() {
    this.fnGetView();
  },
});
</script>
<style scoped>
.notice-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.notice-detail {
  margin: 50px auto;
  max-width: 800px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
}


.common-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.common-buttons button {
  margin: 0 5px;
}




</style>



