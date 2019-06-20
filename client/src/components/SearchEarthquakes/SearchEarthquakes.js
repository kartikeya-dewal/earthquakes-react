import React, { Component } from 'react';

class SearchEarthquakes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      minMagnitude: "",
      maxMagnitude: "",
      hasTsunami: false,
      radius: "",
      fromDate: Date,
      toDate: Date
    }
  }

  handleChange = (event) => {
    const field = event.target.name;

    this.setState({
      [field]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Create backend methods to save created events
    alert("Will be Saved in a little bit :)")
  }

  render() {
    return (
      <div>
        <form className="text-left" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter location"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Magnitude Range</label>
            <input
              type="text"
              className="form-control"
              placeholder="Minumun magnitude"
              name="minMagnitude"
              value={this.state.minMagnitude}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>to </label>
            <input
              type="text"
              className="form-control"
              placeholder="Maximum magnitude"
              name="maxMagnitude"
              value={this.state.maxMagnitude}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-check form-check-inline">
            <label>Has Tsunami </label>
            <input
              type="checkbox"
              className="form-control"
              placeholder="Did tsunami occur"
              name="hasTsunami"
              value={this.state.hasTsunami}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Radius</label>
            <input
              type="text"
              className="form-control"
              placeholder="Radius"
              name="radius"
              value={this.state.radius}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="From date"
              name="fromDate"
              value={this.state.fromDate}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>to </label>
            <input
              type="date"
              className="form-control"
              placeholder="To date"
              name="toDate"
              value={this.state.toDate}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchEarthquakes;