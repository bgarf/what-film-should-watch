
import ReactDOM from 'react-dom';
import React from 'react';
import './css/index.css'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>What film should I watch?</h1>
        <form className="search">
        <div className="search-outer-layer">
          <input id="search-input" type="text" name="search-params"
          placeholder="What type of film..."/>
        </div>
        <input type="submit"/>
        </form>


        <div className="navbar">
        <a className="options" href="#">All Films</a>
        <a className="options centre" href="#">Pick A Genre</a>
        <a className="options" href="#">Ratings</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
