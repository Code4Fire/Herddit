class PodcastsController < ApplicationController
    before_action :find_podcast, only: [:show, :update, :destroy]

    def index
        podcasts = Podcast.all
        render json: podcasts, status: :ok
    end

    def show
        render json: @podcast, status: :ok
    end

    def create
        podcast = Podcast.create!(podcast_params)
        render json: podcast, status: :created 
    end

    def update
        @podcast.update!(podcast_params)
        render json: @podcast, status: :ok
    end

    def destroy
        @podcast.destroy
        head :no_content
    end

    def reviews
        album = Album.find_by(name:params[:name])
        if album 
            render json: album.reviews, status: :ok
        else 
            render json: []
        end
    end 

private

    def find_podcast
        @podcast = Podcast.find(params[:id])
    end

    def podcast_params
        params.permit(:name, :image, :artist_name, :category, :summary, :rating, :user_id)
    end
end
