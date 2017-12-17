import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './index.css';
import axios from 'axios';

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
  <div className="content">
    <h2>Victoria & Sterling</h2>
  </div>
)

const Story = () => (
  <div className="content">
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
  <div className="content">
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
      <div className="content">
        <h2>RSVP</h2>
        <form>
        <label>
          E-mail:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
        The big question... Will you be there?<br />
          <input type="radio" name="going" value="yes" checked />Yes!<br />
          <input type="radio" name="going" value="no" />No, I/we will be square.
        </label>
        <br />
        <label>
          Plus One's Name:
          <input type="text" name="name2" />
        </label>
        <br />
        <label>
          Food Stuffs:
        </label>
        <br />
        <label>
          Vegan
          <input type="number" name="vegan" min="0" max="2" /><br />
          Gluten-free
          <input type="number" name="vegan" min="0" max="2" /><br />
          Allergies
          <textarea /><br />
        </label>
        <br />
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const Registry = () => (
  <div className="content">
    <h2>Registry</h2>
    <p>
    </p>
  </div>
)


class PlaylistDisplay extends React.Component {
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



class Playlist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({query: event.target.value});
    }

    handleSubmit(event) {
      console.log(this.state);
      event.preventDefault();
      axios.get('https://api.spotify.com/v1/search?type=track&limit=50&q=',
      { headers: { Authorization: '' } }).
        then(res => {
          console.log(res);
        })
    }

    componentDidMount(){
      const client_id = '478187d491ff43da8526fb138d8fce7e';
      const secret = 'e98ec1264b1647dc99906f3361e7a04a';
      const thing = `${client_id}:${secret}`
      const auth = `Basic ${window.btoa(thing)}`;
      axios.post('https://accounts.spotify.com/api/token',
          {
              grant_type: 'client_credentials',
              headers: { Authorization: auth }
          }).then(res => {
              console.log(res);
          })
    }

    render() {
  const playlistiFrame = '<iframe src="https://open.spotify.com/embed/user/delusionelle/playlist/5BjGI2u53v2U4jSWML9FNT" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';
      return (
      <div className="content">
        <h2>Playlist</h2>
        <p>
          DJ schmee-jay, we don't need a DJ! But we <i>do</i> need your help.<br />
          Help us build a fun, kick-ass playlist of tunes that <i>you</i> want to dance to!
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for a song...
            <input type="text" value={this.state.query} onChange={this.handleChange} name="song" />
            <input type="submit" value="Submit" />
          </label>
        </form>
        <div className="songResults">
        </div>
        <PlaylistDisplay iframe={playlistiFrame} />
      </div>
      );
    }
};

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
