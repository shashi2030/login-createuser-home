var axios = require('axios');
var Register = require('../models/Registration');
var Users = require('../models/Users');
var Character  =require('../models/Character');
const { Seeder } = require('mongo-seeding');

const config = {
    database: 'mongodb://localhost:27017/mydb',
    dropDatabase: true,
  };
const seeder = new Seeder(config);

// sign up page
module.exports = function (app) {
    app.post('/register', function (req, res) {

        var userRegister = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
        };
        Users.create(userRegister, function (err, result) {
            if (err) {
                res.status(401).json({ error: 'Unauthorized user' });
            }else{
                res.status(200).json(result);
            }
        })
    });

    // get all user list
    app.get('/users', function (req, res) {
        return Users.find({}, (err, result) => {
            res.status(200).json(result);
        }
        );

    });

    // get all character
    app.get('/character', function (req, res) {
        const url = 'https://rickandmortyapi.com/api/character/';
        let data;
        axios.get(url).then(result=>{
            if(result.status === 200){
                data = result.data.results;
                console.log(data.length)
                seeder.import(data, { dropDatabase: false, dropCollections: true }).then(dbData => {
                    console.log('preloading Test Data');
                    res.send(dbData)
                    }).catch(err => {
                    console.log(err);
                    });
                   
                // res.send(data)
            }            
        });
    });

    // login
    app.post('/login', function (req, res) {

        var userQuery = {
            username: req.body.username,
            password: req.body.password
        };
        Users.findOne(userQuery, function (err, result) {
            if (err) {
                res.status(500).json({ error: 'Intewrnal server error' });
            }

            if (result === null) {
                res.status(401).json({ error: 'Unauthorized user' }); 
                       
            } else {

                res.status(200).json(result);
            }

        })
    })
}