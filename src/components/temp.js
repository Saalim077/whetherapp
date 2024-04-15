// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=ff4bd6454acfac8b60db0e095f7a084e
import React, {useState, useEffect} from 'react';
import Weatherinfo from './weatherinfo';
import "./style.css";

const Temp = () => {

    const [searchValue, setSearchValue] = useState("Delhi");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () =>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ff4bd6454acfac8b60db0e095f7a084e`;
            let res = await fetch(url);
            let data = await res.json();
            console.log(data);
            
            const {temp, humidity, pressure } = data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp, 
                humidity, 
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getWeatherInfo();
      },);
    
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="text"
                        placeholder='search...'
                        autoFocus
                        id="search"
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className='searchButton' type='button' onChange={getWeatherInfo}>Search</button>
                </div>
            </div>

            {/* temp card here */}
            <Weatherinfo {...tempInfo}/>
        </>
    )
}

export default Temp;