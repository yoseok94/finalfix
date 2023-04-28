<template>
    <div class="main">
        <div class="top">
            <div>
                <div class="d-inline-flex align-items-center">
                    <div>
                    <!--카테고리-->
                    <select id="category" v-model="search_key">
                        <option value="">- 선택 -</option>
                        <option value="departmentname">부서명</option>
                        <option value="ID">ID</option>
                        <option value="name">이름</option>
                        <option value="position">직급</option>
                    </select>
                    </div>
                    <div>
                    <input type="text" id="category" v-model="search_value" @keyup.enter="fnPage()" placeholder="입력란">
                    </div>
                    <div>
                    <button type="button"  @click="fnPage()">조회</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <table class="w3-table-all">
            <thead class="theadline">
                <tr>
                    <th>부서명</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>직급</th>
                    <th>세부정보보기</th>
                    <th>부서명</th>
                    <th>=></th>
                    <th>이동부서</th>
                    <th>이동</th>
                </tr>
            </thead>
            <tbody class="tbodyline">
                <tr>
                    <td>부서1</td>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td><router-link to="/management/basicinfo"><button>세부정보보기</button></router-link></td>
                    <td>부서1</td>
                    <td>=></td>
                    <td>
                        <select>
                            <option value="department1">부서1</option>
                            <option value="department2">부서2</option>
                            <option value="department3">부서3</option>
                            <option value="department4">부서4</option>
                        </select>
                    </td>
                    <td><button>이동</button></td>
                </tr>
                <!-- <tr>
                    <td>부서1</td>
                    <td>s01</td>
                    <td>김신촌</td>
                    <td>사원</td>
                    <td><router-link to="/management/basicinfo"><button>세부정보보기</button></router-link></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr> -->
                <tr>
                    <td>부서2</td>
                    <td>s02</td>
                    <td>최강대</td>
                    <td>임원</td>
                    <td><button>세부정보보기</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td>
                        <select>
                            <option value="department1">부서1</option>
                            <option value="department2">부서2</option>
                            <option value="department3">부서3</option>
                            <option value="department4">부서4</option>
                        </select>
                    </td>
                    <td><button>이동</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s03</td>
                    <td>서홍대</td>
                    <td>사원</td>
                    <td><button>세부정보보기</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td>
                    <td><button>이동</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s04</td>
                    <td>박수원</td>
                    <td>사원</td>
                    <td><button>세부정보보기</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td>
                    <td><button>이동</button></td>
                </tr>
                <tr>
                    <td>부서2</td>
                    <td>s05</td>
                    <td>염용산</td>
                    <td>사원</td>
                    <td><button>세부정보보기</button></td>
                    <td>부서2</td>
                    <td>=></td>
                    <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td>
                    <td><button>이동</button></td>
                </tr>
                <tr>
                    <td>부서3</td>
                    <td>s06</td>
                    <td>한이대</td>
                    <td>임원</td>
                    <td><button>세부정보보기</button></td>
                    <td>부서3</td>
                    <td>=></td>
                    <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td>
                    <td><button>이동</button></td>
                </tr>
                <!-- <tr>
                    <td>부서3</td>
                    <td>s06</td>
                    <td>한이대</td>
                    <td>임원</td>
                    <td><button>세부정보보기</button></td>
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
                    <td><button>세부정보보기</button></td>
                    <td>부서4</td>
                    <td>=></td>
                    <td><select>
                <option value="department1">부서1</option>
                <option value="department2">부서2</option>
                <option value="department3">부서3</option>
                <option value="department4">부서4</option>
            </select></td>
                    <td><button>이동</button></td>
                </tr>
                <!-- <tr>
                    <td>부서4</td>
                    <td>s07</td>
                    <td>변아현</td>
                    <td>임원</td>
                    <td><button>세부정보보기</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr> -->
            </tbody>

        </table>
        <br>
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

<script>
export default {
  data() {
    return {
      list: [],
      search_key: '',
      search_value: '',
    };
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnGetList() {
      



      this.list = [
{
  event_no: 1,
  event_title: '2023년 workshop 일정 안내',
  event_author: '정준혁',
  created_at: '2023-12-20',
},
{
  event_no: 2,
  event_title: '2023년 체육대회 일정 안내',
  event_author: '정준혁',
  created_at: '2023-9-10',
},
{
  event_no: 3,
  event_title: '2023 회사 후퇴: 더 강한 팀 만들기',
  event_author: '정준혁',
  created_at: '2023-08-30',
},
{
  event_no: 4,
  event_title: '2022 제품 출시 행사: 최신 혁신 소개',
  event_author: '정준혁',
  created_at: '2023-08-13',
},
{
  event_no: 5,
  event_title: '2023년 주주총회: 회사 실적 검토',
  event_author: '정준혁',
  created_at: '2023-07-29',
},
{
  event_no: 6,
  event_title: '2022년 직원 시상식: 우수 직원 축하',
  event_author: '정준혁',
  created_at: '2023-06-22',
},
{
  event_no: 7,
  event_title: '2023년 영업 컨퍼런스: 수익의 새로운 고지 달성',
  event_author: '정준혁',
  created_at: '2023-04-30',
},
{
  event_no: 8,
  event_title: '2022 지역 사회 봉사 활동 프로그램: 우리 이웃에 돌려주기',
  event_author: '정준혁',
  created_at: '2023-4-15',
},
{
  event_no: 9,
  event_title: '2023년 기업의 사회적 책임 서밋: 긍정적인 영향 만들기',
  event_author: '정준혁',
  created_at: '2023-3-10',
},
{
  event_no: 10,
  event_title: '2023년 파트너 감사의 밤: 주요 협력사 인정',
  event_author: '정준혁',
  created_at: '2023-02-30',
},


       
      ];
    },
    fnPage() {

    },
     fnWrite() {
                this.$router.push({
                  path: './write'
                })
              },
      fnUpdate(){
          this.$router.push({
            path: './update'
          })
      },
  },
};
</script>

<style scoped>
.main {
    overflow: auto;
}
.top {
    display: flex;
    justify-content: flex-end;
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