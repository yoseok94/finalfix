// 급여 조회 - v
import SalaryrRetrieve from '@/views/accounting/SalaryrRetrieve.vue';
// 급여명세서 조회하기
import PayStub from '@/views/accounting/PayStub.vue';
// 급여명세서 작성하기
import PayStubWrite from '@/views/accounting/PayStubWrite.vue';

// 급여 관리 - v
import SalaryManagement from '@/views/accounting/SalaryManagement.vue';

// 수당 및 공제 리스트 
import AllowancesDeductions from '@/views/accounting/AllowancesDeductions.vue';
// 수당 및 공제 리스트 작성
import AllowancesDeductionsWrite from '@/views/accounting/AllowancesDeductionsWrite.vue';

// 매출 조회
import RevenueRetrieve from '@/views/accounting/RevenueRetrieve.vue';
// 회계전표 조회
import SlipStatementRetrieve from '@/views/accounting/SlipStatementRetrieve.vue';
// 회계전표 작성
import SlipStatementWrite from '@/views/accounting/SlipStatementWrite.vue';

const youngkwangjs = [
  {
    path: '/accounting/salaryretrieve',
    name: 'SalaryrRetrieve',
    component: SalaryrRetrieve,
  },
  {
    path: '/accounting/stub',
    name: 'PayStub',
    component: PayStub,
  },
  {
    path: '/accounting/stubwrite',
    name: 'PayStubWrite',
    component: PayStubWrite,
  },
  {
    path: '/accounting/management',
    name: 'SalaryManagement',
    component: SalaryManagement,
  },
  {
    path: '/accounting/allowancesdeductions',
    name: 'AllowancesDeductions',
    component: AllowancesDeductions,
  },
  {
    path: '/accounting/adwrite',
    name: 'AllowancesDeductionsWrite',
    component: AllowancesDeductionsWrite,
  },
  {
    path: '/accounting/revenueretrieve',
    name: 'RevenueRetrieve',
    component: RevenueRetrieve,
  },
  {
    path: '/accounting/slipretrieve',
    name: 'SlipStatementRetrieve',
    component: SlipStatementRetrieve,
  },
  {
    path: '/accounting/slipwrite',
    name: 'SlipStatementWrite',
    component: SlipStatementWrite,
  },
  //
];

export default youngkwangjs;
