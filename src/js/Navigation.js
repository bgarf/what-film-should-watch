import React from 'react';
import styles from '../css/index.css';


function Dropdown(props) {
    return (
        <div id={styles.dropdown}>
            {
                props.genres.map(element => {
                    return (
                        <div className={styles.dropdownValues}>
                            // TODO: Can this be turned into a select with options so I can scroll? 
                            // TODO: Need to add onClick -> call film service and get films by genre selected
                            <a value={element.toLowerCase()} href="#">{element}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export function Navigation(props) {
    console.log("Nav")

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarItem}>
                <a href="#" onClick={() => props.handleClick()}>All Films</a>
            </div>
            <div className={`${styles.navbarItem} ${styles.centre}`}>
                <div className={`${styles.dropdownHeader}`}>
                    <a href="#">Pick A Genre</a>
                </div>
                <Dropdown 
                    genres={props.genres}
                />
            </div>
            <div className={styles.navbarItem}>
                <a href="#">Ratings</a>
            </div>

        </div>
    )
}

