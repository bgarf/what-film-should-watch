
import ReactDOM from 'react-dom';
import React from 'react';
import styles from './css/index.css'


class SearchBar extends React.Component {
  render () {
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
     return (
        <div className={styles.navbar}>
        <a href="#" onClick={() => this.props.handleClick()}>All Films</a>
        <a className={styles.centre} href="#">Pick A Genre</a>
        <a href="#">Ratings</a>
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

  handleClick() {
    this.setState({films:["film 1", "film 2", "film 3"]})
  }

  render () {
    return (
      <div>
        <h1>What film should I watch?</h1>

        <SearchBar />

        <Navigation handleClick={() => this.handleClick()}/>

        <div id="results"> 
          { this.state.films.map((v, i) => {
            return <h1>{v},{i}</h1>
          })}
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);