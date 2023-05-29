<template>
    <br>
    <h1 style="text-align: center;">급여 명세서 작성</h1>
    <br>
    <table>
        <tr>
            <td>사원코드</td>
            <td><input class="table-input" type="text" v-model="empId" id="empId" /></td>
            <td>사원이름</td>
            <td><input class="table-input" type="text" v-model="empname" id="empname" /></td>
        </tr>
        <tr>
            <td>부서이름</td>
            <td><input class="table-input" type="text" v-model="deptname" id="deptname" /></td>
            <td>직급이름</td>
            <td><input class="table-input" type="text" v-model="emplevel" id="emplevel" /></td>
        </tr>
        <tr>
            <td>입사일자</td>
            <td><input class="table-input" type="text" v-model="emphiredate" id="emphiredate" /></td>
            <td>지급일자</td>
            <td><input class="table-input" type="text" v-model="paymentdate" id="paymentdate" /></td>
        </tr>
    </table>
    <br>
    <table>
        <tr>
            <td>총 근무시간 :</td>
            <td><input class="table-input" type="text" v-model="workhours" id="workhours" placeholder="근무시간을 입력해주세요" /></td>
            <td>초과근무시간:</td>
            <td><input class="table-input" type="text" v-model="overtimehours" id="overtimehours"
                    placeholder="초과근무시간을 입력해주세요" /></td>
            <div class="center"><button v-on:click="calculateSalary()">급여 계산하기</button></div>

        </tr>
    </table>
    <br>
    <table>
        <thead>
            <tr>
                <th>수당항목명</th>
                <th>계산식</th>
                <th>산출방법</th>
                <th>금액</th>

            </tr>
        </thead>
        <tbody>
            <tr>
                <td>기본급(고정)</td>
                <td>근무시간 * 기본급</td>
                <td>회사 내규를 확인해주세요.</td>
                <td><input class="table-input" type="text" v-model="basesalary" id="baseSalary"></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>초과근무수당</td>
                <td>근무시간 * 기본급의 150%</td>
                <td>회사 내규를 확인해주세요.</td>
                <td><input class="table-input" type="text" v-model="overtimesalary" id="overtimeSalary"></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>식대(고정)</td>
                <td>최대 200,000 원 지원</td>
                <td>회사 내규를 확인해주세요.</td>
                <td><input class="table-input" type="text" readonly>200,000</td>
            </tr>
        </tbody>
    </table>
    <br>
    <table>
        <tr>
            <td>지급총액 :</td>
            <td><input class="table-input" type="text" v-model="totalpaymentsalary" /></td>
        </tr>
    </table>

    <br>
    <div class="actions">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="submitForm">등록</button>
        <router-link to="/accounting/allowancesdeductions"><button
                class="w3-button w3-round w3-blue-gray">리스트확인</button></router-link>
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="goBack">이전페이지</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            empId: '',
            empname: '',
            deptname: '',
            emplevel: '',
            emphiredate: '',
            paymentdate: new Date().toISOString().slice(0, 10),
            workhours: '',
            overtimehours: '',
            basesalary: '',
            overtimesalary: '',
            totalpaymentsalary: '',
            requestBody: this.$route.query,
        };
    },
    created() {
        this.requestBody = this.$route.query;
        this.empId = this.requestBody.empId;
        this.payStubWriteGetView();
    },
    methods: {
        payStubWriteGetView() {
            console.log('empId : ' + this.empId);
            this.$axios.get(this.$serverUrl + '/accounting/employee/' + this.empId, {
                params: this.requestBody
            }).then((res) => {
                this.empId = res.data.empId;
                this.empname = res.data.empname;
                this.deptname = res.data.deptname;
                this.emplevel = res.data.emplevel;
                this.emphiredate = res.data.emphiredate;
            }).catch((err) => {
                if (err.response) {
                    alert(`Error: ${err.response.data.message}`);
                } else if (err.request) {
                    alert('서버에 문제가 발생하였습니다. 나중에 다시 시도해주세요.');
                }
            });
        },
        calculateSalary() {
            let salaryRate = 0;
            switch (this.emplevel) {
                case '사원':
                    salaryRate = 15000;
                    break;
                case '임원':
                    salaryRate = 35000;
                    break;
                case '관리자':
                    salaryRate = 60000;
                    break;
            }
            let basesalary = this.workhours * salaryRate;
            let overtimesalary = this.overtimehours * salaryRate * 1.5;
            let totalpaymentsalary = basesalary + overtimesalary + 200000;

            this.basesalary = basesalary.toLocaleString();
            this.overtimesalary = overtimesalary.toLocaleString();
            this.totalpaymentsalary = totalpaymentsalary.toLocaleString();

        },
        formatDate(dateString) {
            let date = new Date(dateString);
            return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        },
        submitForm() {
            this.calculateSalary();
            let salaryData = {
                empId: this.empId,
                empname: this.empname,
                deptname: this.deptname,
                emplevel: this.emplevel,
                emphiredate: this.emphiredate,
                paymentdate: this.paymentdate,
                workhours: this.workhours,
                overtimehours: this.overtimehours,
                basesalary: parseInt(this.basesalary.replace(/,/g, '')),
                overtimesalary: parseInt(this.overtimesalary.replace(/,/g, '')),
                totalpaymentsalary: parseInt(this.totalpaymentsalary.replace(/,/g, ''))
            };
            console.log(salaryData);
            this.$axios.post(`${this.$serverUrl}/accounting/salarywrite/`, salaryData)
                .then(() => {
                    this.$router.push('/accounting/management');
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(`Error: ${err.response.data.message}`);
                    } else if (err.request) {
                        console.log('서버에 문제가 발생하였습니다. 나중에 다시 시도해주세요.');
                    }
                });
        },

        goBack() {
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>
table {
    position: relative;
    width: 65%;
    left: 20%;
    border-collapse: collapse;
}

td,
th {
    border: 1px solid black;
    text-align: center;
    padding: 4px;
}

input.table-input {
    border: none;
    width: 100%;
    text-align: center;
    background-color: transparent;
    outline: none;
}

.actions button {
    margin-right: 1rem;
    position: relative;
    left: 20%;
}

.center {
    text-align: center;
    height: 33.5px;
}

.center button {
    border: 1px solid black;
    padding: 4px;
    height: 33.5px;
}</style>