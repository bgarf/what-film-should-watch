import React, { useState } from 'react';
import styles from '../css/index.css';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import { Film } from './Film';

export function App() {
  console.log("App");
  const [films, setFilms] = useState([])
  const [genres, setGenres] = useState([])

  const addFilmToState = (filmJson) => {
    console.log(filmJson);
    let mappedResponse = filmJson.map((v) => filmResponseMapper(v));
    setFilms(mappedResponse);
  }

  const handleAllFilmsClick = () => {
    fetch("http://localhost:8000/", {
      "method": "GET",
      "content-type": "application/json",
    }
    )
    .then(response => response.json())
    .then(response => addFilmToState(response))
    .catch(error => console.log(error));
  }

  const handleGetGenres = () => {
    setFilms([])
    fetch("http://localhost:8000/genres", {
      "method": "GET",
      "content-type": "application/json",
    }
    )
    .then(response => response.json())
    .then(response => {
      setGenres(response) 
    })
    .catch(error => console.log(error));
  }

  // const handleAllFilmsClick = () => {
  //   setFilms(
  //     [
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
  //     ]
  //   )
  // }

  const resetState = () => {
    setFilms([])
    setGenres([])
  }

    
  let grid;
  // TODO: The grid should be a separate component
  if (films.length > 0) {
    grid = (<div id={styles.resultsFilmGrid}>
      {films.map((v, i) => {
        return (
          <Film film={v} key={i} />
        );
      })}
    </div>);
  } else if (genres.length > 0) {
    grid = (<div id={styles.resultsSmallSelectionGrid}>
      {genres.map((v, i) => {
        return (
          <div className={styles.genre}>{v}</div>
        );
      })}
    </div>);
  }

  return (
    <div>
      <h1 onClick={() => resetState()}>What film should I watch?</h1>
      <SearchBar />
      <Navigation
        handleClick={() => handleAllFilmsClick()}
        handleGetGenres={() => handleGetGenres()} />
      <div id={styles.resultsContainer}>
        {grid}
      </div>
    </div>
  );
}

function filmResponseMapper(filmResponse) {
  return {
    title: filmResponse.title,
    director: filmResponse.directors[0].fullName,
    hasWatched: filmResponse.hasWatched,
    id: filmResponse.id
  };
}