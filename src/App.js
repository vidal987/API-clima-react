import React, {Fragment, useState, useEffect} from 'react';
//Fragment - serve para colocar um elemnto vazio sem a necessidade de usar uma div
import axios from 'axios';

function App() {
  //usuario aprovou o uso da location 
  const [location, setLocation] = useState(false);

  //State weather usado para guardar os dados que vem da API
  const[weather,setWeather] = useState(false);

  //fuction expressa responsável por chamar a API
  //chamada assincrona -async
  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });

    setWeather(res.data);
  }

  //executando assim que o app for montado
  useEffect(() => {
    //pedir autorização para o usuario de sua localização
    navigator.geolocation.getCurrentPosition((position) =>{
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  //Exibir mensagem caso o usuario não permita a sua localização
  if(location === false){
    return (
      <Fragment>
        Você precisa habilitar a localização no browser
      </Fragment>
    )
  } else if (weather === false) {
  return (
    <Fragment>
      Carregando o clima...
    </Fragment>
  )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura mínima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']}hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }


    
}

export default App;
