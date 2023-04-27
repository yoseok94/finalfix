import DepartmentMovements from "@/views/management/DepartmentMovements";
import DepartmentInquiry from "@/views/management/DepartmentInquiry";
import DepartmentApplication from "@/views/management/DepartmentApplication";
import ApplicationDetails from "@/views/management/ApplicationDetails";
import MyApplication from "@/views/management/MyApplication";
import BasicInformation from "@/views/management/BasicInformation";


const junheejs = [
  {
    path: "/management/deptmove",
    name: "DepartmentalMovements",
    component: DepartmentMovements,
  },
  {
    path: "/management/deptinq",
    name: "DepartmentInquiry",
    component: DepartmentInquiry,
  },
  {
    path: "/management/deptapp",
    name: "DepartmentApplication",
    component: DepartmentApplication,
  },
  {
    path: "/management/appdetail",
    name: "ApplicationDetails",
    component: ApplicationDetails,
  },
  {
    path: "/management/myapp",
    name: "MyApplication",
    component: MyApplication,
  },
  {
    path: "/management/basicinfo",
    name: "BasicInformation",
    component: BasicInformation,
  },
]

export default junheejs