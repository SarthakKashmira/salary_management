class DemoDataChannel < ApplicationCable::Channel
  def self.topic_for(task_id) = "demo_data_#{task_id}"

  def subscribed
    stream_from self.class.topic_for(params[:task_id])

    latest = ProgressTracker.latest(self.class.topic_for(params[:task_id]))
    transmit(latest) if latest
  end
end
