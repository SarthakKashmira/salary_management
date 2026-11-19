module Api
  class UsersController < BaseController
    include Paginatable

    before_action :get_user, only: [ :update, :destroy ]

    def index
      users = Users::FetchService.new(search_term: params[:search_term]).process
      @users = paginate(users)
    end

    def create
      render_error(message: "Forbidden", status: :forbidden)
    end

    def update
      @user.update!(user_params)
    end

    def destroy
      @user.destroy!
      render_success(message: "Team member deleted successfully")
    end

    private

      def get_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :phone, :role, :status)
      end
  end
end
