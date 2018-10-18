require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    birthday { Date.new(1995,5,27) }
    first_name { 'K3ntako' }
    last_name { 'Sauce' }
  end

end
