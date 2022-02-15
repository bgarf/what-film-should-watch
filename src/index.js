
import ReactDOM from 'react-dom';
import React from 'react';
import styles from './css/index.css'


class Tick extends React.Component {
  render () {
    return (<svg><polyline points="20 6 9 17 4 12" /></svg>)
  }
}
class SearchBar extends React.Component {
  render () {
    console.log("Search Bar")
    return (
      <form>
          <input className={styles.searchInput} type="text" name="search-params" placeholder="What type of film..."/>
          <input type="submit"/>
      </form>
    )
  }
}
  
class Navigation extends React.Component {
  render () {
    console.log("Nav")
    return (
      <div className={styles.navbar}>
        <a href="#" onClick={() => this.props.handleClick()}>All Films</a>
        <a className={styles.centre} href="#" onClick={() => this.props.handleGetGenres()}>Pick A Genre</a>
        <a href="#">Ratings</a>
    </div>
    )
  }
}
  
class Film extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.film.hasWatched
    }
  }

  switchCheckedState() {
    let checkedNewValue = this.state.checked ? false : true
    this.setState({checked: checkedNewValue})
    this.handleHasWatchedSelection(checkedNewValue)
  }

  handleHasWatchedSelection(checkedNewValue) {
    fetch(`http://localhost:8000/film/watched?id=${this.props.film.id}&watched=${checkedNewValue}`, {
      "method": "POST",
      "content-type": "application/json",
    }
    )
    .catch(error => console.log(error))
  }  

  render () {
    console.log("Film")
    return (        
      <div className={styles.film}>
        <div className={styles.filmImage}></div>
        <div className={styles.filmDesc}>
          <div className={styles.filmTitle}>{this.props.film.title}</div>
          <div className={styles.filmDirector}>{this.props.film.director}</div>
        </div>
        <div className={styles.hasWatchedContainer}>
          <input type="checkbox" />
          <div 
            className={this.state.checked ? styles.hasWatchedChecked : styles.hasWatchedUnchecked}
            onClick={() => this.switchCheckedState()}
          >
            {this.state.checked ? <Tick /> : null}
          </div>
        </div>
      </div>
    )
  }
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      films: [],
      genres: []
    };
  }

  
  addFilmToState(filmJson) {
    console.log(filmJson)
    let mappedResponse = filmJson.map((v) => this.filmResponseMapper(v))
    this.setState({
      films: mappedResponse
    })
  }
  
  filmResponseMapper(filmResponse) {
    return {
      title: filmResponse.title,
      director: filmResponse.directors[0].fullName,
      hasWatched: filmResponse.hasWatched,
      id: filmResponse.id
    }
  }
  
  handleAllFilmsClick() {
    fetch("http://localhost:8000/", {
      "method": "GET",
      "content-type": "application/json",
    }
    )
    .then(response => response.json())
    .then(response => this.addFilmToState(response))
    .catch(error => console.log(error))
  }  

  handleGetGenres() {
    fetch("http://localhost:8000/genres", {
      "method": "GET",
      "content-type": "application/json",
    }
    )
    .then(response => response.json())
    .then(response => this.setState({genres: response, films: []}))
    .catch(error => console.log(error))
  }  

  // handleAllFilmsClick() {
  //   this.setState({
  //     films:[
  //       {title: "Parix, Texas", director: "Wim Wenders", hasWatched: true},
  //       {title: "Kill Bill Vol. 1", director: "Quentin Tarentino", hasWatched: false},
  //       // {title: "Goodfellas", director: "Martin Scorcese"},
  //       // {title: "The Doors", director: "Oliver Stone"},
  //       // {title: "Avengers: End Game", director: "Blah Blah"},
  //       // {title: "You've Got Mail", director: "Blah Blah"},
  //       // {title: "Parix, Texas", director: "Wim Wenders"},
  //       // {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
  //       // {title: "Goodfellas", director: "Martin Scorcese"},
  //       // {title: "The Doors", director: "Oliver Stone"},
  //       // {title: "Avengers: End Game", director: "Blah Blah"},
  //       // {title: "You've Got Mail", director: "Blah Blah"},
  //       // {title: "Parix, Texas", director: "Wim Wenders"},
  //       // {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
  //       // {title: "Goodfellas", director: "Martin Scorcese"},
  //       // {title: "The Doors", director: "Oliver Stone"},
  //       // {title: "Avengers: End Game", director: "Blah Blah"},
  //       // {title: "You've Got Mail", director: "Blah Blah"},
  //       // {title: "Parix, Texas", director: "Wim Wenders"},
  //       // {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
  //       // {title: "Goodfellas", director: "Martin Scorcese"},
  //       // {title: "The Doors", director: "Oliver Stone"},
  //       // {title: "Avengers: End Game", director: "Blah Blah"},
  //       // {title: "You've Got Mail", director: "Blah Blah"},
  //     ]})
  // }

  resetState() {
    this.setState({films:[]})
  }

  render () {
    console.log("App")
    let grid;
    if (this.state.films.length > 0) {
      grid = <div id={styles.resultsFilmGrid}> 
        { this.state.films.map((v, i) => {
          return (
            <Film film={v} key={i}/>
          )
        })}
      </div>
    } else if (this.state.genres.length > 0) {
      grid = <div id={styles.resultsSmallSelectionGrid}> 
        { this.state.genres.map((v, i) => {
          return (
            <div className={styles.genre} >{v}</div>
          )
        })}
      </div>
    }

    return (
      <div>
        <h1 onClick={() => this.resetState()}>What film should I watch?</h1>
        <SearchBar />
        <Navigation 
          handleClick={() => this.handleAllFilmsClick()}
          handleGetGenres={() => this.handleGetGenres()}
        />
        <div id={styles.resultsContainer}> 
          {grid}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);