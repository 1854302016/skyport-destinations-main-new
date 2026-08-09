import React, { useState } from 'react';
import './BusModifyForm.css';

const popularCities = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Pune'];

const BusModifyForm = () => {

  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [sourceInput, setSourceInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');

  return (
    <div>
      <div className="busModifysearch-Main">
  <div className="busModifysearch">
    <img
      src="Images/flight_aero.png"
      alt=""
      style={{width: '40px', marginRight:'10px'}}
    />

<div className="busModifysearchinputs" style={{ width: '30%', position: 'relative' }}>
        <label className="busModifylabelstyling">
          City name, Location or Specific bus
        </label>
        <input
          type="text"
          className="busModifyinputstyling"
          placeholder="Enter source city"
          onFocus={() => setShowSourceSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 150)} // allow click
          value={sourceInput}
          onChange={(e) => setSourceInput(e.target.value)}
        />
        {showSourceSuggestions && (
          <div className="busModify-suggestions">
            {popularCities.map((city) => (
              <div
                key={city}
                className="busModify-suggestion-item"
                onClick={() => {
                  setSourceInput(city);
                  setShowSourceSuggestions(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="busModifysearchinputs" style={{ width: '30%', position: 'relative' }}>
        <label className="busModifylabelstyling">
          City name, Location or Specific bus
        </label>
        <input
          type="text"
          className="busModifyinputstyling"
          placeholder="Enter destination city"
          onFocus={() => setShowDestinationSuggestions(true)}
          onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 150)}
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
        />
        {showDestinationSuggestions && (
          <div className="busModify-suggestions">
            {popularCities.map((city) => (
              <div
                key={city}
                className="busModify-suggestion-item"
                onClick={() => {
                  setDestinationInput(city);
                  setShowDestinationSuggestions(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

    <div className="busModifysearchinputs" style={{width: "15%"}}>
      <label className="busModifylabelstyling">Check-In</label>
      <input
        type="date"
        className="busModifyinputstyling"
      />
    </div>

    <div style={{width: "15%"}}>
      <button className="busModifysearch-btn">
        Search
      </button>
    </div>
  </div>


</div>

    </div>
  )
}

export default BusModifyForm
