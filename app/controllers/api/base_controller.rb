module Api
  class BaseController < ActionController::Base
    include Authenticatable
    include Pundit::Authorization

    skip_before_action :verify_authenticity_token

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotDestroyed, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from Money::Bank::UnknownRate, with: :render_unknown_exchange_rate
    rescue_from Pundit::NotAuthorizedError, with: :render_forbidden

    private

      def render_success(message: "Success", status: :ok)
        render json: { message: message }, status: status
      end

      def render_unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
      end

      def render_unknown_exchange_rate(exception)
        render json: { errors: [ exception.message ] }, status: :unprocessable_entity
      end

      def render_not_found(exception)
        render json: { errors: [ "#{exception.model} not found" ] }, status: :not_found
      end

      def render_forbidden
        render json: { errors: [ "You are not permitted for this action" ] }, status: :forbidden
      end
  end
end
