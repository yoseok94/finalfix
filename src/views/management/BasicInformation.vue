<template>
    <div class="main">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col-auto d-none d-lg-block">
            <img class="bd-placeholder-img" width="200" height="250" src="@/assets/images/noneprofile.jpg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
            </div>
            <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-success"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">My Profile</font></font></strong>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ID : s01</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Name : 김신촌</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">연락처 : 010-1111-2222</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">주소 : 서울 마포구 백범로 8</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">E-mail : user01@ict.com</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">출생년도 : 1985.09.04</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">입사일자 : 2004.06.04</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">현부서 : 2004.06.04</font></font></h4><br>
            <h4 class="mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">직급 : 사원</font></font></h4><br>

            </div>
        </div>
    </div>
</template>

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
.tableline {
    display: table-cell;
}

.theadline {
    background-color: rgb(203, 201, 201);
}

th {
    border-bottom: solid black 2px;
    padding: 0px;
}

td {
    border-bottom: solid black 2px;
    padding: 17px;
}
</style>