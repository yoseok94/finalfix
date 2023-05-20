<template>
  <div class="event-detail">
    <div class="event-header">
    </div>
    <div class="event-contents">
      <div class="event-title">
        <h3>{{ eventtitle }}</h3>
        <hr>
        <div class="event-meta">
          <div>
            <label>작성자</label>
            <span class="event-author">관리자</span>
          </div>
          <div>
            <label>등록일자</label>
            <span class="event-date">{{ eventdate }}</span>
          </div>
        </div>
        <hr>
        <div class="event-file">
          <label>파일</label>
          <span class="event-file">{{ eventfile }}</span>
        </div>
      </div>
      <hr>
      <div class="event-body">
        <div class="event-image">
         <!-- <img src="https://jpassets.jobplanet.co.kr/production/uploads/company_story/thumbnail/3361/w750_workshop.jpg" alt="이미지"> -->
         <img src="" width="50%"> {{ eventimg }}
        </div>
        <br>
        <p>여기는 내용이 작성되는 공간입니다.<br>
        이 부분에는 제목에 대한 내용이 작성됩니다.</p>
        <br>
        <span class="event-content">{{ eventcontents }}</span>
        {{ eventcontents }}

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
export default {
data() { //변수생성
return {
requestBody: this.$route.query,
eventno: this.$route.query.eventno,
  eventtitle: '',
  eventcontents: '',
  eventfile: '',
  eventimg: '',
  eventdate: ''
}

},
mounted() {
this.fnGetView()
},
methods: {
fnGetView() {
this.$axios.get(this.$serverUrl + '/event/' + this.eventno, {
params: this.requestBody
}).then((res) => {
this.eventtitle = res.data.eventtitle
this.eventcontents = res.data.eventcontents
this.eventfile = res.data.eventfile
this.eventimg = res.data.eventimg
this.eventdate = res.data.eventdate
}).catch((err) => {
if (err.message.indexOf('Network Error') > -1) {
alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
}
})
},
fnList() {
delete this.requestBody.eventno
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

  this.$axios.delete(this.$serverUrl + '/event/' + this.eventno, {})
      .then(() => {
        alert('삭제되었습니다.')
        this.fnList();
      }).catch((err) => {
    console.log(err);
  })
}

}
}
</script>
<style scoped>
.event-detail {
  margin: 50px auto;
  max-width: 800px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
}

.event-header {
  margin-bottom: 30px;
}

.event-title {
  margin-bottom: 20px;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.event-meta label {
    border-right: 1px solid #ddd;
  font-weight: bold;
  margin-right: 10px;
  padding-right: 10px;
}
.event-file label {
       border-right: 1px solid #ddd;
  font-weight: bold;
  margin-right: 10px;
  padding-right: 10px;
}

.event-meta strong {
  font-weight: bold;
  margin-right: 10px;
}

.event-meta span {
  margin-right: 10px;
}

.event-body {
  margin-top: 30px;
}

.event-image img {
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