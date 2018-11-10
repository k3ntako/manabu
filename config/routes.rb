Rails.application.routes.draw do

  get '/users/sign_up', to: redirect('/users/sign_in')
  # get '/users', to: redirect('/users/sign_in')
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :weather, only: :index
      get '/mbta/routes', to: 'mbta#routes'
      get '/mbta/stops', to: 'mbta#stops'
      get '/mbta/predictions', to: 'mbta#predictions'
      resources :users, only: [:index]
      resources :news, only: [:index]
      resources :notes, only: [:index, :update, :show]
      resources :decks, only: [:index, :update, :create] do
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
  get '/flashcards/new', to: 'homes#index'
  get '/notes', to: 'homes#index'
  get '/notes/:id', to: 'homes#index'
  get '/not-found', to: 'homes#index'

end
