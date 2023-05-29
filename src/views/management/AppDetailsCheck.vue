       <template>
        <div class="main">
          <!--[관리자, 임원]이 특정 멤버의 신청리스트 상세내역을 조회하는 페이지입니다. 승인, 반려 가능-->
          <h2 align="center">신청내역조회</h2>
    
            <!-- 특정 멤버의 신청내용입니다. -->
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
                    </tr>
                </tbody>
            </table>
            <span>부서이동 사유</span><br>
                <div class="textbox">
                {{ appreason }}
                </div>
            <span class="buttonbro">
                    <!-- 승인시 해당 인원의 deptname을 appdeptname으로 변경 및 현황appaccept을 1(승인)으로 변경 -->
                    <button type="button" v-on:click="fnSaveyes()">승인</button>
                    <!-- 반려시 해당 인원의 현황appaccept을 2(반려)로 변경 -->
                    <button type="button" v-on:click="fnSaveno()">반려</button>
                    <router-link to="/management/deptapplist"><button>닫기</button></router-link>
            </span>
        </div>
    </template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query, //query를 보내왔으니 지금 이 페이지는 qeury를 가지고 있는 상태
      appno: this.$route.query.appno,
      empno: '',
      appId: '',
      appname: '',
      appphone: '',
      appmail: '',
      appbirth: '',
      apphiredate: '',
      emphiredate: '',
      applevel: '',
      appstatus: '',
      deptname: '',
      appdeptname: '',
      appaccept: '',
      appreason: '',
      appchange: '',
      appdate: '',
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
        this.appno = res.data.appno
        this.empno = res.data.empno
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
        this.appstatus = res.data.appstatus
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnSaveyes() {
      let apiUrl = this.$serverUrl + '/management/yesmove'
      this.form = {
        "empno": this.empno,
        "appno": this.$route.query.appno,
        "appid": this.appid,
        "appname": this.appname,
        "appphone": this.appphone,
        "appemail": this.appemail,
        "appbirth": this.appbirth,
        "appdeptname": this.appdeptname,
        "applevel": this.applevel,
        "appstatus": this.appstatus,
        "apphiredate": this.apphiredate,
        "appchange": this.appchange,
        "appreason": this.appreason,
        "appaccept": this.appaccept,
      }
      if (this.appno === undefined) {
        //INSERT
        this.$axios.post(apiUrl, this.form)
        .then(() => {
          // alert('글이 저장되었습니다.')
          // .res(empno, deptname)
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
    },
    fnmemberup(){
      let apiUrl = this.$serverUrl + '/management/hrmup'
      this.form = {
        "empno": this.empno,
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
        path: '/management/deptapplist',
      })
    },
    fnSaveno() {
      let apiUrl = this.$serverUrl + '/management/nomove'
      this.form = {
        "empno": this.empno,
        "appno": this.$route.query.appno,
        "appid": this.appid,
        "appname": this.appname,
        "appphone": this.appphone,
        "appemail": this.appemail,
        "appbirth": this.appbirth,
        "appdeptname": this.appdeptname,
        "applevel": this.applevel,
        "appstatus": this.appstatus,
        "apphiredate": this.apphiredate,
        "appchange": this.appchange,
        "appreason": this.appreason,
        "appaccept": this.appaccept,
      }
      if (this.appno === undefined) {
        //INSERT
        this.$axios.post(apiUrl, this.form)
        .then(() => {
          console.log(this.appno);
          this.fnView();
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.patch(apiUrl, this.form)
        .then(() => {
          console.log(this.appno);
          this.fnView();
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('존재하지 않는 정보입니다.')
          }
        })
      }
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