class ReviewsController < ApplicationController
    before_action :find_review, only: [:update, :destroy]

    def index
        reviews = Review.all
        render json: reviews, status: :ok
    end

    def create
        album = Album.find_or_create_by(album_params)
        review = Review.new(review_params)
        review.album = album
        # review.user_id = session[:user_id]
        review.save!
        # byebug
        render json: review, status: :created 
    end

    def update
        @review.update!(review_params)
        render json: @review, status: :ok
    end

    def destroy
        @review.destroy
        head :no_content
    end

private

    def find_review
        @review = Review.find(params[:id])
    end

    def review_params
        params.permit(:username, :comment, :date, :user_id)
    end  
    
    def album_params
        params.require(:album).permit(:name, :image, :artist_name, :category, :summary, :rating )
    end
end




