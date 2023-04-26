    <!-- PageHeader.vue -->
    <template>
      <div class="sidebar-container">
    <div class="flex-shrink-0 p-3" style="width: 200px; auto;">
        <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
          <svg class="bi pe-none me-2" width="30" height="30"><use xlink:href="#bootstrap"></use></svg>
          <span class="fs-5 fw-semibold">
            <img src="@/assets/images/Sefix.png" class="logo-image">
          </span>
        </a>
        <ul class="list-unstyled ps-0">
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button @click="toggleAccordion('accordion1')" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#admin-collapse" aria-expanded="false">
              관리자메뉴
            </button>
            <transition name="accordion">
            <div class="collapse" ref="accordion1" id="admin-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 관리</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">상품 관리</router-link></li>
              </ul>
            </div>
          </transition>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button @click="toggleAccordion('accordion2')" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#notice-collapse" aria-expanded="false">
              공지관리
            </button>
            <transition name="accordion">
            <div class="collapse" ref="accordion2" id="notice-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">공지사항</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">이벤트</router-link></li>
              </ul>
            </div>
          </transition>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button @click="toggleAccordion('accordion3')" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#management-collapse" aria-expanded="false">
              담당관리
            </button>
            <transition name="accordion">
            <div class="collapse" ref="accordion3" id="management-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">담당 부서 이동</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">담당 부서 조회</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">담당 부서 신청</router-link></li>
              </ul>
            </div>
          </transition>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button @click="toggleAccordion('accordion4')" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#hr-collapse" aria-expanded="false">
              인사관리
            </button>
            <transition name="accordion">
            <div class="collapse" ref="accordion4" id="hr-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 신청</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 관리</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">근태 현황 조회</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">신규 사원 등록</router-link></li>
              </ul>
            </div>
          </transition>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button @click="toggleAccordion('accordion5')" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#sales-collapse" aria-expanded="false">
              영업관리
            </button>
            <transition name="accordion">
            <div class="collapse" ref="accordion5" id="sales-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업계획</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">거래 명세서 처리</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">수주 작성 및 조회</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">영업 지출 결의서</router-link></li>
                <li><router-link to="/" class="link-body-emphasis d-inline-flex text-decoration-none rounded">작성 및 조회</router-link></li>
              </ul>
            </div>
          </transition>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button @click="toggleAccordion('accordion6')" class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#accounting-collapse" aria-expanded="false">
              회계관리
            </button>
            <transition name="accordion">
            <div class="collapse" ref="accordion6" id="accounting-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><router-link to="/accounting/salaryretrieve" class="link-body-emphasis d-inline-flex text-decoration-none rounded">급여 조회</router-link></li>
                <li><router-link to="/accounting/management" class="link-body-emphasis d-inline-flex text-decoration-none rounded">급여 관리</router-link></li>
                <li><router-link to="/accounting/revenueretrieve" class="link-body-emphasis d-inline-flex text-decoration-none rounded">매출 조회</router-link></li>
                <li><router-link to="/accounting/slipretrieve" class="link-body-emphasis d-inline-flex text-decoration-none rounded">회계 전표 조회</router-link></li>

              </ul>
            </div>
          </transition>
          </li>
          <li class="border-top my-3"></li>
          <router-link to="/login"  class="btn btn-outline-light me-2" style="background-color:blueviolet">Login</router-link>
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
    .border-top{
      background-color: rgb(126, 127, 131);
      border: solid 3px rgba(42, 28, 172, 0.15);
    }
    .flex-shrink-0{
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


    /* 메뉴 바들 가운데 정렬  */
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

 /* 하위 아코디언 메뉴바 열리고 닫히는거 부드럽게 + 시간차(트랜지션 적용) */
.collapse {
  transition: height 300ms ease-out; /* Adjust this value to match your desired closing animation duration */
  height: 0;
  overflow: hidden;
}

.collapse.show {
  height: auto;
}
</style>

  <script>
export default {
  methods: {
    // 메뉴바 터치해서 하위 아코디언 메뉴바를 열려고 할 때, 기존에 이미 열려있던 아코디언 메뉴바가 있을 시 그 메뉴바를 닫으면서 동시에 새로운 메뉴바를 열어주는 코드.
    // But "show" 라는 것을 remove 해주는 것이기 때문에 한 번에 확! 확! 사라지는 문제점이 있었고, 그냥 대뜸 remove 해버리는것이라서 따로 CSS 에서 Transition 을 줘도 먹통이었음.
    // 따라서 JavaScript 내에서 Timeout 을 설정해줌
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
};
</script>