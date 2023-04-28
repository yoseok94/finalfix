<template>
    <div class="main">
        <div class="top">
            <select class="lineup">
                <option value="departmentall">전체부서</option>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select>
            <form class="search">
                <select>
                    <option value="all">전체</option>
                    <option value="departmentname">부서명</option>
                    <option value="ID">ID</option>
                    <option value="name">이름</option>
                    <option value="position">직급</option>
                    <option value="hiredate">입사일자</option>
                    <option value="phonenumber">연락처</option>
                    <option value="email">E-mail</option>
                </select>
                <input type="text" maxlength = 20 value="" autocomplete="off">
                <button>
                    <i>검색</i>
                </button>
            </form>
        </div>

        <table class="tableline">
            <thead class="theadline">
                <tr>
                    <th>부서명</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>직급</th>
                    <th>입사일자</th>
                    <th>연락처</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody class="tbodyline">
                <tr>
                    <td>부서1</td>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td>2004.06.04</td>
                    <td>010-1111-2222</td>
                    <td>user02@ict.com</td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s02</td>
                    <td>최강대</td>
                    <td>임원</td>
                    <td>2015.12.22</td>
                    <td>010-2222-3333</td>
                    <td>user03@ict.com</td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s03</td>
                    <td>서홍대</td>
                    <td>사원</td>
                    <td>2019.06.14</td>
                    <td>010-3333-4444</td>
                    <td>user04@ict.com</td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s04</td>
                    <td>박수원</td>
                    <td>사원</td>
                    <td>2022.08.07</td>
                    <td>010-4444-5555</td>
                    <td>user05@ict.com</td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s05</td>
                    <td>염용산</td>
                    <td>사원</td>
                    <td>2023.01.18</td>
                    <td>010-5555-6666</td>
                    <td>user06@ict.com</td>
                </tr>
                <tr>
                    <td>부서3</td>
                    <td>s06</td>
                    <td>한이대</td>
                    <td>임원</td>
                    <td>2008.04.09</td>
                    <td>010-6666-7777</td>
                    <td>user07@ict.com</td>
                </tr>
                <tr>
                    <td>부서4</td>
                    <td>s07</td>
                    <td>변아현</td>
                    <td>임원</td>
                    <td>2006.07.26</td>
                    <td>010-7777-8888</td>
                    <td>user08@ict.com</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>1 2 3</td>
                </tr>
            </tfoot>
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
.top {
    display: table;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-style: normal;
    zoom: 1;
    height: 46px;
    width: 364px;
}

.lineup {
    position: absolute;
  top: 0; left: 215px;
}

.search {
    position: absolute;
  top: 0; left: 610px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
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