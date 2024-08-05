import countriesJson from "../countries.json";
import {useState} from "react";

const Selector = () =>{  
    const [country,setCountry]=useState("");
    const getCountryData =()=>{
        fetch(`https://monotein-books.vercel.app/api/corona-tracker/country/${country}`)
        .then(res =>res.json())
        .then(data=>console.log(data))
    }
    return(
        <div>
            <select onChange={(e)=>setCountry(e.target.value)}>
                <option>Select A Country</option>
                {countriesJson.map((country,index)=>
                    <option key={index} value={country.Slug}>{country.Country}</option>
                )}
            </select>
            <button onClick={getCountryData}>GetData</button>
        </div>
    );
};

export default Selector;