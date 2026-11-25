require "test_helper"

module Users
  class FetchServiceTest < ActiveSupport::TestCase
    def test_returns_all_users_ordered_by_email_when_no_search_term_is_given
      zebra = create_user(first_name: "Alpha", email: "zebra@example.com")
      alpha = create_user(first_name: "Zebra", email: "alpha@example.com")

      result = FetchService.new.process

      assert_equal [ alpha, zebra ], result.to_a
    end

    def test_matches_by_first_name
      user = create_user(first_name: "Priya", email: "priya@example.com")
      create_user(first_name: "Rahul", email: "rahul@example.com")

      assert_equal [ user ], FetchService.new(search_term: "priy").process.to_a
    end

    def test_matches_by_last_name
      user = create_user(last_name: "Sharma", email: "sharma@example.com")
      create_user(last_name: "Verma", email: "verma@example.com")

      assert_equal [ user ], FetchService.new(search_term: "sharm").process.to_a
    end

    def test_matches_by_email
      user = create_user(email: "unique.person@example.com")

      assert_equal [ user ], FetchService.new(search_term: "unique.person").process.to_a
    end

    def test_matches_by_phone
      user = create_user(phone: "9998887777", email: "phoneuser@example.com")

      assert_equal [ user ], FetchService.new(search_term: "9998887").process.to_a
    end

    def test_returns_no_users_when_nothing_matches
      create_user

      assert_empty FetchService.new(search_term: "nonexistent").process
    end

    private

      def create_user(**overrides)
        User.create!(
          { first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, password: "secret123" }
            .merge(overrides)
        )
      end
  end
end
