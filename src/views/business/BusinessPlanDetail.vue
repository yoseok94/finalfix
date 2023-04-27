<template>
    <div>
      <h1>{{ plan.title }}</h1>
      <p>작성일: {{ plan.date }}</p>
      <p>거래처: {{ plan.client }}</p>
      <p>부서: {{ plan.department }}</p>
      <p>직책: {{ plan.position }}</p>
      <p>담당자: {{ plan.manager }}</p>
      <p>목표수량: {{ plan.targetQuantity }}</p>
      <p>목표금액: {{ plan.targetAmount }}</p>
      <p>상세내용: {{ plan.details }}</p>
      <p>비고: {{ plan.remark }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        plan: null,
      };
    },
    created() {
      const planId = this.$route.params.planId;
      this.plan = this.getPlanById(planId);
    },
    methods: {
      getPlanById(planId) {
        // id에 해당하는 계획 정보를 조회하는 로직
        return {
          id: planId,
          date: '2023-04-26',
          title: '회의',
          client: 'A회사',
          department: '영업부',
          position: '과장',
          manager: '김영업',
          targetQuantity: '100',
          targetAmount: '1000000',
          details: '다음주 계획 논의',
          remark: '없음'
        };
      },
    },
  };
  </script>