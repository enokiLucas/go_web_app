class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.json :state
      t.integer :board_size
      t.string :game_type
      t.string :timer
      t.integer :player_black_id
      t.integer :player_white_id
      t.string :status

      t.timestamps
    end
  end
end
