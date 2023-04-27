import HrmCheck from "@/views/hrm/HrmCheck.vue"
import HrmList from "@/views/hrm/HrmList.vue"
import HrmOrder from "@/views/hrm/HrmOrder.vue"
import HrmMember from "@/views/hrm/HrmMember.vue"
import HrmEnroll from "@/views/hrm/HrmEnroll.vue"
import HrmUpdate from "@/views/hrm/HrmUpdate.vue"
import HrmCheck2 from "@/views/hrm/HrmCheck2.vue"


const yoseokjs = [
  {
    path: "/hrm/hrmcheck",
    name: "HrmCheck",
    component: HrmCheck
  },
  {
    path: "/hrm/hrmcheck2",
    name: "HrmCheck2",
    component: HrmCheck2
  },
  {
    path: "/hrm/hrmlist",
    name: "HrmList",
    component: HrmList
  },
  {
    path: "/hrm/hrmorder",
    name: "HrmOrder",
    component: HrmOrder
  },
  {
    path: "/hrm/hrmember",
    name: "HrmMember",
    component: HrmMember
  },
  {
    path: "/hrm/hrmenroll",
    name: "HrmEnroll",
    component: HrmEnroll
  },
  {
    path: "/hrm/hrmup",
    name: "HrmUpdate",
    component: HrmUpdate
  },
]

export default yoseokjs