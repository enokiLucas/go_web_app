class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.json :state, null: false
      t.integer :board_size, null: false, default: 9
      t.string :game_type
      t.string :timer
      t.integer :player_black_id
      t.integer :player_white_id
      t.string :status

      t.timestamps

      t.index: player_black_id
      t.index: player_white_id
    end
  end
end
