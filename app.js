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

// 400 errors 

app.use((err, req, res, next) => {
    console.log(err.code)
    const errRef = ['22P02', '23503', '23502']

    if (errRef.includes(err.code)) {
        res.status(400).send({ msg: 'bad request' })
    } else next(err)
})

// 404 errors
app.use((err, req, res, next) => {
    console.log(err.code)
    const psqlErr = ['42703']

    if (psqlErr.includes(err.code)) {
        res.status(404).send({ msg: 'id not found' })
    } else next(err)

})

app.use(handle500);


module.exports = app;
