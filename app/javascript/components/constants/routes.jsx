import RequireAdmin from 'components/common/RequireAdmin'
import Department from 'components/Department'
import DepartmentForm from 'components/Department/Form'
import DepartmentShow from 'components/Department/Show'
import Employee from 'components/Employee'
import EmployeeForm from 'components/Employee/Form'
import EmployeeShow from 'components/Employee/Show'
import Forbidden from 'components/Forbidden'
import Summary from 'components/Summary'
import TeamMember from 'components/TeamMember'
import TeamMemberForm from 'components/TeamMember/Form'
import routes from 'constants/routes'

const adminOnly = (Component) => (props) => (
  <RequireAdmin>
    <Component {...props} />
  </RequireAdmin>
)

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
    component: adminOnly(EmployeeForm),
  },
  {
    path: routes.employees.show,
    component: EmployeeShow,
  },
  {
    path: routes.employees.edit,
    component: adminOnly(EmployeeForm),
  },
  {
    path: routes.teamMembers.index,
    component: TeamMember,
  },
  {
    path: routes.teamMembers.new,
    component: adminOnly(TeamMemberForm),
  },
  {
    path: routes.teamMembers.edit,
    component: adminOnly(TeamMemberForm),
  },
  {
    path: routes.departments.index,
    component: Department,
  },
  {
    path: routes.departments.new,
    component: adminOnly(DepartmentForm),
  },
  {
    path: routes.departments.show,
    component: adminOnly(DepartmentShow),
  },
  {
    path: routes.summary.index,
    component: Summary,
  },
  {
    path: routes.forbidden,
    component: Forbidden,
  },
]

export default componentRoutes
