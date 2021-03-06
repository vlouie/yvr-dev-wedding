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
      &nbsp;&nbsp;Most of you know that we met in school in an algorithms tutorial. What got us talking was a shared love for classical music. At the time, both of us were taking music courses; his was an elective theory course, hers were requisite history courses for her minor.<br />
    &nbsp;&nbsp;It turned out that Victoria was more into Chopin and Mozart, and Sterling was more of a Bach and Beethoven fan, but that hasn't stopped the two of us from attending VSO concerts and playing the piano for each other. Beyond our shared love for classical music, we found a number of other common interests including horror movies, hockey, video games, and trashy TV shows like 90 Day Fiance.<br />
    &nbsp;&nbsp;There isn't much else to our story, and many of you know both of us. So instead, have some fun fast facts to get you caught up on who we are:<br />
      </p>
    <table class="fastfacts-table">
      <tr>
        <td>
          <div className="fastfacts"><h2>Victoria</h2>
            <p>
            <div id="slideshow">
               <div>
                 Grew up cheering for the Detroit Red Wings, but has since adopted the Winnipeg Jets as her hockey team.
               </div>
               <div>
                 Is an avid reader, especially of young adult fantasy with a splash of magic.
               </div>
               <div>
                 Was part of a Guitar Hero band with her closest friends back in university.
               </div>
               <div>
                 Plays the piano, flute, and guitar. At one point she could play a basic rock beat on the drums, too.
               </div>
               <div>
                 Her first CD was Avril Lavigne's debut, <i>Let Go</i>. It was purchased with allowance money.
               </div>
            </div>
            </p>
          </div>
        </td>
        <td>
          <div className="fastfacts"><h2>Sterling</h2>
            <p>
            <div id="slideshow2">
               <div>
                Likes his coffee black and his food spicy.
               </div>
               <div>
                Can play the piano, trumpet, French horn, and violin.
               </div>
               <div>
                Once cut, layered, bleached, and dyed Victoria's hair pink (at her request).
               </div>
               <div>
                Can serve a mean smash in badminton -- he plays every weekend!
               </div>
               <div>
                Has lived in Winnipeg, St. Catherines, Penticton, Kelowna, and now Vancouver!
               </div>
               <div>
                Is a combined Math & Computer Science major.
               </div>
               <div>
                Is definitely the better cook of the two...
               </div>
            </div>
            </p>
          </div>
        </td>
      </tr>
    </table>
    <br />
    <br />
    <h2>About The Website...</h2>
    <p>
      Victoria made this website using ReactJS, powered by a NodeJS backend.<br />
      She did not do very thorough QA, so please forgive any bugs you find (and let her know of any bugs you find!).<br />
      (The code is also very ugly, so if you ever see it, please do not judge her <i>too</i> harshly for it.)<br />
      If you want to see what features/bugs she is currently working on, feel free to browse the <a href="https://trello.com/b/ICaFQkiC/yvr-wedding-website" target="_blank" rel="noopener noreferrer">Trello</a>.<br />
      Sterling helped her with website deployment using Azure's Web App Service. It was a harrowing experience.
    </p>

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
      <h3 className="nobold">September 1, 2018</h3>
      <h3>Burnaby Mountain Clubhouse</h3>
      <h4 className="nobold">7600 Halifax St, Burnaby, BC<br />V5A 4H2</h4>
      <h3>6:00pm to 12:00am</h3>
      <div title="Add to Calendar" className="addeventatc">
        Add to Calendar
        <span className="start">09/01/2018 06:00 PM</span>
        <span className="end">09/02/2018 12:00 AM</span>
        <span className="timezone">America/Los_Angeles</span>
        <span className="title">Victoria & Sterling - Wedding Reception</span>
        <span className="description">Victoria & Sterling's wedding reception. Website: http://www.victoriasterlingyvr.com/</span>
        <span className="location">7600 Halifax St, Burnaby, BC</span>
      </div>
    </td>
    <td>
      <Map iframe={iframe} />
    </td>
    </tr>
    <tr>
      <td>
        <h3>FYI:</h3>
        <ul>
          <li>There will be a dancefloor!</li>
          <li>There will be a photobooth!</li>
          <li>There will be lots of parking available!</li>
          <li>There will be a cash bar! (But you'll each get 2 drink tickets to start.)</li>
        </ul>
      </td>
      <td>
        If you have any questions about the day-of, feel free to contact us:
        <ul>
        <li><b>E-mail:</b> victoria.and.sterling[@]gmail.com</li>
        <li><b>Phone:</b> 6o4.842.1337</li>
        </ul>
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
      going: null,
      name2: '',
      vegan: 0,
      gluten: 0,
      allergies: '',
      disabled: false,
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setGoing = this.setGoing.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  setGoing(event) {
    //console.log(event.target.value);
    if (event.target.value === 'no') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
    this.setState({ going: event.target.value});
  }

  redirect(event) {
    this.props.history.push("/playlist");
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let errs = [];
    if (this.state.name === '') {
      errs.push('Your name is required to RSVP.&nbsp;');
    }
    if (this.state.going === null) {
      errs.push('Your RSVP response is required.');
    }
    this.setState({errors: errs});

    if (errs.length === 0){
      axios.post('/server/rsvp', this.state).then(res => {
        this.confirmation.classList.toggle('hide');
        if (!this.errors.classList.contains('hide')){
          this.errors.classList.toggle('hide');
        }

        this.setState({
          name: '',
          email: '',
          going: 'yes',
          name2: '',
          vegan: 0,
          gluten: 0,
          allergies: '',
          errors: []
        });
      })
    } else {
      this.errors.classList.toggle('hide');
      errs = [];
    }
  }

  render() {
    return (
      <div className="content">
        <h2>RSVP</h2>
        <div className="inner-content">
          <p>
            Please RSVP by <b><u>August 1</u>, end of day</b>!<br />
            If we do not hear from you at that time, we will assume that you are a <b>no</b>!<br />
            If you need to update your RSVP response, just fill the form out again! We'll use your last response as your final one.<br />
            <b><u>NOTE:</u> if you're one of the few families invited, please enter all attending family members' names into the "Plus One's" box.</b>
          </p>
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
            <div onClick={this.setGoing}>
              <input type="radio" value="yes" name="going" /> Yes!<br />
              <input type="radio" value="no" name="going"/> No, I/we will be square.<br />
            </div>
          </label>
          <br />
          <br />
          <label>
            <b>Plus One's Name(s)?:</b>
            <input type="text" name="name2" value={this.state.name2} onChange={this.handleInputChange} disabled={this.state.disabled} />
          </label>
          <br />
          <br />
          <label>
            <h4>Food Stuffs:</h4>
          </label>
          <label>
            Number of vegans:
            <input type="number" name="vegan" min="0" max="4" value={this.state.vegan} onChange={this.handleInputChange} disabled={this.state.disabled} /><br /><br />
            Number of gluten-free folks:
            <input type="number" name="gluten" min="0" max="4" value={this.state.gluten} onChange={this.handleInputChange} disabled={this.state.disabled} /><br /><br />
            Food allergies, sensitivity, & severity:<br />
            <textarea name="allergies" cols="80" rows="12" value={this.state.allergies} onChange={this.handleInputChange} disabled={this.state.disabled} /><br />
          </label>
          <br />
          <div className="rsvpError hide" ref={ref => this.errors = ref}>
            { this.state.errors }
          </div>
          <div className="rsvpConfirm hide" onClick={this.redirect} ref={ref => this.confirmation = ref}>Thanks for RSVP'ing! Whether or not you're coming, you can help us put our <span>playlist</span> together!
          </div>
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
        As you know, we've already been married for over a year now, so there isn't much by way of housewares that we need at this point.
      </p>
      <p>
        We've got an Amazon.ca registry of a few random things we want, but otherwise, our main concern is paying down our mortgage, and any monetary gifts would go towards that!
      </p>
      <div className="fakeButton">
        <a href="http://a.co/3aAL1VQ" target="_blank" rel="noopener noreferrer">Take me to your Amazon wishlist!</a>
      </div>
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
    const encoded_uri = encodeURIComponent(uri);

    axios.post('/server/fuck', { token: token, uri: encoded_uri }).then(res => {
      //TODO: some sort of success notification!
      //console.log(res);
      setTimeout(function(){
        document.getElementById('coolshit').src = document.getElementById('coolshit').src
      }, 2000);
    });
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
          //console.log(res);
          stateObj.tracks = res.data.tracks.items;
          this.setState(stateObj);
        })
    }

    componentDidMount(){
      var stateObj = this.state;
      axios.get('/server/authorize_spotify').then(res => {
        //console.log(res);
        stateObj.token = res.data.access_token;
        this.setState(stateObj);
      })
    }

    render() {
      let token = this.state.token;
      const playlistiFrame = '<iframe src="https://open.spotify.com/embed/user/delusionelle/playlist/5BjGI2u53v2U4jSWML9FNT" width="300" height="500" frameborder="0" allowtransparency="true" id="coolshit"></iframe>';
      return (
      <div className="content">
        <h2>Playlist</h2>
        <div className="left-content inner-content">
          <p>
            DJ schmee-jay, we don't need a DJ! But we <i>do</i> need your help.<br />
            Help us build a fun, kick-ass playlist of tunes that <i>you</i> want to dance to!<br />
            (Yes, we will be moderating this list before it goes live.)
          </p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search for a song & click to add... &nbsp;
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
          <h3 className='no-top-margin'>The playlist so far...</h3>
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
