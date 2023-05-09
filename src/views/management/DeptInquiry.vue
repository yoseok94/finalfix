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
        <br>
        <table class="w3-table-all">
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
        </table>
        <div class="pagination">
        <a href="#" class="page active">1</a>
        <a href="#" class="page">2</a>
        <a href="#" class="page">3</a>
        <a href="#" class="page">4</a>
        <a href="#" class="page">5</a>
        <a href="#" class="page">></a>
        </div>
    </div>
</template>



<style scoped>
.main {
    overflow: auto;
}
.top {
    display: flex;
    justify-content: flex-end;
}

.theadline {
    background-color: rgb(203, 201, 201);
}

a {
    text-decoration: none;
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
</style>