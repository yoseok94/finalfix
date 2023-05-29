import BusinessPlanList from "@/views/business/BusinessPlanList.vue";
import BusinessPlanAdd from "@/views/business/BusinessPlanAdd.vue";
import BusinessPlanEdit from "@/views/business/BusinessPlanEdit.vue"
import BusinessDisbursement from "@/views/business/BusinessDisbursement.vue"
import BusinessDisbursementEdit from "@/views/business/BusinessDisbursementEdit.vue"
import BusinessPerformance from "@/views/business/BusinessPerformance.vue"

import BusinessPartnerList from '@/views/business/BusinessPartnerList.vue';
import BusinessPartnerAdd from '@/views/business/BusinessPartnerAdd.vue';
import BusinessPartnerEdit from '@/views/business/BusinessPartnerEdit.vue';
import TradingStatementList from '@/views/business/TradingStatementList.vue';
import TradingStatementAdd from '@/views/business/TradingStatementAdd.vue';
import TradingStatementEdit from '@/views/business/TradingStatementEdit.vue';
import OrdersList from '@/views/business/OrdersList.vue';
import OrdersAdd from '@/views/business/OrdersAdd.vue';
import OrdersEdit from '@/views/business/OrdersEdit.vue';


const leekangjs = [
  {
    path: '/businessPlanList',
    name: 'BusinessPlanList',
    component: BusinessPlanList
  },
  {
    path: '/businessPlanAdd',
    name: 'BusinessPlanAdd',
    component: BusinessPlanAdd
  },
  {
    path: '/businessPlanEdit/:planNo',
    name: 'BusinessPlanEdit',
    component: BusinessPlanEdit
  },
  {
    path: '/businessDisbursement',
    name: 'BusinessDisbursement',
    component: BusinessDisbursement
  },
  {
    path: '/businessPerformance',
    name: 'BusinessPerformance',
    component: BusinessPerformance
  },
  {
    path: '/businessDisbursementEdit/:planNo',
    name: 'BusinessDisbursementEdit',
    component: BusinessDisbursementEdit
  },


  {
    path: '/businessPartnerList',
    name: 'BusinessPartnerList',
    component: BusinessPartnerList,
  },
  {
    path: '/businessPartnerAdd',
    name: 'BusinessPartnerAdd',
    component: BusinessPartnerAdd,
  },
  {
    path: '/businessPartnerEdit',
    name: 'BusinessPartnerEdit',
    component: BusinessPartnerEdit,
  },
  {
    path: '/tradingStatementList',
    name: 'TradingStatementList',
    component: TradingStatementList,
  },
  {
    path: '/tradingStatementAdd',
    name: 'TradingStatementAdd',
    component: TradingStatementAdd,
  },
  {
    path: '/tradingStatementEdit',
    name: 'TradingStatementEdit',
    component: TradingStatementEdit,
  },
  {
    path: '/ordersList',
    name: 'OrdersList',
    component: OrdersList,
  },
  {
    path: '/ordersAdd',
    name: 'OrdersAdd',
    component: OrdersAdd,
  },
  {
    path: '/ordersEdit',
    name: 'OrdersEdit',
    component: OrdersEdit,
  },
]

export default leekangjs