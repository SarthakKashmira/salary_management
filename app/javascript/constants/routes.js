const routes = {
  root: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
  forbidden: '/403',
  employees: {
    index: '/employees',
    new: '/employees/new',
    show: '/employees/:id',
    edit: '/employees/:id/edit',
  },
  teamMembers: {
    index: '/team-members',
    new: '/team-members/new',
    edit: '/team-members/:id/edit',
  },
  departments: {
    index: '/departments',
    new: '/departments/new',
    show: '/departments/:id',
  },
  summary: {
    index: '/summary',
  },
  salaries: {
    index: '/salaries',
    new: '/salaries/new',
    show: '/salaries/:id',
    edit: '/salaries/:id/edit',
  },
}

export default routes
