import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { EARTHQUAKES_QUERY } from "./schema";
import SearchEarthquakes from './components/SearchEarthquakes';
import MapContainer from './components/MapContainer';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

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
                <Query query={EARTHQUAKES_QUERY}>{({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return <p>{error.message}</p>;
                  const { earthquakes } = data;
                  return earthquakes.map(quake => <p key={quake.id}>{quake.feature.place}</p>)
                }}
                </Query>
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