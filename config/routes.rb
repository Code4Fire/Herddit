Rails.application.routes.draw do
  
  resources :reviews, only: [:index, :create, :update, :destroy]
  resources :users, only: [:index]
  resources :podcasts
  resources :sessions
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to:"users#show"
end
