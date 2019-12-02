import React from 'react';
import MovieIndexItem from './movie_index_item';

class MovieIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true
    }
    this.handleMovieClick = this.handleMovieClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchMovies().then(() => this.setState({ loading: true }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({movies: this.props.movies, loading: false});
    }
  }

  handleMovieClick(movieId) {
    return (e) => {
      this.props.history.push(`/movies/${movieId}`);
    }
  }

  render() {
    if (this.state.movies.length === 0) {
      return null;
    }

    let genres = {};
    if (this.state.movies.length > 0) {
      for (let i = 0; i < this.state.movies.length; i++) {
        if (!Object.keys(genres).includes(this.state.movies[i].genre)) {
          genres[this.state.movies[i].genre] = [];
        }
        genres[this.state.movies[i].genre].push(this.state.movies[i]);
      }
    }

    let allSections = Object.keys(genres).sort().map((genre, i) => {
      let genreMovies = genres[genre];

      
      let newSection;
      if (i % 3 === 0 && i > 0) {
        if (i === 3) {
          newSection = (
            <div className="movie-index-main-video-wrapper section">
              <div className="movie-index-video-description section">
                EMBRACE YOUR JAZZY FLAIR<br />
                <p className="movie-index-video-inner-description">
                  In the mood to groove to some jazzy tunes? Jazzercise is the perfect workout for you!

                  <br /> <br />
                  <a onClick={() => document.getElementById('jazzercise').scrollIntoView()}>
                    Go to Jazzercise <i class="fas fa-chevron-right"></i>
                  </a>
                </p>
              </div>
              <div className="movie-index-section-video-cover">
              </div>
              <video
                className="section-video"
                autoPlay
                loop
                src="https://netflex-seeds.s3-us-west-1.amazonaws.com/videos/section1.mp4"
                type="video/mp4"
              ></video>
              
            </div>
          )
        } else if (i === 6) {
          newSection = (
            <div className="movie-index-main-video-wrapper section">
              <div className="movie-index-video-description section">
                CROP TOP AND ROLL<br />
                <p className="movie-index-video-inner-description">
                  Walking is so yesterday. <br /> Grab your skates, and a partner too. <br /> Let's dance and zoom across the room!

                  <br /> <br />
                  <a onClick={() => document.getElementById('roller-skating').scrollIntoView()}>
                    Go to Roller Skating <i class="fas fa-chevron-right"></i>
                  </a>
                </p>
              </div>
              <div className="movie-index-section-video-cover">
              </div>
              
              <video
                className="section-video"
                autoPlay
                loop
                src="https://netflex-seeds.s3-us-west-1.amazonaws.com/videos/section2.mp4"
                type="video/mp4"
              ></video>
            </div>
          )
        }

        return (
          <div>
            {newSection}
            {genre === "Jazzercise" ? <div id="jazzercise"></div> : ""}
            {genre === "Roller Skating" ? <div id="roller-skating"></div> : ""}

            <div key={i} className="movie-index-section-main">
              <h1 className="movie-index-section-title">{genre}</h1>
              <div className="movie-index-section">
                {genreMovies.map((movie, j) => {
                  return <MovieIndexItem key={j} movie={movie} onClick={this.handleMovieClick(movie._id)} />
                })}
                <div className="movie-index-item-hidden-last"></div>
              </div>
            </div>
          </div>
        )
      }
      
      return (
        <div key={i} className="movie-index-section-main">
          {genre === "Jazzercise" ? <div id="jazzercise"></div> : ""}
          {genre === "Roller Skating" ? <div id="roller-skating"></div> : ""}
          <h1 className="movie-index-section-title">{genre}</h1>
          <div className="movie-index-section">
            {genreMovies.map((movie, j) => {
              return <MovieIndexItem key={j} movie={movie} onClick={this.handleMovieClick(movie._id)}/>
            })}
            <div className="movie-index-item-hidden-last"></div>
          </div>
        </div>
      )
    })

    return (
      <div className="movie-index-main">
        <div className="movie-index-video-hider"></div>
        
        <div className="movie-index-main-video-wrapper">
          <div className="movie-index-video-description">
            Funky.<br />
            Fun. <br />
            Fresh. <br />
            Fitness. <br />
            <p className="movie-index-video-inner-description">
              Get off your seat and move to the beat! Netflex is here to get your hips movin, your muscles boomin, your body groovin! 
            </p>
          </div>
          <video 
            autoPlay 
            loop  
            src="https://netflex-seeds.s3-us-west-1.amazonaws.com/videos/neflexMainMovie.mp4" 
            type="video/mp4" 
          ></video>
        </div>
          {allSections}
      </div>
    );
  }
}


export default MovieIndex;