class User < ApplicationRecord
  has_secure_password validations: false

  enum :role, { admin: 0, member: 1 }
  enum :status, { active: 0, inactive: 1, invited: 2 }, default: :active

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true
  validate :password_presence, unless: :invited?

  private

    def password_presence
      errors.add(:password, :blank) if password_digest.blank?
    end
end
