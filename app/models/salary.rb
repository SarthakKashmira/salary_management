class Salary < ApplicationRecord
  belongs_to :employee
  belongs_to :currency

  validates :amount, presence: true
  validates :effective_from, presence: true
  validates :employee_id, uniqueness: true
end
