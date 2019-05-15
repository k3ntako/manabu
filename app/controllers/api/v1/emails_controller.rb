class Api::V1::EmailsController < ApplicationController
  def groups
    render json: {
      ok: true
    }
  end
end
