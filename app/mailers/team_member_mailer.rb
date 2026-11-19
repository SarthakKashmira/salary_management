class TeamMemberMailer < ApplicationMailer
  def invite(user)
    @user = user
    @registration_url = "#{root_url}login?email=#{ERB::Util.url_encode(user.email)}"

    Rails.logger.info("[team member invite] Registration link for #{user.email}: #{@registration_url}")

    mail(to: user.email, subject: "You've been invited to ACME's salary management")
  end
end
