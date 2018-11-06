Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :weather, only: :index
      get '/mbta/routes', to: 'mbta#routes'
      get '/mbta/stops', to: 'mbta#stops'
      get '/mbta/predictions', to: 'mbta#predictions'
      resources :users
      resources :notes, only: [:index, :update, :show]
      resources :decks, only: [:index, :update] do
        resources :definitions, only: [:create]
        resources :definition_titles, only: [:destroy]
        resources :cards, only: [:index, :update, :create] do
          resources :masteries, only: :create
        end
      end
    end
  end

  root 'homes#index'
  get '/flashcards', to: 'homes#index'
  get '/flashcards/study/', to: redirect('/flashcards')
  get '/flashcards/study/:id', to: 'homes#index'
  get '/flashcards/edit/:id', to: 'homes#index'
  get '/notes', to: 'homes#index'
  get '/notes/:id', to: 'homes#index'
  get '*path', to: redirect('/')
end
