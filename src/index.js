import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick({value: 'X'})}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    })
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    if (winner) {
      status = `Winner: ${winner}`
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Story = () => (
  <div>
    <h2>Our Story</h2>
  </div>
)

class Map extends React.Component {
  iframe() {
    return {
      __html: this.props.iframe
    }
  }
  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={ this.iframe() } />
      </div>
    );
  }
};

const iframe = '<iframe width="500" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJOY_CAWJ3hlQRFi4pBpGW5b0&key=AIzaSyCauh5KUDIhwiC-8esLwCAlQMeNxsmV2Es" allowfullscreen></iframe>';

const Reception = () => (
  <div>
    <h2>Reception</h2>
    <h3>September 1, 2018</h3>
    <h3>Burnaby Mountain Clubhouse</h3>
    <h4>7600 Halifax St, Burnaby, BC<br />V5A 4H2</h4>
    <h3>5:00pm to 12:00am</h3>
    <Map iframe={iframe} />
  </div>
)

class Rsvp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
  }

  render() {
    return (
      <div>
        <h2>RSVP</h2>
        <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const Registry = () => (
  <div>
    <h2>Registry</h2>
    <p>
    </p>
  </div>
)
const Playlist = () => (
  <div>
    <h2>Playlist</h2>
  </div>
)

class Game extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul className="nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/reception">Reception</Link></li>
              <li><Link to="/rsvp">RSVP</Link></li>
              <li><Link to="/registry">Registry</Link></li>
              <li><Link to="/playlist">Playlist</Link></li>
              <li><Link to="/story">Our Story</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/reception" component={Reception}/>
            <Route path="/rsvp" component={Rsvp}/>
            <Route path="/registry" component={Registry}/>
            <Route path="/playlist" component={Playlist}/>
            <Route path="/story" component={Story}/>
          </div>
        </Router>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
