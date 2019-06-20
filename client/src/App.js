import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import SearchEarthquakes from './components/SearchEarthquakes/SearchEarthquakes';
import MapContainer from './components/MapContainer/MapContainer';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const testQuery = gql`
{
	earthquakesInRadius(latitude: -122.8231667, longitude: 38.807, radius: 200.0){
    latitude
    longitude
  }  
}
`;

client.query({
  query: testQuery
}).then((res => console.log(res)));

class App extends Component {
  state = { users: [] }

  render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}

export default App;