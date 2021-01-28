const path = require('path');
const express = require('express'); // express is a function that we're gonna call to create a new express app
const hbs = require('hbs');
const get_weather = require('./utils/get_weather');
const port = process.env.PORT || 3000


console.log(__dirname); //print the path of the current directory and file

const app = express(); // const that store our app

//define Paths express config
const publicDirectoryPath = path.join(__dirname, '../public');
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

app.listen(port, () => {// starts the server and has it listen on a specific port
    console.log(`Server is up on port ${port}`);
})



