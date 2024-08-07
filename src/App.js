import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TopPage from './pages/TopPage';
import './App.css';
import countriesJson from './countries.json';
import WorldPage from "./pages/WorldPage";

function App() {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState({
    date: "",
    newConfirmed: "",
    totalConfirmed: "",
    newRecovered: "",
    totalRecovered: "",
  });
  const [allCountriesData, setAllCountriesData] = useState([]);

  // 全ての国のデータを取得する関数
  const getAllCountriesData = () => {
    fetch("https://monotein-books.vercel.app/api/corona-tracker/summary")
      .then(res => res.json())
      .then(data => setAllCountriesData(data.Countries))
      .catch(error => console.error("Error fetching all countries data:", error));
  };

  useEffect(() => {
    getAllCountriesData();
  }, []);

  const getCountryData = () => {
    setLoading(true);
    if (country) {
      fetch(`https://monotein-books.vercel.app/api/corona-tracker/country/${country}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 1) {
            setCountryData({
              date: data[data.length - 1].Date,
              newConfirmed: data[data.length - 1].Confirmed - data[data.length - 2].Confirmed,
              totalConfirmed: data[data.length - 1].Confirmed,
              newRecovered: data[data.length - 1].Recovered - data[data.length - 2].Recovered,
              totalRecovered: data[data.length - 1].Recovered
            });
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching country data:", error);
          setLoading(false);
        });
    } else {
      console.error("No country selected");
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <TopPage 
              countriesJson={countriesJson} 
              setCountry={setCountry} 
              getCountryData={getCountryData} 
              countryData={countryData} 
              loading={loading}
            />
          } 
        />
        <Route 
          path="/world" 
          element={
            <WorldPage allCountriesData={allCountriesData} />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
