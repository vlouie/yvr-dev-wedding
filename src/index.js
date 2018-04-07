import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './index.css';
import axios from 'axios';
import storymain from './img/IMG_20170820_231740_282.jpg';
import story01 from './img/pic02.jpg';
import story02 from './img/20140706_174659.jpg';
import story03 from './img/20140824_110144.jpg';
import story04 from './img/20150711_124551.jpg';
import story05 from './img/20160904_144445.jpeg';
import story06 from './img/pic03.jpg';
import story07 from './img/IMG495.jpg';
import story08 from './img/pic01.jpg';
import story09 from './img/cute.jpg';
import story10 from './img/20151106_180705.jpg';
import story11 from './img/20151108_111805.jpg';
import story12 from './img/20151217_194409.jpg';
import story13 from './img/20140526_150618.jpg';

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
    <div className="mainPic"></div>
    <h2 className="no-top-margin">Victoria & Sterling</h2>
  </div>
)

const Story = () => (
  <div className="content">
    <h2>Our Story</h2>
    <div className="inner-content">
      <img src={storymain} class="float-left" width="200" />
      <p>
      &nbsp;&nbsp;If you're reading this, that means you're part of a select group of Vancouver-based people who are important to either Victoria, or Sterling, or both of us. Not to worry, the Winnipeg-based folks have a <a href="http://www.sterlingvictoria.com">shindig</a> of their own!<br />
      &nbsp;&nbsp;Most of you know that we met in school, and most of you have known either one or both of us for a couple years at least. For context, it was a computer science algorithms tutorial (yuck!), and what got us talking was a shared love for classical music. At the time, both of us were taking music courses; his was an elective theory course, hers were requisite history courses for her minor.<br />
    &nbsp;&nbsp;It turned out that Victoria was more into Chopin and Mozart, and Sterling was more of a Bach and Beethoven fan, but the two of us found a number of other common interests and values.<br />
    &nbsp;&nbsp;There isn't a whole lot to our "story" aside from what I outlined above; we are a fairly boring couple, and between the two of us, we run the gamut in terms of software development skills (he's technical, she's into all of the workflow/processes side). So instead, have some fun fast facts to get you caught up on who we are:<br />
      </p>
        <div className="fastfacts"><h2>Victoria</h2></div>
        <div className="fastfacts"><h2>Sterling</h2></div>
      <hr />
    <center>
    <table>
    <tr>
    <td>
      <img src={story01} width="200" />
    </td>
    <td>
      <img src={story02} width="200" />
    </td>
    <td>
      <img src={story03} width="200" />
    </td>
    <td>
      <img src={story04} width="200" />
    </td>
    </tr>
    <tr>
    <td>
      <img src={story05} width="200" />
    </td>
    <td>
      <div className="img-trim"><img src={story06} width="200" /></div>
    </td>
    <td>
      <div className="img-trim"><img src={story08} width="200" /></div>
    </td>
    <td>
      <img src={story09} width="200" />
    </td>
    </tr>
    <tr>
    <td>
      <img src={story10} width="200" />
    </td>
    <td>
      <img src={story11} width="200" />
    </td>
    <td>
      <img src={story12} width="200" />
    </td>
    <td>
      <img src={story13} width="200" />
    </td>
    </tr>
    </table>
    </center>
    </div>
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
    <div className="inner-content">
    <table border="0">
    <tr>
    <td className="td-left">
      <h3>September 1, 2018</h3>
      <h3>Burnaby Mountain Clubhouse</h3>
      <h4>7600 Halifax St, Burnaby, BC<br />V5A 4H2</h4>
      <h3>5:00pm to 12:00am</h3>
    </td>
    <td>
      <Map iframe={iframe} />
    </td>
    </tr>
    </table>
    </div>
  </div>
)

