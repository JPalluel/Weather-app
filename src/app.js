const path = require('path');
const express = require('express'); // express is a function that we're gonna call to create a new express app
const hbs = require('hbs');
const get_weather = require('./utils/get_weather');


console.log(__dirname); //print the path of the current directory and file

const app = express(); // const that store our app

//define Paths express config
const publicDirectoryPath = path.join(__dirname, '../public');
//const viewPathDirectory = path.join(__dirname,'../directoryname'); template engine allows us to render dynamic pages, express expects a "views" directory if we want to customize name:
const partialsPath = path.join(__dirname, '../partials')


//set up handlebars engine
app.set('view engine', 'hbs'); // set a value for a view engine, value is the name of the template engine module we installed : hbs
//app.set('views', viewPathDirectory); => customize name

hbs.registerPartials(partialsPath)


//set up static directory to serve
app.use(express.static(publicDirectoryPath)); // way to customize your server, link our pubic directory folder, static means they do not change

app.get('', (req, res) => {
    res.render('index', {  //render the page from hbs template engine
        title: "Weather App",
        name: "Juliette"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Juliette'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    
    const adresse = req.query.address;

    get_weather(adresse)
        .then((result) => {
            console.log(result);
            res.send({
                forecast: result,
                address: req.query.address
            })
        })
        .catch((error) => {
            console.log(error);
        })

})

app.listen(3000, () => {// starts the server and has it listen on a specific port
    console.log("Server is up on port 3000");
})



//challenge 1 :
//1- Set up an about route and display a page title
//2- Set up a weather route and dislay a page title
//3- Test your Work!

//challenge 2:
//1- Set up an HTML page for about 
//2- Set up an HTML page for weather
//3- Remove old route handlers
//4- test it!


//challenge 3:
// 1- No address? send back error message
// 2- Address? send back the static JSON: add address property onto JSON which returns the provided address
// 3- test /weather and weather?address=Philadelphia 

// Challenge 4:
// 1- Require get-weather into app.js
// 2- Use the address and the Coordinates to get the forecast
// 3- Send back the real forecast and location 

// app.get('', (req, res) =>{    // here we set up a handler for a get request => takes 2 arg : 1st : the path to set up the handler for, 2nd: the function to run => // 2 arg of the callback () 1: object with  info about the request 2: contains a bunch of methods that allow us to customize what we send back
//      res.send(' Hello Express');                 // what to send back to the requester                    
// });

// app.get('/about', (req, res) =>{
//     res.send('About Us :');
// })

// app.get('/weather', (req, res) =>{
//     res.send('Your weather');
// })