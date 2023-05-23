<template>
  <div class="notice-detail">
    <h3>공지글 등록</h3>
    <hr>
    <div class="noticetitle">
      <label for="noticetitle"></label>
        <input type="text" v-model="noticetitle" class="w3-input w3-border" id="noticetitle" placeholder="제목을 입력해주세요.">
        <hr>
      <label>작성자</label>
        <input type="text" class="w3-input w3-border" placeholder="관리자" readonly>
      <label for="noticedate">등록일</label>
        <input type="date" v-model="noticedate" class="w3-input w3-border" placeholder="등록일자" readonly>
        <hr>
      <label for="noticefile">파일</label>
        <input type="file" id="noticefile" @change="importExcel" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <hr>
      <label for="noticeimg">이미지 파일</label>
        <input type="file" ref="fileInput" @change="handleFileUpload()" accept="image/*" id="noticeimg" class="w3-input w3-border">
    </div>
      <label for="noticecontent">내용 &nbsp;</label>
    <div class="ck-editor">
      <ck-editor v-model="editorContent" :editor="editor" :config="editorConfig" @ready="configureEditor" />
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
      noticeno: this.$route.query.noticeno,
      noticetitle: '',
      editorContent: '',
      noticefile: '',
      noticeimg: '',
      noticedate: '',
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
            'linkImage',
            'image',
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
  mounted(){
    this.fnGetView();
  },
  methods: {
fnGetView() {
if (this.noticeno !== undefined) {
this.$axios.get(this.$serverUrl + '/notice/' + this.noticeno, {
params: this.requestBody
}).then((res) => {
this.noticetitle = res.data.noticetitle
this.editorContent = res.data.noticecontent
this.noticefile = res.data.noticefile
this.noticeimg = res.data.noticeimg
this.noticedate = res.data.noticedate
}).catch((err) => {
console.log(err)
})
}
},
fnList() {
delete this.requestBody.noticeno
this.$router.push({
path: './list',
query: this.requestBody
})
},
fnView(noticeno) {
this.requestBody.noticeno = noticeno
this.$router.push({
path: './detail',
query: this.requestBody
})
},
    fnSave() {
let apiUrl = this.$serverUrl + '/notice'
this.form = {
  "noticeno": this.noticeno,
  "noticetitle": this.noticetitle,
  "noticecontent": this.editorContent,
  "noticefile": this.noticefile, 
  "noticeimg": this.noticeimg,
}
  if (this.noticeno === undefined) {
    //INSERT
    this.$axios.post(apiUrl, this.form)
    .then((res) => {
      alert('글이 저장되었습니다.')
      this.fnView(res.data.noticeno)
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
      this.fnView(res.data.noticeno)
    }).catch((err) => {
      if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
      }
    })
  }
},
}
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



