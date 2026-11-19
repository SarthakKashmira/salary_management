module JsonWebToken
  ALGORITHM = "HS256".freeze
  EXPIRATION = 24.hours

  module_function

  def encode(payload)
    JWT.encode(payload.merge(exp: EXPIRATION.from_now.to_i), Rails.application.secret_key_base, ALGORITHM)
  end

  def decode(token)
    body = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: ALGORITHM).first

    ActiveSupport::HashWithIndifferentAccess.new(body)
  rescue JWT::DecodeError
    nil
  end
end
