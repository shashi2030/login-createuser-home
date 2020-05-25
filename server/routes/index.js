var express = require('express');
var router = express.Router();

router.post('/users', function(req, res){
    var username = res.body.username;
    var password = res.body.password;
    var name = res.body.name;

    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.name = name;

    newUser.save(function(err, saveUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        
        return res.status(200).send();
    })
})