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

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message:</h3>
        <p>${req.body.message}</p>
    `;

    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'chi-node44.websitehostserver.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'info@jimreck.com', // generated ethereal user
                pass: 'Thunder1011!' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Nodemailer Contact" <info@jimreck.com>', // sender address
            to: 'info@jimreck.com', // list of receivers
            subject: 'Contact Request', // Subject line
            text: 'Hello world?', // plain text body
            html: output
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render("index");
        });
    });
});

app.listen(port, () => {
    console.log("Server is running on: " + port);
});