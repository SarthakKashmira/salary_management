module Api
  class UsersController < BaseController
    include Paginatable

    before_action :get_user, only: [ :update, :destroy ]

    def index
      users = Users::FetchService.new(search_term: params[:search_term]).process
      @users = paginate(users)
    end

    def create
      @user = User.create!(user_params.except(:status).merge(status: :invited))
      TeamMemberMailer.invite(@user).deliver_now
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
