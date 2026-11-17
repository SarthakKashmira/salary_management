const routes = {
  root: '/',
  employees: {
    index: '/employees',
    new: '/employees/new',
    show: '/employees/:id',
    edit: '/employees/:id/edit',
  },
  teamMembers: {
    index: '/team-members',
  },
  departments: {
    index: '/departments',
  },
  salaryReports: {
    index: '/salary-reports',
  },
  salaries: {
    index: '/salaries',
    new: '/salaries/new',
    show: '/salaries/:id',
    edit: '/salaries/:id/edit',
  },
}

export default routes
