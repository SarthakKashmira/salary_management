module Api
  module V1
    # Lets an admin reset the demo dataset from the browser instead of needing
    # shell access to run `bin/rails demo_data:seed` / `demo_data:clear`.
    # Authentication is the same X-Auth-Email/X-Auth-Token pair every other
    # endpoint uses (Authenticatable, included via BaseController) - grab the
    # token from localStorage.authToken in the browser's devtools to call this
    # with curl/Postman. Being authenticated isn't enough on its own: only an
    # admin may call it, enforced below.
    class DemoDataController < BaseController
      before_action :require_admin!

      def seed
        enqueue("seed")
      end

      def clear
        enqueue("clear")
      end

      private

        def require_admin!
          render_forbidden unless current_user.admin?
        end

        def enqueue(action)
          task_id = SecureRandom.uuid
          DemoDataJob.perform_later(action, task_id)

          render json: { message: "Demo data #{action} started", taskId: task_id }
        end
    end
  end
end
