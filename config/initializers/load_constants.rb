CONSTANTS = JSON.parse(File.read(Rails.root.join('config/constants/constants.json')))

=begin Example usage in a controller

class GameController < ApplicationController
  def show
    edge_margin = CONSTANTS['EDGE_MARGIN']	
    render plain: "Edge Margin is #{edge_margin}"
  end
end

=end