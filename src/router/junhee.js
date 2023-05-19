import DeptMove from "@/views/management/DeptMove";
import PersonalDetails from "@/views/management/PersonalDetails";
import AccessRestriction from "@/views/management/AccessRestriction";
import DeptAppList from "@/views/management/DeptAppList";
import MovingHistory from "@/views/management/MovingHistory";
import AppDetailsCheck from "@/views/management/AppDetailsCheck";
import MoveDetailsCheck from "@/views/management/MoveDetailsCheck";
import WriteReasonApp from "@/views/management/WriteReasonApp";
import WriteReasonMove from "@/views/management/WriteReasonMove";



const junheejs = [
  {
    path: "/management/deptmove",
    name: "DeptMove",
    component: DeptMove,
  },
  {
    path: "/management/personaldetails",
    name: "PersonalDetails",
    component: PersonalDetails,
  },
  {
    path: "/management/accessrestriction",
    name: "AccessRestriction",
    component: AccessRestriction,
  },
  {
    path: "/management/deptapplist",
    name: "DeptAppList",
    component: DeptAppList,
  },
  {
    path: "/management/movinghistory",
    name: "MovingHistory",
    component: MovingHistory,
  },
  {
    path: "/management/appdetailscheck",
    name: "AppDetailsCheck",
    component: AppDetailsCheck,
  },
  {
    path: "/management/movedetailscheck",
    name: "MoveDetailsCheck",
    component: MoveDetailsCheck,
  },
  {
    path: "/management/writereasonapp",
    name: "WriteReasonApp",
    component: WriteReasonApp,
  },
  {
    path: "/management/writereasonmove",
    name: "WriteReasonMove",
    component: WriteReasonMove,
  }
]

export default junheejs