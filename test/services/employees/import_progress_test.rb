require "test_helper"

module Employees
  class ImportProgressTest < ActiveSupport::TestCase
    include ActionCable::TestHelper

    def test_broadcast_publishes_the_payload_on_the_imports_stream
      assert_broadcast_on("employee_import_abc", percent: 50, stage: "rows_parsed", message: "halfway") do
        ImportProgress.broadcast("abc", percent: 50, stage: "rows_parsed", message: "halfway")
      end
    end

    def test_broadcast_caches_the_payload_so_latest_can_read_it_back
      ImportProgress.broadcast("abc", percent: 50, stage: "rows_parsed", message: "halfway")

      assert_equal(
        { percent: 50, stage: "rows_parsed", message: "halfway" },
        ImportProgress.latest("abc")
      )
    end

    def test_latest_returns_nil_when_nothing_has_been_cached
      assert_nil ImportProgress.latest("never-broadcast")
    end
  end
end
