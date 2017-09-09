Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'
  resource :simple_translation, only: [:new, :show]
end
