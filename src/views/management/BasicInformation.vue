<template>
    <div class="main">
        <table class="tableline">
            <thead class="theadline">
                <tr>
                    <th>ID</th>
                    <th>성명</th>
                    <th>연락처</th>
                    <th>주소</th>
                    <th>E-mail</th>
                    <th>출생년도</th>
                    <th>입사일자</th>
                    <th>부서발령일자</th>
                    <th>현부서</th>
                    <th>직급</th>
                    <th>기타</th>
                    <div class="image"><img src="" alt="Image"></div><hr>
                </tr>
            </thead>
            <tbody class="tbodyline">
                <tr>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>010-1111-2222</td>
                    <td>서울 마포구 백범로 8</td>
                    <td>user01@ict.com</td>
                    <td>1985.09.04</td>
                    <td>2004.06.04</td>
                    <td>2014.07.09</td>
                    <td>부서1</td>
                    <td>사원</td>
                    <td>2022년 최고의 사원</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.main {
    float: center;
    justify-content: center;
    align-items:center;
    min-height: 100vh;
    font-size: 20px;
    margin: 0;
    padding: 0;
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