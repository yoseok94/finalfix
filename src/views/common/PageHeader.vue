<!-- PageHeader.vue -->
<template>
<div class="flex-shrink-0 p-3" style="width: 200px; height: 800px; auto;">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
      <svg class="bi pe-none me-2" width="30" height="30"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-5 fw-semibold">
        <img src="@/assets/images/Sefix.png" class="logo-image">
      </span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
          관리자메뉴
        </button>
        <div class="collapse" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">부서 관리</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">상품 관리</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          공지관리
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">공지사항</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">이벤트</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          담당관리
        </button>
        <div class="collapse" id="orders-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">담당 부서 이동</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">담당 부서 조회</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">담당 부서 신청</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          인사관리
        </button>
        <div class="collapse" id="account-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">근태 신청</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">근태 관리</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">근태 현황 조회</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">신규 사원 등록</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account2-collapse" aria-expanded="false">
          영업관리
        </button>
        <div class="collapse" id="account2-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">영업계획</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">거래처 관리</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">거래 명세서 처리</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">수주 작성 및 조회</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">영업 지출 결의서</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">작성 및 조회</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account3-collapse" aria-expanded="false">
          회계관리
        </button>
        <div class="collapse" id="account3-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">급여 조회</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">급여 관리</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">매출 조회</a></li>
            <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">회계 전표 조회</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <button type="button" class="btn btn-outline-light me-2" style="background-color:blueviolet">Login</button>
    </ul>
  </div>
</template>


<style scoped>
.logo-image {
  display: block;
  margin-left: -10px;
  width: 100%;
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


</style>


<script>
export default {
};

</script>

