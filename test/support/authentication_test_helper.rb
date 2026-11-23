module AuthenticationTestHelper
  extend ActiveSupport::Concern

  class_methods do
    def requires_authentication(method, path_helper, **options)
      define_method(:test_requires_authentication) do
        resolved_options = options.transform_values { |value| value.respond_to?(:call) ? instance_exec(&value) : value }

        assert_requires_authentication(method, public_send(path_helper), **resolved_options)
      end

      define_method(:test_rejects_a_token_whose_email_no_longer_has_a_user) do
        resolved_options = options.transform_values { |value| value.respond_to?(:call) ? instance_exec(&value) : value }

        assert_rejects_unknown_user(method, public_send(path_helper), **resolved_options)
      end
    end
  end

  def auth_headers_for(user)
    { "X-Auth-Email" => user.email, "X-Auth-Token" => JsonWebToken.encode(email: user.email) }
  end

  def assert_requires_authentication(method, path, **options)
    public_send(method, path, **options)

    assert_response :unauthorized
  end

  # A JWT only proves the holder once knew the secret - it says nothing about whether that email
  # still has a user row (deleted since, or never existed). Every endpoint must reject it either way.
  def assert_rejects_unknown_user(method, path, **options)
    email = "ghost-#{SecureRandom.uuid}@example.com"
    headers = (options[:headers] || {}).merge("X-Auth-Email" => email, "X-Auth-Token" => JsonWebToken.encode(email: email))

    public_send(method, path, **options.merge(headers: headers))

    assert_response :unauthorized
  end
end
