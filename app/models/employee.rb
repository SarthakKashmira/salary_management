class Employee < ApplicationRecord
  belongs_to :country
  has_many :salaries

  enum :status, { active: "active", inactive: "inactive" }, default: :active

  validates :employee_id, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :joining_date, presence: true
end
