import DeptMove from "@/views/management/DeptMove";
import PersonalDetails from "@/views/management/PersonalDetails";
import AccessRestriction from "@/views/management/AccessRestriction";
import DeptInquiry from "@/views/management/DeptInquiry";
import DeptAppList from "@/views/management/DeptAppList";
import MyMovingHistory from "@/views/management/MyMovingHistory";
import AppDetailsCheck from "@/views/management/AppDetailsCheck";
import CheckMyMoveDetails from "@/views/management/CheckMyMoveDetails";
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
    path: "/management/deptinquiry",
    name: "DeptInquiry",
    component: DeptInquiry,
  },
  {
    path: "/management/deptapplist",
    name: "DeptAppList",
    component: DeptAppList,
  },
  {
    path: "/management/mymovinghistory",
    name: "MyMovingHistory",
    component: MyMovingHistory,
  },
  {
    path: "/management/appdetailscheck",
    name: "AppDetailsCheck",
    component: AppDetailsCheck,
  },
  {
    path: "/management/checkmymovedetails",
    name: "CheckMyMoveDetails",
    component: CheckMyMoveDetails,
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