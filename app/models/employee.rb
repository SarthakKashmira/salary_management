class Employee < ApplicationRecord
  belongs_to :country
  belongs_to :department, optional: true
  has_one :salary, dependent: :destroy

  enum :status, { active: "active", inactive: "inactive" }, default: :active

  validates :employee_id, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :joining_date, presence: true
end
