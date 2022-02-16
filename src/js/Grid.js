import React from "react"
import { Film } from "./Film";
import styles from "../css/index.css"

export function Grid(props) {
    let grid;

    if (props.films.length > 0) {
        grid = (
            <div id={styles.resultsFilmGrid}>
                {
                    props.films.map((v, i) => {
                        return (
                            <Film film={v} key={i} />
                        );
                    })
                }
            </div>
        );
    }

    return (
        <div>
            { grid }
        </div>
    )
}