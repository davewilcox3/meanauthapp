const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport-jwt');
const marklogic = require('marklogic');
const config = require('./config/database')

//Database Connection
const db = marklogic.createDatabaseClient(config);
const qb = marklogic.queryBuilder;

//Test Database Connection
//db.documents.query(qb.where(qb.term('text'))).result().then(documents => {
//	    console.log(documents);
//	  }).catch((err) => console.log(err));

const app = express();

const users = require('./routes/users');

//Port Numnber
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser Middleware
app.use(bodyParser.json())

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () => {
	console.log('Server started on port: '+port);
});