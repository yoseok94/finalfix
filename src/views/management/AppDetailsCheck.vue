       <template>
        <div class="main">
          <!--[관리자, 임원]에게 온 신청리스트의 내역을 조회하는 페이지입니다. 승인, 반려 가능-->
          <h2 align="center">신청내역조회</h2>
    
            <!-- 내용 -->
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
                    <router-link to="/management/deptapplist"><button>승인</button></router-link>
                    <!-- 반려시 해당 인원의 현황appaccept을 2(반려)로 변경 -->
                    <router-link to="/management/deptapplist"><button>반려</button></router-link>
                    <router-link to="/management/deptapplist"><button>닫기</button></router-link>
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
.top {
    display: flex;
    justify-content: flex-end;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.page.active,
.page:hover {
  background-color: #0077cc;
  color: #fff;
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