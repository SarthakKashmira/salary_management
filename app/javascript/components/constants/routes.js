import Department from 'components/Department'
import Employee from 'components/Employee'
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
