class User < ApplicationRecord
  enum :role, { admin: 0, member: 1 }
  enum :status, { active: 0, inactive: 1 }, default: :active

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true
  validates :role, presence: true
end
