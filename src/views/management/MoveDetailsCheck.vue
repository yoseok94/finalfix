<template>

    <div class="main">
        <table class="w3-table-all">
            <thead class="theadline">
                <tr>
                    <th>ID</th>
                    <th>성명</th>
                    <th>직급</th>
                    <th>입사일</th>
                    <th>현부서</th>
                    <th></th>
                    <th>희망부서</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="tbodyline">
                <tr>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td>2004.06.04</td>
                    <td>부서2</td>
                    <td>=></td>
                    <td>부서3</td>
                </tr>
            </tbody>
        </table>
        <tr>
    <span>부서이동 사유</span><br></tr>
        <textarea class="textbox" readonly>업무가 너무 쉽고, 부서의 분위기가 너무 가볍습니다.</textarea><br>
        <span class="buttonbro">
            <button class="w3-button w3-round w3-blue-gray">닫기</button>
        </span>
    </div>
</template>



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