import React from 'react';
import styles from '../css/index.css';


export function Navigation(props) {
    console.log("Nav")
    return (
        <div className={styles.navbar}>
            <a href="#" onClick={() => props.handleClick()}>All Films</a>
            <a className={styles.centre} href="#" onClick={() => props.handleGetGenres()}>Pick A Genre</a>
            <a href="#">Ratings</a>
        </div>
    )
}
