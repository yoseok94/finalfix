// 급여 조회 - v
import SalaryrRetrieve from '@/views/accounting/SalaryrRetrieve.vue';
// 급여명세서 작성하기
import PayStub from '@/views/accounting/PayStub.vue';
// 급여명세서 작성하기
import PayStubWrite from '@/views/accounting/PayStubWrite.vue';
// 급여명세서 보내기
import PayStubSend from '@/views/accounting/PayStubSend.vue';
// 급여 관리 - v
import SalaryManagement1 from '@/views/accounting/SalaryManagement1.vue';
import SalaryManagement2 from '@/views/accounting/SalaryManagement2.vue';
  // 수당 리스트 
import WageList from '@/views/accounting/WageList.vue';
  // 공제 리스트 
import DeductionList from '@/views/accounting/DeductionList.vue';
// 매출 조회
import RevenueRetrieve from '@/views/accounting/RevenueRetrieve.vue';
// 회계전표 조회
import SlipStatementRetrieve from '@/views/accounting/SlipStatementRetrieve.vue';
// 회계전표 작성
import SlipStatementWrite from '@/views/accounting/SlipStatementWrite.vue';
// 거래처 등록
import AddCustomer from '@/views/accounting/AddCustomer.vue';


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
    path: '/accounting/stubsend',
    name: 'PayStubSend',
    component: PayStubSend,
  },
  {
    path: '/accounting/management1',
    name: 'SalaryManagement1',
    component: SalaryManagement1,
  },
  {
    path: '/accounting/management2',
    name: 'SalaryManagement2',
    component: SalaryManagement2,
  },
  {
    path: '/accounting/wageList',
    name: 'WageList',
    component: WageList,
  },
  {
    path: '/accounting/deductionList',
    name: 'DeductionList',
    component: DeductionList,
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
  {
  
    path: '/accounting/addcustomer',
    name: 'AddCustomer',
    component: AddCustomer,
  }
  //
];

export default youngkwangjs;
