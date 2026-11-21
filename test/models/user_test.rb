require "test_helper"

class UserTest < ActiveSupport::TestCase
  def test_valid_with_the_required_attributes
    user = User.new(valid_attributes)

    assert user.valid?
  end

  def test_invalid_without_a_first_name
    user = User.new(valid_attributes(first_name: nil))

    assert_not user.valid?
    assert_includes user.errors[:first_name], "can't be blank"
  end

  def test_invalid_without_a_last_name
    user = User.new(valid_attributes(last_name: nil))

    assert_not user.valid?
    assert_includes user.errors[:last_name], "can't be blank"
  end

  def test_invalid_without_an_email
    user = User.new(valid_attributes(email: nil))

    assert_not user.valid?
    assert_includes user.errors[:email], "can't be blank"
  end

  def test_invalid_with_a_duplicate_email
    User.create!(valid_attributes)
    user = User.new(valid_attributes)

    assert_not user.valid?
    assert_includes user.errors[:email], "has already been taken"
  end

  def test_invalid_without_a_role
    user = User.new(valid_attributes(role: nil))

    assert_not user.valid?
    assert_includes user.errors[:role], "can't be blank"
  end

  def test_invalid_without_a_password_when_not_invited
    user = User.new(valid_attributes(password: nil, status: :active))

    assert_not user.valid?
    assert_includes user.errors[:password], "can't be blank"
  end

  def test_valid_without_a_password_when_invited
    user = User.new(valid_attributes(password: nil, status: :invited))

    assert user.valid?
  end

  def test_authenticates_with_the_correct_password
    user = User.create!(valid_attributes(password: "secret123"))

    assert user.authenticate("secret123")
    assert_not user.authenticate("wrong")
  end

  private

    def valid_attributes(**overrides)
      { first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, password: "secret123" }
        .merge(overrides)
    end
end
