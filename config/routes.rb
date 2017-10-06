Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'

  namespace :api do
    namespace :v1 do
      resource :simple_translation, only: [:show]
    end
  end

  resources :translations, only: [:create]
end
