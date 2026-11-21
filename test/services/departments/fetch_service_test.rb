require "test_helper"

module Departments
  class FetchServiceTest < ActiveSupport::TestCase
    def test_returns_all_departments_ordered_by_name_when_no_search_term_is_given
      zebra = Department.create!(name: "Zebra")
      alpha = Department.create!(name: "Alpha")

      result = FetchService.new.process

      assert_equal [ alpha, zebra ], result.to_a
    end

    def test_matches_departments_by_name_case_insensitively
      Department.create!(name: "Engineering")
      Department.create!(name: "Sales")

      result = FetchService.new(search_term: "ENGIN").process

      assert_equal [ "Engineering" ], result.pluck(:name)
    end

    def test_matches_departments_by_code
      Department.create!(name: "Engineering", code: "ENG")
      Department.create!(name: "Sales", code: "SLS")

      result = FetchService.new(search_term: "eng").process

      assert_equal [ "Engineering" ], result.pluck(:name)
    end

    def test_matches_departments_by_description
      Department.create!(name: "Engineering", description: "Builds the product")
      Department.create!(name: "Sales")

      result = FetchService.new(search_term: "product").process

      assert_equal [ "Engineering" ], result.pluck(:name)
    end

    def test_returns_no_departments_when_nothing_matches
      Department.create!(name: "Engineering")

      result = FetchService.new(search_term: "nonexistent").process

      assert_empty result
    end

    def test_treats_a_blank_search_term_as_no_search
      Department.create!(name: "Engineering")

      result = FetchService.new(search_term: "   ").process

      assert_equal 1, result.count
    end
  end
end
