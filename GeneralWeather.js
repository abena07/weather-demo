import React,{useState} from 'react'
import axios from "axios"
import {v1 as uuid} from "uuid"

function GeneralWeather() {
    const[country, setCountry]=useState("")
    const [city,setCity]=useState("")
    const[weather,setWeather]=useState(null)
    const[search, setSearch]=useState([])

    const handleCountryInput=(event)=>{
        setCountry(event.target.value)
    }
    
    const handleCityInput=(event)=>{
        setCity(event.target.value)
    }

    const saveWeatherData = (query, result) => {
        const history = localStorage.getItem("searchHistory") ? JSON.parse(localStorage.getItem("searchHistory")) : []

        const data = {
            query: query,
            result: result
        }
        
        if (history.length < 5) {
            history.push(data)
        } else if (history.length > 5) {
            history.unshift()
            history.push(data)
        }
        
        localStorage.setItem("searchWeather", JSON.stringify(history))
    }

    const handleSearch=(event)=>{
        event.preventDefault()
        
    if(country&&city)
    {axios.get(`http://api.weatherstack.com/current?access_key=b6f07c666ca63011388c4ae9702ed6c6&query=${country},${city}`)
        .then((res)=> {
            console.log(res)
            setWeather(res.data)
            
            setSearch([...search,res.data],{
               id:uuid(),
               country:country,
               city:city}
                )
            setCountry("")
            setCity("")

        })

        .catch((err)=>{
            console.error(err)

                
        })
       
            
    }
    }
   
         

    return (

        <div className="search">
            <input type="text" placeholder="country" onChange={handleCountryInput}></input>
            <input type="text"placeholder="city" onChange={handleCityInput}></input>
             <button onClick={handleSearch}>Search Now!</button>
         
            <p>Are you looking for {''} {city} {''}in{country}{''}?</p>





            {weather&&(
                <div className="searchHistory">
                     <h1>{weather.name}</h1> 
                   <h1> {weather.country}</h1>
                    <h1>{weather.weather_descriptions}</h1>
                    <h1>{weather.temperature}</h1>
                    </div>)}

             <ul>
                {search.map((search=>(
                    
                <li key={search.id}>Currently in {''} {search.location.name} {''}
                it is{''} {search.current.weather_descriptions} and the temperature is {''} {search.current.temperature} {''}degrees celsius</li>)))}
             </ul> 
        </div>
    )
}

export default GeneralWeather
