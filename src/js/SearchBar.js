import React from 'react';
import styles from '../css/index.css';

export function SearchBar() {
  console.log("Search Bar");
  return (
    <form>
      <input className={styles.searchInput} type="text" name="search-params" placeholder="What type of film..." />
      <input type="submit" />
    </form>
  );
}
