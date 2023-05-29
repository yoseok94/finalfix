<template>
  <!-- [관리자, 임원] 상급자가 해당 인원의 강제 이동 사유를 작성.-->
  <div class="main">
      <h2 align="center">이동사유 작성</h2>
      <table class="w3-table-all">
          <thead class="theadline">
              <tr>
                  <th>ID</th>
                  <th>성명</th>
                  <th>직급</th>
                  <th>입사일</th>
                  <th>현부서</th>
                  <th></th>
                  <th>이동부서</th>
                  <th></th>
              </tr>
          </thead>
          <tbody class="tbodyline">
              <tr>
                  <td>{{ appid }}</td>
                  <td>{{ appname }}</td>
                  <td>{{ applevel }}</td>
                  <td>{{ emphiredate }}</td>
                  <td>{{ appdeptname }}</td>
                  <td>=></td>
              <td>
                  <select v-model="appchange">
                    <option v-for="(row, deptno) in list" :key="deptno">{{ row.deptname }}</option>
                  </select>
              </td>
              </tr>
          </tbody>
      </table>
      <tr>
  <span>부서이동 사유</span><br></tr>
      <input class="textbox" v-model="appreason"/><br>
      <span class="buttonbro">
          <button type="button" v-on:click="fnSave()">저장</button>&nbsp;
          <router-link to="/management/deptmove"><button>닫기</button></router-link>
      </span>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query, //query를 보내왔으니까 지금 이 페이지는 qeury를 가지고 있는 상태가 된다
      empno: this.$route.query.empno,
      empId: '',
      empname: '',
      empphone: '',
      empmail: '',
      empbirth: '',
      emphiredate: '',
      emplevel: '',
      empstatus: '',
      appId: '',
      appname: '',
      appphone: '',
      appmail: '',
      appbirth: '',
      apphiredate: '',
      applevel: '',
      appstatus: '',
      deptname: '',
      appdeptname: '',
      appaccept: '',
      appreason: '',
      appchange: '',
      appdate: '',
      list: {},
    }
  },

  mounted() {
    this.fnGetView(),
    this.fnGetDept()
  },

  methods: {
    fnGetView() {
      this.$axios.get(this.$serverUrl + '/management/emplist' + this.empno, {
        params: this.requestBody
      }).then((res) => {
        this.empno = res.data.empno
        this.appid = res.data.empId
        this.appname = res.data.empname
        this.appphone = res.data.empphone
        this.appemail = res.data.empemail
        this.appbirth = res.data.empbirth
        this.emphiredate = res.data.emphiredate
        this.applevel = res.data.emplevel
        this.appstatus = res.data.empstatus
        this.appdeptname = res.data.deptname
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          
        }
      })
    },
    fnGetDept() {
        //스프링부트에서 전송받은 데이터 출력처리
      this.requestBody = { // 데이터 전송
        appchange: this.appchange
      }
      this.$axios.get(this.$serverUrl + "/dept/list", {
        params: this.requestBody,
        headers: {}
      }).then((res) => {        
        if (res.data.resultCode === "OK") {
          this.list = res.data.data
        }
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnmemberup(){
      
      let apiUrl = this.$serverUrl + '/management/hrmup'
      this.form = {
        "empno": this.$route.query.empno,
        "deptname": this.appchange
      },
      this.$axios.patch(apiUrl, this.form)
        .then(() => {
          alert('글이 저장되었습니다.')
        this.fnView();
        }).catch((err) => {
          console.log(this.empno)
          console.log(err)
        });
    },
    fnView() {
      this.$router.push({
        path: '/management/deptmove',
      })
    },

    fnSave() {
      let apiUrl = this.$serverUrl + '/management/yesmove'
      this.form = {
          "appno": this.appno,
          "empno": this.$route.query.empno,
          "appid": this.appid,
          "appname": this.appname,
          "appphone": this.appphone,
          "appemail": this.appemail,
          "appbirth": this.appbirth,
          "appdeptname": this.appdeptname,
          "applevel": this.applevel,
          "appstatus": this.appstatus,
          "apphiredate": this.emphiredate,
          "appchange": this.appchange,
          "appreason": this.appreason,
          "appaccept": this.appaccept,
        }
        if (this.appno === undefined) {
        //INSERT
        this.$axios.post(apiUrl, this.form)
        .then(() => {
          console.log(this.empno);
          this.fnmemberup();
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.patch(apiUrl, this.form)
        .then(() => {
          console.log(this.empno);
          this.fnmemberup();
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('존재하지 않는 상품코드입니다.')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.main {
  font-size: 20px;
  overflow: auto;
}

span {
  font-weight: bold;
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

.theadline {
  background-color: rgb(203, 201, 201);
}

</style>