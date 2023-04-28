<template>
    <div class="main">
        <div class="top">
            <!-- <select class="lineup">
                <option value="positionall">전체직급</option>
                <option value="executive">임원</option>
                <option value="employee">사원</option>
            </select> -->
            <router-link to="/management/myapp"><button class="lineup">내 신청내역</button></router-link>
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
                    <th>신청내역조회</th>
                    <th>소속부서</th>
                    <th>=></th>
                    <th>희망부서</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="tbodyline">
                <tr>
                    <td>부서1</td>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td><router-link to="/management/appdetail"><button>신청내역조회</button></router-link></td>
                    <td>부서1</td>
                    <td>=></td>
                    <td>부서2</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
                    <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s02</td>
                    <td>최강대</td>
                    <td>임원</td>
                    <td><button>신청내역조회</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td>부서3</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
                    <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s03</td>
                    <td>서홍대</td>
                    <td>사원</td>
                    <td><button>신청내역조회</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td>부서3</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
            <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s04</td>
                    <td>박수원</td>
                    <td>사원</td>
                    <td><button>신청내역조회</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td>부서4</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
            <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s05</td>
                    <td>염용산</td>
                    <td>사원</td>
                    <td><button>신청내역조회</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td>부서1</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
            <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                <tr>
                    <td>부서3</td>
                    <td>s06</td>
                    <td>한이대</td>
                    <td>임원</td>
                    <td><button>신청내역조회</button></td>
                    <td>부서3</td>
                    <td>=></td>
                    <td>부서2</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
            <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                    <!-- <tr>
                    <td><br></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            <td></td>
                </tr> -->
                <tr>
                    <td>부서4</td>
                    <td>s07</td>
                    <td>변아현</td>
                    <td>임원</td>
                    <td><button>신청내역조회</button></td>
                    <td>부서4</td>
                    <td>=></td>
                    <td>부서1</td>
                    <!-- <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td> -->
            <td><button>승인</button>&nbsp;<button>거부</button></td>
                </tr>
                <!-- <tr>
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
                </tr> -->
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
  top: 0; left: 700px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
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