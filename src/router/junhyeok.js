import DeptList from '@/views/dept/DeptList.vue'
import DeptWrite from '@/views/dept/DeptWrite.vue'
import ProductList from '@/views/product/ProductList.vue'
import ProductWrite from '@/views/product/ProductWrite.vue'
import NoticeList from '@/views/notice/NoticeList.vue'
import NoticeWrite from '@/views/notice/NoticeWrite.vue'
import NoticeDetail from '@/views/notice/NoticeDetail.vue'
import EventList from '@/views/event/EventList.vue'
import EventWrite from '@/views/event/EventWrite.vue'
import EventDetail from '@/views/event/EventDetail.vue'
import DeptDetail from '@/views/dept/DeptDetail.vue'
import ProductDetail from '@/views/product/ProductDetail.vue'
import ProductUp from '@/views/product/ProductUp.vue'



const junhyeokjs = [
  {
    path: '/dept/list',
    name: 'DeptList',
    component: DeptList
  },
  {
    path: '/product/up',
    name: 'ProductUp',
    component: ProductUp
  },

  {
    path: '/dept/write',
    name: 'DeptWrite',
    component: DeptWrite
  },
  {
    path: '/dept/detail',
    name: 'DeptDetail',
    component: DeptDetail
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/write',
    name: 'ProductWrite',
    component: ProductWrite
  },

  {
    path: '/product/detail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/notice/list',
    name: 'NoticeList',
    component: NoticeList
  },
  {
    path: '/notice/write',
    name: 'NoticeWrite',
    component: NoticeWrite
  },

  {
    path: '/notice/detail',
    name: 'NoticeDetail',
    component: NoticeDetail
  },
  {
    path: '/event/list',
    name: 'EventList',
    component: EventList
  },
  {
    path: '/event/write',
    name: 'EventWrite',
    component: EventWrite
  },
  {
    path: '/event/detail',
    name: 'EventDetail',
    component: EventDetail
  },

]

export default junhyeokjs