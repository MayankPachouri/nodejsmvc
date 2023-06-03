const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
const path = require('path')
// Setup server port
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");
//Routes
app.use("/web", require("./src/routes/loginroutes"));
// For API
// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')
// using as middleware
app.use('/api/v1/employees', employeeRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});