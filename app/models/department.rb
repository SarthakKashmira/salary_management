class Department < ApplicationRecord
  has_many :employees

  validates :name, presence: true, uniqueness: true
  validates :code, presence: true, uniqueness: true

  before_destroy :ensure_no_employees_assigned

  private

    def ensure_no_employees_assigned
      return if employees.none?

      errors.add(:base, "#{employees.count} employees use this department, so it cannot be deleted")
      throw :abort
    end
end
