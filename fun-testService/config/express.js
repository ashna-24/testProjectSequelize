const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const routes = require('../api/routes');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.get("/api/health-check", (req, res)=> {
    res.status(202).send({"isWorking": "Done"});
});
app.use('/api/v1', routes);

module.exports = app;