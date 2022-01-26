class UsersController < ApplicationController
    before_action :find_user, only: [:update, :destroy]

    def index
        render json: User.all, status: :ok
    end 

    def create
        user = User.create(user_params)
        if user.valid?
        session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json:user, status: :ok
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :ok 
    end

    def destroy
        @user.destroy
        render json:{}
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:email, :password, :password_confirmation)
    end

end


