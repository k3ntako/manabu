Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index, :update, :show]
      resources :decks, only: [:index, :update] do
        resources :definitions, only: [:create]
        resources :definition_titles, only: [:destroy]
        resources :cards, only: [:index, :update] do
          resources :masteries, only: :create
        end
      end
    end
  end

  root 'homes#index'
  get '/flashcards', to: 'homes#index'
  get '/flashcards/study/', to: redirect('/flashcards')
  get '/flashcards/study/:id', to: 'homes#index'
  get '/notes', to: 'homes#index'
  get '/notes/:id', to: 'homes#index'
  get '*path', to: redirect('/')
end
