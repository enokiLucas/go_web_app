class Game < ApplicationRecord
  validates :state, presence: true
  validates :board_size, presence: true
  validates :status, presence: true

  belongs_to :player_black_id, class_name: "User", optional: true
  belongs_to :player_white_id, class_name: "User", optional: true # TODO: ruby gem devise

  # Additional validations
end
