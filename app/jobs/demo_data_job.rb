class DemoDataJob < ApplicationJob
  queue_as :default

  ACTIONS = %w[seed clear].freeze

  def perform(action, task_id)
    raise ArgumentError, "Unknown demo data action: #{action}" unless ACTIONS.include?(action)

    ProgressTracker.broadcast(
      DemoDataChannel.topic_for(task_id), percent: 10, stage: "started", message: "#{action.capitalize}ing demo data"
    )

    invoke_task("demo_data:#{action}")

    ProgressTracker.broadcast(
      DemoDataChannel.topic_for(task_id),
      percent: 100,
      stage: "completed",
      message: action == "seed" ? "Demo data seeded" : "Demo data cleared"
    )
  end

  private

    def invoke_task(name)
      require "rake"
      Rails.application.load_tasks unless Rake::Task.task_defined?(name)

      task = Rake::Task[name]
      task.reenable
      task.invoke
    end
end
