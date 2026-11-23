require "test_helper"

class ProgressTrackerTest < ActiveSupport::TestCase
  include ActionCable::TestHelper

  def test_broadcast_publishes_the_payload_on_the_given_topic
    assert_broadcast_on("task-abc", percent: 50, stage: "rows_parsed", message: "halfway") do
      ProgressTracker.broadcast("task-abc", percent: 50, stage: "rows_parsed", message: "halfway")
    end
  end

  def test_broadcast_caches_the_payload_so_latest_can_read_it_back
    ProgressTracker.broadcast("task-abc", percent: 50, stage: "rows_parsed", message: "halfway")

    assert_equal(
      { percent: 50, stage: "rows_parsed", message: "halfway" },
      ProgressTracker.latest("task-abc")
    )
  end

  def test_latest_returns_nil_when_nothing_has_been_cached
    assert_nil ProgressTracker.latest("never-broadcast")
  end
end
