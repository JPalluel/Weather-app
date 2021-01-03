const { response } = require('express');
const fetch = require('node-fetch');

//get location and weather
const get_weather = async(address) => {
  const urlLocation = `https://api.openweathermap.org/data/2.5/weather?q=`+ address + `&units=metric&appid=2821bbc11ac1cfa2119a08ea68a16dbe`;
  
  try {
    const response = await fetch(urlLocation);
    const data =await response.json();
    const forecast = data.main.temp;
    console.log(forecast)
    return forecast;
  } catch (error) {
  console.log("Unable to connect to the location services")
  //console.log(error);
};
}

module.exports = get_weather;



//async is a keyword which denotes that a function is to be executed asynchronously , it returns a promise
//await can be used when calling async functions to wait on the result of an async function to be returned 
// The await keyword is used in an async function to ensure that all promises returned in the async function
// are synchronized, ie. they wait for each other. Await eliminates the use of callbacks in .then() and .catch().
// In using async and await, async is prepended when returning a promise, await is prepended when calling a promise.
// try and catch are also used to get the rejection value of an async function.
