import SalaryrRetrieve from '@/views/accounting/SalaryrRetrieve.vue';
import SalaryManagement from '@/views/accounting/SalaryManagement.vue';
import RevenueRetrieve from '@/views/accounting/RevenueRetrieve.vue';
import SlipStatement from '@/views/accounting/SlipStatement.vue';

const youngkwangjs = [
  {
    path: '/accounting/salary',
    name: 'SalaryrRetrieve',
    component: SalaryrRetrieve,
  },
  {
    path: '/accounting/management',
    name: 'SalaryManagement',
    component: SalaryManagement,
  },
  {
    path: '/accounting/revenue',
    name: 'RevenueRetrieve',
    component: RevenueRetrieve,
  },
  {
    path: '/accounting/statement',
    name: 'SlipStatement',
    component: SlipStatement,
  },
];

export default youngkwangjs;
