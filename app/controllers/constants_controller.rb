class ConstantsController < ApplicationController
  def show
    render json: JSON.parse(File.read(Rails.root.join('config/constants/constants.json')))
  end
end				