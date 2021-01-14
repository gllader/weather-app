import React from 'react';

import './style.css';

export default function City({ cityData }) {
  const { name } = cityData;
  const { temp, temp_min, temp_max } = cityData.main;
  const { icon } = cityData.weather[0]
  const {country} = cityData.sys
  return (
    <div className="city-card">
      <div className="card-title">{name},   {country}</div>
      <div className="card-content">
        <div className="icon"><img src={`/icons/${icon}.svg`} alt={icon}/></div>
        <div className="temp">{parseInt(temp)}ºC</div>
      </div>
      <div className="card-footer">
         {parseInt(temp_min)}ºC / {parseInt(temp_max)}ºC
      </div>
    </div>
  );
}
