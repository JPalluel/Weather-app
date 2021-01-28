
//getting element from html
const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.getElementById('messageOne');


messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault() //prevent the browser to refresh automatically on submit
    const location = search.value;
    messageOne.textContent = 'Loading...';

    fetch("/weather?address="+ location)
    .then(response => response.json())
    .then( data => {
        if(data.error){
            messageOne.textContent = " "
            messageOne.textContent = data.error
        } else if (data.forecast === undefined){
            messageOne.textContent = "Location unknown";
        } else{
            messageOne.textContent = "The temperature in " + location + " is " + data.forecast + " degrees"
        }
    })
})