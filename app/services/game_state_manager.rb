class GameStateManager
  attr_accessor :current_player, :board_size, :capture_counter, :pass_counter, :moves_history # Create get and sets

  # Initialize the game state manager with a game instance
  def initialize(game)
    @game = game
    # Load the state from the game record or initialize a new state if not present
    @state = game.state.presence || initial_state
    load_state
  end

  # Handle making a move on the board
  def make_move(x, y)
    # Record the move in the moves history
    @state[:moves_history] << { player: @state[:current_player], x: x, y: y }
    # Switch to the other player
    toggle_player
    # Save the updated state to the database
    save_state
  end

  # Handle passing a turn
  def pass_turn
    # Increment the pass counter
    @state[:pass_counter] += 1
    # Switch to the other player
    toggle_player
    # Save the updated state to the database
    save_state
  end

  # Save the current state to the associated game record in the database
  def save
    @game.update(state: @state, status: determine_status)
  end

  # Return any errors from the game record
  def errors
    @game.errors
  end

  # Return the current state as a JSON object
  def as_json(options = {})
    @state
  end

  private

  # Initialize a new game state with default values
  def initial_state
    {
      current_player: 'black',              # The current player, starting with 'black'
      board_size: @game.board_size,         # The size of the board
      capture_counter: { black: 0, white: 0 }, # Counter for captured stones
      pass_counter: 0,                      # Counter for consecutive passes
      moves_history: []                     # History of all moves made
    }
  end

  # Load the state into instance variables
  def load_state
    @state.each do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  # Save the current state to the instance variable and the database
  def save_state
    @state = {
      current_player: @current_player,
      board_size: @board_size,
      capture_counter: @capture_counter,
      pass_counter: @pass_counter,
      moves_history: @moves_history
    }
    save
  end

  # Switch the current player to the other player
  def toggle_player
    @current_player = @current_player == 'black' ? 'white' : 'black'
  end

  # Determine the status of the game (e.g., 'ongoing', 'finished')
  def determine_status
    # Implement logic to determine if the game is finished or still ongoing
    'ongoing'
  end
end
