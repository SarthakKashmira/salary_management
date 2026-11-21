require "test_helper"

class TeamMemberMailerTest < ActionMailer::TestCase
  def test_invite
    user = User.create!(
      first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :member, status: :invited
    )

    mail = TeamMemberMailer.invite(user)

    assert_equal [ "jane@example.com" ], mail.to
    assert_equal [ "from@example.com" ], mail.from
    assert_equal "You've been invited to ACME's salary management", mail.subject
    assert_match "http://example.com/login?email=jane%40example.com", mail.body.encoded
  end
end
