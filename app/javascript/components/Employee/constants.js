import { COLORS } from 'common/theme'

// Placeholder rows until GET /api/employees exists - replace with a useQuery call
// in index.jsx, keeping Header and Table presentational.
export const EMPLOYEES = [
  {
    id: 1,
    employeeId: 'EMP-001',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@example.com',
    department: 'Engineering',
    designation: 'Senior Engineer',
    joiningDate: '2023-04-10',
    status: 'active',
  },
  {
    id: 2,
    employeeId: 'EMP-002',
    firstName: 'Diya',
    lastName: 'Menon',
    email: 'diya.menon@example.com',
    department: 'Design',
    designation: 'Product Designer',
    joiningDate: '2024-01-22',
    status: 'active',
  },
  {
    id: 3,
    employeeId: 'EMP-003',
    firstName: 'Kabir',
    lastName: null,
    email: 'kabir@example.com',
    department: null,
    designation: null,
    joiningDate: '2026-11-03',
    status: 'active',
  },
  {
    id: 4,
    employeeId: 'EMP-004',
    firstName: 'Meera',
    lastName: 'Iyer',
    email: 'meera.iyer@example.com',
    department: 'Finance',
    designation: 'Accountant',
    joiningDate: '2022-08-15',
    status: 'inactive',
  },
]

export const SEARCHABLE_FIELDS = ['firstName', 'lastName', 'email', 'employeeId', 'department']

export const DATE_FORMAT = 'DD MMM YYYY'

// Each status reads as text on a soft tint, outlined in the same colour as the text.
export const STATUS_STYLES = {
  active: { color: COLORS.green, background: COLORS.greenSoft, borderColor: COLORS.green },
  inactive: { color: COLORS.red, background: COLORS.redSoft, borderColor: COLORS.red },
}
