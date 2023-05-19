<template>
  <!-- [임원, 사원] 본인의 이동신청사유를 본인이 작성 -->
  <div class="main">
    <h2 align="center">신청사유 작성</h2>
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
                <!-- emp값들을 그대로 app값으로 create -->
                  <!-- <td><input type="text" v-model="empid" value="{{ empid }}"/></td> -->
                  <td>{{ appid }}</td>
                    <td>{{ appname }}</td>
                    <td>{{ applevel }}</td>
                    <td>{{ emphiredate }}</td>
                    <td>{{ appdeptname }}</td>
                  <!-- <td><input type="text" v-model="deptname" value="{{ deptname }}"/></td> -->
                  <td>=></td>
                  
              <!-- 모든 부서가 나와야하며 선택한 부서값 전달 -->
              <td>
                  <!-- <select>
                    <option v-for="(row, empno) in list" :key="empno">{{ deptname }}</option>
                  </select> -->
                  <!-- empno 의 deptname을 중복 없이 가져온다 -->
                  <select>
                    <option v-for="(row, empno) in list" :key="empno">
                    {{ row.deptname }}
                    </option>
                  </select>
                  <select v-model="department">
                    <option v-for="department in departments" :key="department" :value="department">
                      {{ department }}
                    </option>
                  </select>
                  <!-- 선택한 deptname을 app테이블의 appdept값으로 -->
              </td>
              </tr>
          </tbody>
      </table>
      <tr>
  <span>부서이동 사유</span><br></tr>
      <textarea class="textbox" v-model="appreason"></textarea><br>
      <span class="buttonbro">
          <!-- <router-link to="/management/movinghistory"><button>등록하기</button></router-link> -->
          <button type="button" v-on:click="fnSave">저장</button>&nbsp;
          <router-link to="/management/movinghistory"><button>닫기</button></router-link>
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
emphiredate: '',
deptname: '',
emplevel: '',
}

},
mounted() {
this.fnGetView()
},
methods: {
          fnGetView() {
          this.$axios.get(this.$serverUrl + '/management/emplist' + this.empno, {
          params: this.requestBody
          }).then((res) => {
          this.appid = res.data.empId
          this.appname = res.data.empname
          this.appdeptname = res.data.deptname
          this.applevel = res.data.emplevel
          this.emphiredate = res.data.emphiredate

          }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
          })
          },


          fnView(appno) {
      this.requestBody.appno = appno
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
fnSave() {
      let apiUrl = this.$serverUrl + '/management'
      this.form = {
        "appid": this.appid,
        "appname": this.appname,
        "appdepname": this.appdeptname,
        "applevel": this.applevel,
        "apphiredate": this.apphiredate,
      }

      if (this.appno === undefined) {
        //INSERT
        this.$axios.post(apiUrl, this.form)
        .then((res) => {
          alert('글이 저장되었습니다.')
          this.fnView(res.data.appno)
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.patch(apiUrl, this.form)
        .then((res) => {
          alert('글이 저장되었습니다.')
          this.fnView(res.data.appno)
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
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