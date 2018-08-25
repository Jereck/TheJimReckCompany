const   express     = require('express'),
        bodyParser  = require('body-parser'),
        nodemailer  = require('nodemailer'),
        
        port = process.env.PORT || 3050,
        app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/send', (req, res) => {
    
});

app.listen(port, () => {
    console.log("Server is running on: " + port);
});