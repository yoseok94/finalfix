<template>
    <div class="main">
        <div class="top">
            <form class="search">
                <select>
                    <option value="all">전체</option>
                    <option value="departmentname">부서명</option>
                    <option value="ID">ID</option>
                    <option value="name">이름</option>
                    <option value="position">직급</option>
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
                    <th>작성일자</th>
                    <th>=></th>
                    <th>희망부서</th>
                    <th></th>
                    <th>현황</th>
                </tr>
            </thead>
            <tbody class="tbodyline">
                <tr>
                    <td>부서1</td>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td></td>
                    <td>=></td>
                    <td>부서2</td>
                    <td><button>내역조회</button></td>
                    <td><button>거부</button></td>
                </tr>
                <tr>
                    <td>부서1</td>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td></td>
                    <td>=></td>
                    <td>부서3</td>
                    <td><button>내역조회</button></td>
                    <td><button>검토중</button></td>
                </tr>
                <!-- <tr>
                    <td>부서2</td>
                    <td>s02</td>
                    <td>최강대</td>
                    <td>임원</td>
                    <td><button>신청내역조회</button></td>
                    <td>소속부서</td>
                    <td>=></td>
                    <td>부서3</td>
                    <td><button>승인</button>&nbsp;<button>가결</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s03</td>
                    <td>서홍대</td>
                    <td>사원</td>
                    <td><button>신청내역조회</button></td>
                    <td>소속부서</td>
                    <td>=></td>
                    <td>부서3</td>
            <td><button>승인</button>&nbsp;<button>가결</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s04</td>
                    <td>박수원</td>
                    <td>사원</td>
                    <td><button>신청내역조회</button></td>
                    <td>소속부서</td>
                    <td>=></td>
                    <td>부서4</td>
            <td><button>승인</button>&nbsp;<button>가결</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s05</td>
                    <td>염용산</td>
                    <td>사원</td>
                    <td><button>신청내역조회</button></td>
                    <td>소속부서</td>
                    <td>=></td>
                    <td>부서3</td>
            <td><button>승인</button>&nbsp;<button>가결</button></td>
                </tr>
                <tr>
                    <td>부서3</td>
                    <td>s06</td>
                    <td>한이대</td>
                    <td>임원</td>
                    <td><button>신청내역조회</button></td>
                    <td>소속부서</td>
                    <td>=></td>
                    <td>부서1</td>
            <td><button>승인</button>&nbsp;<button>가결</button></td>
                </tr>
                <tr>
                    <td>부서4</td>
                    <td>s07</td>
                    <td>변아현</td>
                    <td>임원</td>
                    <td><button>신청내역조회</button></td>
                    <td>소속부서</td>
                    <td>=></td>
                    <td>부서4</td>
            <td><button>승인</button>&nbsp;<button>가결</button></td>
                </tr> -->
                <tr>
                    <td><br></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            <td></td>
                </tr>
                <tr>
                    <td><br></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            <td></td>
                </tr>
                <tr>
                    <td><br></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            <td></td>
                </tr>
                <tr>
                    <td><br></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            <td></td>
                </tr>
                <tr>
                    <td><br></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            <td></td>
                </tr>
            </tbody>
            <!-- <tfoot>
                <tr>
                    <td>1 2 3</td>
                </tr>
            </tfoot> -->
        </table>
        <span class="buttonbro">
            <button>신청하기</button>
        </span>
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
  top: 0; left: 8.5%;
}

.search {
    position: absolute;
  top: 0; right: 57%;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
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

.buttonbro {
    position: absolute;
    left: 34%
}
</style>