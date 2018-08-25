const   express     = require('express'),
        bodyParser  = require('body-parser'),
        nodemailer  = require('nodemailer'),
        xoauth2         = require('xoauth2'),

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
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
            <p>Name: ${req.body.message}</p>
        </ul>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'jakereck@gmail.com',
                clientId: '645131124041-m4fn94kcevmfn8796juqhg3e0lrm57i9.apps.googleusercontent.com',
                clientSecret: 'qhoFXuXj_7cZTmxPfWcrKctB',
                refreshToken: '1/Mip28I-TqRqmJQS4BKHef6rQcxXMdYBocnImc8nGl9g',
            })
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.body.email, // sender address
        to: 'jakereck@gmail.com', // list of receivers
        subject: 'Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.render('index', {msg: 'Email has been sent'});
    });
});

app.listen(port, () => {
    console.log("Server is running on: " + port);
});