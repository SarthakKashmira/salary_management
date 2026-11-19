module Api
  class RegistrationsController < BaseController
    skip_before_action :authenticate_request!

    def create
      invited_user = User.find_by(email: registration_params[:email])

      if invited_user && invited_user.password_digest.blank?
        invited_user.update!(registration_params.except(:email).merge(status: :active))
        @user = invited_user
      else
        @user = User.new(registration_params.merge(role: :member))
        @user.save!
      end

      @token = JsonWebToken.encode(email: @user.email)
    end

    private

      def registration_params
        params.require(:user).permit(:first_name, :last_name, :email, :phone, :password)
      end
  end
end
