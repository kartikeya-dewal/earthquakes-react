import React, { Component } from 'react';
import './App.css';
import SearchEarthquakes from './components/SearchEarthquakes/SearchEarthquakes';
import MapContainer from './components/MapContainer/MapContainer';

class App extends Component {
  state = { users: [] }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <h2>Search Earthquakes</h2>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-3">
              <SearchEarthquakes />
            </div>
            <div className="col-md-9">
              <MapContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;