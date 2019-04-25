const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());


app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use((err, req, res, next) => {


    if (err.status) {
        console.log(err.status)
        res.status(err.status).send({ msg: err.msg })
    } else next(err)
})

app.use((err, req, res, next) => {
    if (err.code) {
        const errRef = { '22P02': 'bad request' }
        res.status(400).send(errRef[err.code])
    }

    /* if (err.code === '22P02') {
        res.status(400).send({ msg: 'bad request' })
    } */
})


app.use(handle500);


module.exports = app;
