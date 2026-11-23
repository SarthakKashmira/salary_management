require "test_helper"

class DemoDataJobTest < ActiveJob::TestCase
  include ActionCable::TestHelper

  def test_seed_populates_demo_data_and_broadcasts_progress
    task_id = "task-#{SecureRandom.uuid}"

    with_env("DEMO_EMPLOYEE_COUNT" => "2") do
      DemoDataJob.perform_now("seed", task_id)
    end

    assert_equal 10, Department.count
    assert Employee.count >= 2
    assert Currency.exists?(code: "USD")

    progress = ProgressTracker.latest(DemoDataChannel.topic_for(task_id))
    assert_equal 100, progress[:percent]
    assert_equal "completed", progress[:stage]
  end

  def test_clear_deletes_everything_except_the_permanent_admin
    User.find_or_create_by!(email: "hrmanager@incubyte.com") do |user|
      user.first_name = "HR"
      user.last_name = "Manager"
      user.role = :admin
      user.password = "welcome"
    end
    User.create!(first_name: "Member", last_name: "User", email: "member-#{SecureRandom.uuid}@example.com", role: :member, password: "secret123")
    Country.create!(name: "India", code: "IN")
    Department.create!(name: "Engineering")

    task_id = "task-#{SecureRandom.uuid}"
    DemoDataJob.perform_now("clear", task_id)

    assert_equal 0, Country.count
    assert_equal 0, Department.count
    assert_equal 1, User.count
    assert User.exists?(email: "hrmanager@incubyte.com")

    progress = ProgressTracker.latest(DemoDataChannel.topic_for(task_id))
    assert_equal 100, progress[:percent]
    assert_equal "completed", progress[:stage]
  end

  def test_raises_for_an_unknown_action
    assert_raises(ArgumentError) { DemoDataJob.perform_now("delete_everything_twice", "task-1") }
  end

  private

    def with_env(overrides)
      original = overrides.keys.index_with { |key| ENV[key] }
      overrides.each { |key, value| ENV[key] = value }
      yield
    ensure
      original.each { |key, value| ENV[key] = value }
    end
end
