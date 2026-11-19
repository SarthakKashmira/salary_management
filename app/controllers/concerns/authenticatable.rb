module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

    def authenticate_request!
      email = request.headers["X-Auth-Email"]
      payload = JsonWebToken.decode(request.headers["X-Auth-Token"])

      @current_user = User.find_by(email: email) if payload && payload[:email] == email

      render json: { errors: [ "Unauthorized" ] }, status: :unauthorized unless @current_user
    end

    def current_user
      @current_user
    end
end
