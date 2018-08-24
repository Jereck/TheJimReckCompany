const express = require('express'),

    port = process.env.PORT || 3050,
    app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log("Server is running on: " + port);
});