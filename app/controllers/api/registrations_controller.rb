module Api
  class RegistrationsController < BaseController
    skip_before_action :authenticate_request!

    def create
      @user = User.new(registration_params.merge(role: :member))
      @user.save!
      @token = JsonWebToken.encode(email: @user.email)
    end

    private

      def registration_params
        params.require(:user).permit(:first_name, :last_name, :email, :phone, :password)
      end
  end
end
