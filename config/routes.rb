Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # JSON API consumed by the React frontend.
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :employees, only: [ :index, :show, :create, :update, :destroy ] do
        collection do
          delete :bulk_destroy
        end
      end
      resources :departments, only: [ :index, :show, :create, :update, :destroy ] do
        collection do
          delete :bulk_destroy
        end
      end
      resources :users, only: [ :index, :show, :create, :update, :destroy ]
      resources :employee_imports, only: :create
      resource :session, only: :create
      resource :registration, only: :create
      resources :countries, only: :index
      resources :currencies, only: :index
      resource :summary, only: :show, controller: "summary"

      namespace :demo_data do
        post :seed
        post :clear
      end
    end
  end

  # React Router owns client-side routing; Rails just serves the SPA shell
  # for the root path and any other request not already matched above.
  root "frontend#index"
  get "*path", to: "frontend#index", format: false
end
