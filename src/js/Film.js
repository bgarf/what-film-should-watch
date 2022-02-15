import React, { useState } from 'react';
import styles from '../css/index.css';

function Tick() {
  return (<svg><polyline points="20 6 9 17 4 12" /></svg>);
}

export function Film(props) {
  console.log("Film");
  const [checked, setChecked] = useState(props.film.hasWatched);
  
  const handleHasWatchedSelection = (checkedNewValue) => {
    fetch(`http://localhost:8000/film/watched?id=${props.film.id}&watched=${checkedNewValue}`, {
      "method": "POST",
      "content-type": "application/json",
    }
    ).catch(error => console.log(error));
  }

  const switchCheckedState = () => {
    let checkedNewValue = checked ? false : true;
    setChecked(checkedNewValue);
    handleHasWatchedSelection(checkedNewValue);
  }

  return (
    <div className={styles.film}>
      <div className={styles.filmImage}></div>
      <div className={styles.filmDesc}>
        <div className={styles.filmTitle}>{props.film.title}</div>
        <div className={styles.filmDirector}>{props.film.director}</div>
      </div>
      <div className={styles.hasWatchedContainer}>
        <input type="checkbox" />
        <div
          className={checked ? styles.hasWatchedChecked : styles.hasWatchedUnchecked}
          onClick={() => switchCheckedState()}
        >
          {checked ? <Tick /> : null}
        </div>
      </div>
    </div>
  );
}
