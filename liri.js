// Read and set environment variables
require("dotenv").config();

//Import my npm packages
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

//Import my API keys 
var keys = require('./keys.js');

// Initialize the spotify API client using client id and secret
var spotify = new Spotify(keys.spotify);


//liri taking first parameter/type of command
var command = process.argv[2];
console.log(command);

//liri taking second parameter/query
var commandTwo = process.argv[3];
console.log(commandTwo);

function myIfStatements (command, commandTwo) {

 switch (command) {
    case 'concert-this':
        fireConcert(commandTwo)
        break;
    case 'spotify-this':
        fireSpotify(commandTwo)
        break;
    case 'movie-this':
        fireMovie(commandTwo)
        break;
    case 'do-what-it-says':
        doWhatItSays(commandTwo)
        break;

    default:
    console.log("Sorry, I don't understand that commmand...");
        break;
}   

}

myIfStatements(command, commandTwo);

//functions

//liri getting the concert data
function fireConcert() {

    axios.get("https://rest.bandsintown.com/artists/" + commandTwo + "/events?app_id=codingbootcamp")
        .then(function (res) {

            console.log('Name of Venue: ' + '\n' + res.data[0].venue.name + '\n'
                + 'Country: ' + res.data[0].venue.country + '\n'
                + 'County: ' + res.data[0].venue.city + '\n'
                + 'Date & Time: ' + moment(res.data[0].datetime).format("LLLL"));

        }).catch(function (err) {

            console.log(err);

        })

}

//liri getting the spotify data
function fireSpotify(query) {
    if (!query)
    query = "the sign ace of base";
    // var query = commandTwo || 'the sign ace of base'

    spotify.search({ type: 'track', query: query })

        .then(function (res) {

            console.log('Song Name: ' + commandTwo + '\n'
                + 'Album: ' + res.tracks.items[0].album.name + '\n'
                + 'Artist: ' + res.tracks.items[0].album.artists[0].name + '\n'
                + 'URL: ' + res.tracks.items[0].album.external_urls.spotify);

        })
        .catch(function (err) {

            console.log(err);

        });
}

//liri getting the movie data
function fireMovie() {

    let commandTwo = process.argv.slice(3).reduce((prev, curr) => {
        return prev ? `${prev}+${curr}` : curr;
    }, "") || "Mr Nobody";

    axios.get("http://www.omdbapi.com/?t=" + commandTwo + "&y=&plot=full&tomatoes=true&apikey=trilogy")
        .then(function (res) {

            console.log('Title: ' + res.data.Title + '\n'
                + '----------------------------------' + '\n'
                + 'Released: ' + res.data.Released + '\n'
                + '----------------------------------' + '\n'
                + 'IMDB Rating: ' + res.data.imdbRating + '\n'
                + '----------------------------------' + '\n'
                + 'Rotten Tomatoes Rating: ' + res.data.Ratings[1].Value + '\n'
                + '----------------------------------' + '\n'
                + 'Country: ' + res.data.Country + '\n'
                + '----------------------------------' + '\n'
                + 'Language: ' + res.data.Language + '\n'
                + '----------------------------------' + '\n'
                + 'Plot: ' + res.data.Plot + '\n'
                + '----------------------------------' + '\n'
                + 'Actors: ' + res.data.Actors + '\n'
            );

        }).catch(function (err) {

            console.log(err);

        })

}


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {

        console.log(data, 'data');

        var dataArr = data.split(",");

        console.log(dataArr, 'dataArray');

        myIfStatements(dataArr[0], dataArr[1].trim());
        console.log(dataArr[1]);

        if (err) {
            return console.log(err);
        }

    });

}