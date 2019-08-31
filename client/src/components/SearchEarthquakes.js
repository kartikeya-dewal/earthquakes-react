import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import logo from '../logo.png';
import EarthquakesList from './EarthquakesList';
import { GoogleApiWrapper } from 'google-maps-react';
import { googleApiKey } from '../config';
import Autocomplete from 'react-google-autocomplete';
import event from './utils/Event';

class SearchEarthquakes extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    date.setMonth(date.getMonth() - 2);
    this.state = {
      location: { name: '', latitude: '', longitude: '' },
      minMagnitude: 6,
      maxMagnitude: 8,
      radius: 300,
      fromDate: date,
      toDate: new Date(),
      isSubmitted: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDateSelect = (field, date) => {
    this.setState({ [field]: date });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.location);
    this.setState({ isSubmitted: true });
  };

  render() {
    return (
      <div>
        <h2>
          <img src={logo} alt='' className='logo' />
          Search Earthquakes
        </h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <Autocomplete
              className='form-control'
              placeholder='Search Places'
              types={['(regions)']}
              onPlaceSelected={place => {
                this.setState({
                  location: {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    name: place.formatted_address
                  }
                });
                event.emit('placeSelected', this.state.location);
              }}
            />
          </div>
          <label>Magnitude Range</label>
          <div className='row'>
            <div className='form-group col-md-5'>
              <input
                type='text'
                className='form-control minMag-input'
                placeholder='Minumun magnitude'
                name='minMagnitude'
                value={this.state.minMagnitude}
                onChange={this.onChange}
              />
            </div>
            <span className='col-md-2'> to</span>
            <div className='form-group col-md-5'>
              <input
                type='text'
                className='form-control'
                placeholder='Maximum magnitude maxMag-input'
                name='maxMagnitude'
                value={this.state.maxMagnitude}
                onChange={this.onChange}
              />
            </div>
          </div>
          <label>Radius ( km )</label>
          <div className='row'>
            <div className='form-group col-md-6'>
              <input
                type='text'
                className='form-control'
                placeholder='Radius'
                name='radius'
                value={this.state.radius}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label>From </label>
              <DatePicker
                className='form-control'
                selected={this.state.fromDate}
                value={this.state.fromDate}
                onChange={value => this.onDateSelect('fromDate', value)}
                dateFormat='dd MMM yyyy'
              />
            </div>

            <div className='form-group col-md-6'>
              <label>To </label>
              <DatePicker
                className='form-control'
                selected={this.state.toDate}
                value={this.state.toDate}
                onChange={value => this.onDateSelect('toDate', value)}
                dateFormat='dd MMM yyyy'
              />
            </div>
          </div>

          <div>
            <button type='submit' className='btn'>
              Search
            </button>
          </div>
        </form>
        <hr />
        <ul>
          {this.state.isSubmitted && <EarthquakesList props={this.state} />}
        </ul>
        {/* <div className='card' key='1'>
            <div className='card-body'>
              <h5 className='card-title'>61km ENE of Namie, Japan</h5>
              <p className='card-text'>Magnitude 6.3</p>
            </div>
          </div>
          <div className='bottom-line'></div>
          <div className='card' key='1'>
            <div className='card-body'>
              <h6 className='card-title'>30km ESE of Ohara, Japan</h6>
              <p className='card-text'>Magnitude 5</p>
            </div>
          </div>
          <div className='bottom-line'></div> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${googleApiKey}`,
  libraries: ['places']
})(SearchEarthquakes);
