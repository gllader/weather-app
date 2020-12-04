import { useState } from 'react';
import axios from 'axios';

import City from './components/City';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import dotenv from 'dotenv';
dotenv.config();

function App() {
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState('');

  const handleFilterChange = (e) => {
    const str = e.target.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w-]+/g, '+');
    setCityName(str.toLowerCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    (async () => {
      try {
        const { data } = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );
        setCityData(data);
      } catch (error) {
        toast.error('City not found!');
        console.log(error);
      }
    })();
  };

  /*eslint-disable*/
  return (
    <div className="container">
      <div className="content">
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <label htmlFor="cityName">Enter a city name:</label>
            <input type="text" name="cityName" onChange={handleFilterChange} />
          </div>
        </form>
        {cityData != 0 && <City cityData={cityData}></City>}
        {
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        }
      </div>
    </div>
  );
}

export default App;