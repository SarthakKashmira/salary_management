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
        invoke_task("demo_data:seed")
        render_success(message: "Demo data seeded")
      end

      def clear
        invoke_task("demo_data:clear")
        render_success(message: "Demo data cleared")
      end

      private

        def require_admin!
          render_forbidden unless current_user.admin?
        end

        def invoke_task(name)
          require "rake"
          Rails.application.load_tasks unless Rake::Task.task_defined?(name)

          task = Rake::Task[name]
          task.reenable
          task.invoke
        end
    end
  end
end