class Rsvp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      going: true,
      name2: '',
      vegan: 0,
      gluten: 0,
      allergies: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    axios.post('/server/rsvp').then(res => {
      console.log(res);
      this.setState({
        name: '',
        email: '',
        going: 'yes',
        name2: '',
        vegan: 0,
        gluten: 0,
        allergies: ''
      });
      //stateObj.token = res.data.token;
      //stateObj.type = res.data.type;
      //this.setState(stateObj);
    })
  }

  render() {
    return (
      <div className="content">
        <h2>RSVP</h2>
        <div className="inner-content">
          <form onSubmit={this.handleSubmit} >
          <label>
            <h4>People Details:</h4>
          </label>
          <label>
            <b>Name:</b>
            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          </label>
          <br />
          <br />
          <label>
            <b>E-mail:</b>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
          </label>
          <br />
          <br />
          <label>
          <b>The big question... Will you be there?</b><br />
            <input type="radio" name="going" onChange={this.handleInputChange} checked={this.state.going} />Yes!<br />
            <input type="radio" name="going" onChange={this.handleInputChange} checked={!this.state.going} />No, I/we will be square.
          </label>
          <br />
          <br />
          <label>
            <b>Plus One's Name?:</b>
            <input type="text" name="name2" value={this.state.name2} onChange={this.handleInputChange} />
          </label>
          <br />
          <br />
          <label>
            <h4>Food Stuffs:</h4>
          </label>
          <label>
            Number of vegans:
            <input type="number" name="vegan" min="0" max="2" value={this.state.vegan} onChange={this.handleInputChange} /><br /><br />
            Number of gluten-free folks:
            <input type="number" name="gluten" min="0" max="2" value={this.state.gluten} onChange={this.handleInputChange} /><br /><br />
            Food allergies, sensitivity, & severity:<br />
            <textarea name="allergies" cols="80" rows="12" value={this.state.allergies} onChange={this.handleInputChange} /><br />
          </label>
          <br />
          <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

const Registry = () => (
  <div className="content">
    <h2>Registry</h2>
    <div className="inner-content">
      <p>
      </p>
    </div>
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


class SongResult extends React.Component {
  handleClick(uri, token) {
    const playlist_id = '5BjGI2u53v2U4jSWML9FNT';
    const user_id = 'delusionelle';
    const encoded_uri = encodeURIComponent(uri);
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?uri=${encoded_uri}`
    axios.post(url,
      { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          console.log(res);
        })
  }

  render() {
    return(
      <div
        className='songResult'
        onClick={() => this.handleClick(this.props.uri, this.props.token)}>
        <div className='songResult-img'>
          <img src={this.props.albumart} />
        </div>
        <div className='songResult-info'>
          <h5>{this.props.title}</h5>
          <h5>{this.props.artist}</h5>
          <h5>{this.props.album}</h5>
        </div>
      </div>
    );
  }
};

class Playlist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: '',
        token: '',
        type: '',
        tracks: []
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      var stateObj = this.state;
      stateObj.query = event.target.value;
      this.setState(stateObj);
    }

    handleSubmit(event) {
      var stateObj = this.state;
      event.preventDefault();
      axios.get(`https://api.spotify.com/v1/search?type=track&market=CA&limit=20&q=${this.state.query}`,
      { headers: { Authorization: `Bearer ${this.state.token}` } })
        .then(res => {
          console.log(res);
          stateObj.tracks = res.data.tracks.items;
          this.setState(stateObj);
        })
    }

    componentDidMount(){
      var stateObj = this.state;
      axios.get('/server/authorize_spotify').then(res => {
        console.log(res);
        stateObj.token = res.data.token;
        stateObj.type = res.data.type;
        this.setState(stateObj);
      })
    }

    render() {
      let token = this.state.token;
      const playlistiFrame = '<iframe src="https://open.spotify.com/embed/user/delusionelle/playlist/5BjGI2u53v2U4jSWML9FNT" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';
      return (
      <div className="content">
        <h2>Playlist</h2>
        <div className="left-content inner-content">
          <p>
            DJ schmee-jay, we don't need a DJ! But we <i>do</i> need your help.<br />
            Help us build a fun, kick-ass playlist of tunes that <i>you</i> want to dance to!
          </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search for a song... &nbsp;
              <input type="text"
               value={this.state.query}
               onChange={this.handleChange}
               className="inline-text"
               name="song" />
              <input type="submit" value="Let's go!" className="button" />
            </label>
          </form>
          <div className="songResults">
            {
                this.state.tracks.map(function(trackData){
                    return <SongResult
                      title={trackData.name}
                      artist={trackData.artists[0].name}
                      album={trackData.album.name}
                      albumart={trackData.album.images[2].url}
                      uri={trackData.uri}
                      token={token}
                    />;
                })
            }
          </div>
        </div>
        <div className="right-content inner-content">
          <h3>The playlist so far...</h3>
          <PlaylistDisplay iframe={playlistiFrame} />
        </div>
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
