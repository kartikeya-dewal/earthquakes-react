import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import SearchEarthquakes from './components/SearchEarthquakes';
import MapComponent from './components/MapComponent';
import { serverUri } from './config';

const client = new ApolloClient({
  uri: serverUri
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='App'>
          <div className='container-fluid h-100'>
            <div className='row h-100'>
              <div className='col-md-3'>
                <SearchEarthquakes />
              </div>
              <div className='col-md-9'>
                <MapComponent />
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
