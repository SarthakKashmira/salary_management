import Department from 'components/Department'
import DepartmentForm from 'components/Department/Form'
import DepartmentShow from 'components/Department/Show'
import Employee from 'components/Employee'
import EmployeeForm from 'components/Employee/Form'
import EmployeeShow from 'components/Employee/Show'
import Summary from 'components/Summary'
import TeamMember from 'components/TeamMember'
import TeamMemberForm from 'components/TeamMember/Form'
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
    path: routes.employees.edit,
    component: EmployeeForm,
  },
  {
    path: routes.teamMembers.index,
    component: TeamMember,
  },
  {
    path: routes.teamMembers.new,
    component: TeamMemberForm,
  },
  {
    path: routes.teamMembers.edit,
    component: TeamMemberForm,
  },
  {
    path: routes.departments.index,
    component: Department,
  },
  {
    path: routes.departments.new,
    component: DepartmentForm,
  },
  {
    path: routes.departments.show,
    component: DepartmentShow,
  },
  {
    path: routes.summary.index,
    component: Summary,
  },
]

export default componentRoutes
