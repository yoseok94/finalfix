<template>
  <div class="main">
    <!--본인이동세부내역을 본인이 확인.-->
    <h2 align="center">이동내역조회</h2>

      <!-- 본인 이동 신청 내용 -->
      <table class="w3-table-all">
          <thead class="theadline">
              <tr>
                  <th>ID</th>
                  <th>성명</th>
                  <th>직급</th>
                  <th>입사일</th>
                  <th>현부서</th>
                  <td>=></td>
                  <th>희망부서</th>
                  <th>현황</th>
              </tr>
          </thead>
          <tbody class="tbodyline">
              <tr>   
                  <td>{{ appid }}</td>
                  <td>{{ appname }}</td>
                  <td>{{ applevel }}</td>
                  <td>{{ apphiredate }}</td>
                  <td>{{ appdeptname }}</td>
                  <td>=></td>
                  <td>{{ appchange }}</td>
                  <td>{{ appaccept }}</td>
              </tr>
          </tbody>
      </table>
      <span>부서이동 사유</span><br>
          <div class="textbox">
          {{ appreason }}
          </div>
      <span class="buttonbro">
              <router-link to="/management/movinghistory"><button>닫기</button></router-link>
      </span>
  </div>
</template>

<script>
export default {
    data() { //변수생성
    return {
            requestBody: this.$route.query, //query를 보내왔으니까 지금 이 페이지는 qeury를 가지고 있는 상태가 된다
            appno: this.$route.query.appno,
            appid: '',
            appname: '',
            applevel: '',
            apphiredate: '',
            appdeptname: '',
            appchange: '',
            appreason: '',
            appaccept: '',
        }
    },

    mounted() {
        this.fnGetView()
    },

    methods: {
    fnGetView() {
        this.$axios.get(this.$serverUrl + '/management/applist' + this.appno, {
            params: this.requestBody
        }).then((res) => {
            this.appid = res.data.appid
            this.appname = res.data.appname
            this.appphone = res.data.appphone
            this.appaddress = res.data.appaddress
            this.appemail = res.data.appemail
            this.appbirth = res.data.appbirth
            this.apphiredate = res.data.apphiredate
            this.appdeptname = res.data.appdeptname
            this.applevel = res.data.applevel
            this.appreason = res.data.appreason
            this.appchange = res.data.appchange
            this.appaccept = res.data.appaccept
        }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
        alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
        })
        },
    }
}
</script>

<style scoped>
.main {
overflow: auto;
}
.buttonbro {
display: flex;
justify-content: flex-end;
}
.textbox{
border: 1.3px solid black;
margin: 3px;
resize: none;
outline: none;
background-color: #f5f5f5;
width: 99%;
height: 300px;
position: relative;
}
</style>