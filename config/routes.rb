Rails.application.routes.draw do
  devise_for :users
  get 'welcome/index'
  root 'welcome#index'

  namespace :api do
    namespace :v1 do
      resources :translations, only: [:create]
    end
  end

  resources :translations, only: [:index]
end
