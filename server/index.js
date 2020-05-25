var express = require('express');
var bodyParser =  require('body-parser');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var config = require('./config');
var setupController = require('./controllers/setupController');

var port = process.env.PORT || 4000;
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (req, res) => {

    res.send('service is up and ruunig at port : ' + port);
}
)

// app.set('view engine', 'ejs');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.getDBConnectionString(),{ useNewUrlParser: true,useUnifiedTopology: true });
setupController(app);


app.listen(port);