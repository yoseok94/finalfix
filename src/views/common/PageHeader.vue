    <!-- PageHeader.vue -->
<template>
  <div class="sidebar-container">
    <div class="flex-shrink-0 p-3" style="width: 200px; auto;">
      <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
        <svg class="bi pe-none me-2" width="30" height="30">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-5 fw-semibold">
          <img src="@/assets/images/Sefix.png" class="logo-image">
        </span>
      </a>
      <ul class="list-unstyled ps-0">
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button @click="toggleAccordion('accordion1')"
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse"
            data-bs-target="#admin-collapse" aria-expanded="false">
            관리자메뉴
          </button>


          <template v-if="auth == '관리자' || auth == '임원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion1" id="admin-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/dept/list"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 등록</router-link></li>
                  <li><router-link to="/product/list"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">상품 등록</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else-if="auth == '사원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion1" id="admin-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/product/list"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">상품 등록</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else>
          </template>

        </li>


        <!--  -->
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button @click="toggleAccordion('accordion2')"
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse"
            data-bs-target="#notice-collapse" aria-expanded="false">
            공지관리
          </button>
          <template v-if="auth == ''">
          </template>

          <template v-else>
            <transition name="accordion">
              <div class="collapse" ref="accordion2" id="notice-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/notice/list"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">공지사항</router-link></li>
                  <li><router-link to="/event/list"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">이벤트</router-link></li>
                </ul>
              </div>
            </transition>
          </template>
        </li>

        <!--  -->
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button @click="toggleAccordion('accordion3')"
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse"
            data-bs-target="#management-collapse" aria-expanded="false">
            부서관리
          </button>

          <template v-if="auth == '관리자' || auth == '임원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion3" id="management-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/management/deptmove"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 이동 관리</router-link></li>
                  <li><router-link to="/management/deptapplist"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 신청 관리</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else-if="auth == '사원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion3" id="management-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/management/writereasonapp"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 이동 신청</router-link></li>
                  <li><router-link to="/management/movinghistory"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 이동 이력</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else>
          </template>
        </li>


        <!--  -->
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button @click="toggleAccordion('accordion4')"
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse"
            data-bs-target="#hr-collapse" aria-expanded="false">
            인사관리
          </button>
          <template v-if="auth == '관리자'">
            <transition name="accordion">
              <div class="collapse" ref="accordion4" id="hr-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/hrm/hrmlist"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 관리</router-link></li>
                  <li><router-link to="/hrm/hrmcheck2"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 현황 조회</router-link></li>
                  <li><router-link to="/hrm/hrmmember"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">신규 사원 등록</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-if="auth == '임원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion4" id="hr-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/hrm/hrmorder"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 신청</router-link></li>
                  <li><router-link to="/hrm/hrmlist"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 관리</router-link></li>
                  <li><router-link to="/hrm/hrmcheck"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 현황 조회</router-link></li>
                </ul>
              </div>
            </transition>
          </template>
          <template v-else-if="auth == '사원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion4" id="hr-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/hrm/hrmorder"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 신청</router-link></li>
                  <li><router-link to="/hrm/hrmcheck"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 현황 조회</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else>
          </template>
        </li>


        <!--  -->
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button @click="toggleAccordion('accordion5')"
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse"
            data-bs-target="#sales-collapse" aria-expanded="false">
            영업관리
          </button>

          <template v-if="auth == '관리자' || auth == '임원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion5" id="sales-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/businessPlanList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업계획</router-link></li>
                  <li><router-link to="/businessPartnerList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">거래처 관리</router-link></li>
                  <li><router-link to="/tradingStatementList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">거래 명세서 처리</router-link></li>
                  <li><router-link to="/ordersList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">수주
                      작성 및 조회</router-link></li>
                  <li><router-link to="/businessDisbursement"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업 지출 결의서</router-link></li>
                  <li><router-link to="/businessPerformance"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업 실적 조회</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else-if="auth == '사원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion5" id="sales-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/businessPlanList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업계획</router-link></li>
                  <li><router-link to="/tradingStatementList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">거래 명세서 처리</router-link></li>
                  <li><router-link to="/ordersList"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">수주
                      작성 및 조회</router-link></li>
                  <li><router-link to="/businessDisbursement"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업 지출 결의서</router-link></li>
                  <li><router-link to="/businessPerformance"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업 실적 조회</router-link></li>
                </ul>
              </div>
            </transition>
          </template>

          <template v-else-if="auth == ''">
          </template>
        </li>



        <!--  -->
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button @click="toggleAccordion('accordion6')"
            class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse"
            data-bs-target="#accounting-collapse" aria-expanded="false">
            회계관리
          </button>
          <template v-if="auth == '관리자' || auth == '임원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion6" id="accounting-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/accounting/salaryretrieve"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">급여 조회</router-link></li>
                  <li><router-link to="/accounting/management"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">급여 관리</router-link></li>
                  <li><router-link to="/accounting/revenueretrieve"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">매출 조회</router-link></li>
                  <li><router-link to="/accounting/slipretrieve"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">회계 전표 조회</router-link></li>
                </ul>
              </div>
            </transition>
          </template>
          <template v-else-if="auth == '사원'">
            <transition name="accordion">
              <div class="collapse" ref="accordion6" id="accounting-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li><router-link to="/accounting/salaryretrieve"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">급여 조회</router-link></li>
                  <li><router-link to="/accounting/revenueretrieve"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">매출 조회</router-link></li>
                  <li><router-link to="/accounting/slipretrieve"
                      class="link-body-emphasis d-inline-flex text-decoration-none rounded">회계 전표 조회</router-link></li>
                </ul>
              </div>
            </transition>
          </template>
          <template v-else>
          </template>

        </li>
        <li class="border-top my-3"></li>
        <div v-if="token == 0">
          <router-link to="/login" class="btn btn-outline-light me-2"
            style="background-color:blueviolet">Login</router-link>
        </div>
        <div v-else-if="token == 1">
          <button @click="fnlogout()" class="btn btn-outline-light me-2"
            style="background-color:blueviolet">Logout</button>
        </div>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.logo-image {
  display: block;
  margin-left: -10px;
  width: 100%;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.border-top {
  background-color: rgb(126, 127, 131);
  border: solid 3px rgba(42, 28, 172, 0.15);
}

.flex-shrink-0 {
  background-color: rgba(22, 25, 207, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(13, 13, 14, 0.1), inset 0 .125em .5em rgba(18, 18, 19, 0.15);
  width: 200px;
  height: 100%;
  overflow: auto;
}

div {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;
  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.btn-toggle {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -10px;
  font-weight: bolder;

}

.btn-toggle-nav {
  text-align: center;
}

.collapse {
  transition: height 300ms ease-out;
  height: 0;
  overflow: hidden;
}

.collapse.show {
  height: auto;
}
</style>

<script>
export default {
  data() {
    return {
      token: "",
      auth: "",
    }
  },
  watch: {
    '$route'() {
      this.fnloginck();
      this.authcheck();
    }
  },
  methods: {
    fnloginck() {
      if (sessionStorage.getItem('token') !== null) {
        this.token = 1;
      } else {
        this.token = 0;
      }
    },
    authcheck() {
      if (sessionStorage.getItem('emplevel') == '관리자') {
        this.auth = '관리자';
      } else if (sessionStorage.getItem('emplevel') == '임원') {
        this.auth = '임원';
      } else if (sessionStorage.getItem('emplevel') == '사원') {
        this.auth = '사원';
      }
    },
    fnlogout() {
  sessionStorage.clear();
  this.auth = '';
  alert("logout 처리되었습니다.");
  this.fnloginck();  
  this.authcheck();  
  this.$router.push('/');
},
    closeAccordion(element) {
      element.style.height = element.scrollHeight + 'px';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = '0px';
        });
      });

      setTimeout(() => {
        element.classList.remove("show");
      }, 300);
    },
    toggleAccordion(refName) {
      for (const key in this.$refs) {
        if (key.startsWith("accordion") && key !== refName) {
          if (this.$refs[key].classList.contains("show")) {
            this.closeAccordion(this.$refs[key]);
          }
        }
      }
    },
  },
}
</script>
