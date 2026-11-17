# The React frontend consumes camelCase keys, so every jbuilder response
# camelizes the snake_case names used while building it.
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true
