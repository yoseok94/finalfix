<template>
    <!-- 담당 부서 이동 페이지의 개인 상세 정보  -->
    <div class="main">
        <h2 align="center">개인 상세 정보</h2>
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col-auto d-none d-lg-block">
                <img class="bd-placeholder-img" width="200" height="250" src="@/assets/images/noneprofile.jpg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
            </div>
            <div class="col p-4 d-flex flex-column position-static">
            
                    <strong class="d-inline-block mb-2 text-success"><font style="vertical-align: inherit;">My Profile</font></strong>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">ID : {{ empId }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">Name : {{ empname }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">연락처 : {{ empphone }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">주소 : {{ empaddress }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">E-mail : {{ empemail }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">출생년도 : {{ empbirth }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">입사일자 : {{ emphiredate }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">현부서 : {{ deptname }}</font></h4><br>
                    <h4 class="mb-2"><font style="vertical-align: inherit;">직급 : {{ emplevel }}</font></h4><br>
                 
            </div>
            <router-link to="/management/deptmove"><button>닫기</button></router-link>
        </div>
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
            empaddress: '',
            empemail: '',
            empbirth: '',
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
            this.empId = res.data.empId
            this.empname = res.data.empname
            this.empphone = res.data.empphone
            this.empaddress = res.data.empaddress
            this.empemail = res.data.empemail
            this.empbirth = res.data.empbirth
            this.emphiredate = res.data.emphiredate
            this.deptname = res.data.deptname
            this.emplevel = res.data.emplevel
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
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    overflow: auto;
}

.image {
    border: solid black 2px;
    border-radius: 15px;
    width: 200px;
    height: 200px;
}
</style>