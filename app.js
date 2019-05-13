const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500, handle404, handle400 } = require('./errors');
const cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());


app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use((err, req, res, next) => {

    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    } else next(err)
})

app.use(handle400);

app.use(handle404)

app.use(handle500);


module.exports = app;
