const express = require('express');
const path = require('path');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
   
// Used to serve static files from the public folder.
// Use allows you to add middleware to the request handling chain.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/dancers', require('./routes/api/dancers'));

// The server is started on port 5000, or the port specified in the environment variable PORT.
// If no port is specified, the server is started on port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

