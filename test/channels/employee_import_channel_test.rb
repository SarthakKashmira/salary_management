require "test_helper"

class EmployeeImportChannelTest < ActionCable::Channel::TestCase
  def test_streams_on_the_stream_named_after_the_import_id
    subscribe import_id: "abc-123"

    assert subscription.confirmed?
    assert_has_stream "employee_import_abc-123"
  end

  def test_transmits_the_cached_progress_immediately_so_a_late_subscriber_catches_up
    ProgressTracker.broadcast(
      EmployeeImportChannel.topic_for("abc-123"), percent: 50, stage: "rows_parsed", message: "halfway there"
    )

    subscribe import_id: "abc-123"

    assert_equal 1, transmissions.size
    assert_equal 50, transmissions.last["percent"]
    assert_equal "halfway there", transmissions.last["message"]
  end

  def test_transmits_nothing_when_there_is_no_cached_progress_yet
    subscribe import_id: "brand-new"

    assert_empty transmissions
  end
end
