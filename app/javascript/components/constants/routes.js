import Department from 'components/Department'
import Employee from 'components/Employee'
import EmployeeForm from 'components/Employee/Form'
import EmployeeShow from 'components/Employee/Show'
import SalaryReport from 'components/SalaryReport'
import TeamMember from 'components/TeamMember'
import routes from 'constants/routes'

const componentRoutes = [
  {
    path: routes.root,
    component: Employee,
  },
  {
    path: routes.employees.index,
    component: Employee,
  },
  {
    path: routes.employees.new,
    component: EmployeeForm,
  },
  {
    path: routes.employees.show,
    component: EmployeeShow,
  },
  {
    path: routes.teamMembers.index,
    component: TeamMember,
  },
  {
    path: routes.departments.index,
    component: Department,
  },
  {
    path: routes.salaryReports.index,
    component: SalaryReport,
  },
]

export default componentRoutes
