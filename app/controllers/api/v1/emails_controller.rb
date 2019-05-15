class Api::V1::EmailsController < ApplicationController
  def groups
    puts "email#groups"
    puts params
    render json: {
      ok: true
    }
  end
end
