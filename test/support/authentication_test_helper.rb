module AuthenticationTestHelper
  extend ActiveSupport::Concern

  class_methods do
    def requires_authentication(method, path_helper, **options)
      define_method(:test_requires_authentication) do
        resolved_options = options.transform_values { |value| value.respond_to?(:call) ? instance_exec(&value) : value }

        assert_requires_authentication(method, public_send(path_helper), **resolved_options)
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
end
