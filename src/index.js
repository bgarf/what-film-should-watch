
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
        <a className={styles.centre} href="#">Pick A Genre</a>
        <a href="#">Ratings</a>
    </div>
    )
  }
}
  
class Film extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  switchCheckedState() {
    console.log("clicked")
    console.log(this.state.checked)
    this.state.checked ? this.setState({checked: false}) : this.setState({checked: true})
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
      films: []
    };
  }

  
  addFilmToState(filmJson) {
    let mappedResponse = filmJson.map((v) => this.filmResponseMapper(v))
    this.setState({
      films: mappedResponse
    })
  }
  
  filmResponseMapper(filmResponse) {
    return {title: filmResponse.title, director: filmResponse.directors[0].fullName}
  }
  
  // handleClick() {
  //   fetch("http://localhost:8000/", {
  //     "method": "GET",
  //     "content-type": "application/json",
  //   }
  //   )
  //   .then(response => response.json())
  //   .then(response => this.addFilmToState(response))
  //   .catch(error => console.log(error))
  // }

  handleClick() {
    this.setState({
      films:[
        {title: "Parix, Texas", director: "Wim Wenders"},
        {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
        {title: "Goodfellas", director: "Martin Scorcese"},
        {title: "The Doors", director: "Oliver Stone"},
        {title: "Avengers: End Game", director: "Blah Blah"},
        {title: "You've Got Mail", director: "Blah Blah"},
        {title: "Parix, Texas", director: "Wim Wenders"},
        {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
        {title: "Goodfellas", director: "Martin Scorcese"},
        {title: "The Doors", director: "Oliver Stone"},
        {title: "Avengers: End Game", director: "Blah Blah"},
        {title: "You've Got Mail", director: "Blah Blah"},
        {title: "Parix, Texas", director: "Wim Wenders"},
        {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
        {title: "Goodfellas", director: "Martin Scorcese"},
        {title: "The Doors", director: "Oliver Stone"},
        {title: "Avengers: End Game", director: "Blah Blah"},
        {title: "You've Got Mail", director: "Blah Blah"},
        {title: "Parix, Texas", director: "Wim Wenders"},
        {title: "Kill Bill Vol. 1", director: "Quentin Tarentino"},
        {title: "Goodfellas", director: "Martin Scorcese"},
        {title: "The Doors", director: "Oliver Stone"},
        {title: "Avengers: End Game", director: "Blah Blah"},
        {title: "You've Got Mail", director: "Blah Blah"},
      ]})
  }

  resetState() {
    this.setState({films:[]})
  }

  render () {
    console.log("App")
    return (
      <div>
        <h1 onClick={() => this.resetState()}>What film should I watch?</h1>
        <SearchBar />
        <Navigation handleClick={() => this.handleClick()}/>
        <div id={styles.resultsContainer}> 
          <div id={styles.resultsGrid}> 
            { this.state.films.map((v, i) => {
              return (
                <Film film={v} key={i}/>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);