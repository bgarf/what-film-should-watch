import React, { useEffect, useState } from 'react';
import styles from '../css/index.css';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import { Grid } from './Grid';
import { testFilms } from './test-utils';

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
    // setFilms(testFilms)
  }

  useEffect(() => {
    retrieveGenres()
  }, [])

  const retrieveGenres = () => {
    // fetch("http://localhost:8000/genres", {
    //   "method": "GET",
    //   "content-type": "application/json",
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     setGenres(response)
    //   })
    //   .catch(error => console.log(error));
    setGenres(["Action", "Science Fiction"])
  }

  const resetState = () => {
    setFilms([])
  }

  return (
    <div>
      <h1 onClick={() => resetState()}>What film should I watch?</h1>
      <SearchBar />
      <Navigation
        genres={genres}
        handleClick={() => handleAllFilmsClick()}
      />
      <div id={styles.resultsContainer}>
        <Grid
          films={films}
        />
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