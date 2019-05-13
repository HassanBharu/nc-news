exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};


exports.handle400 = ((err, req, res, next) => {
  const errRef = ['22P02', '23503', '42703']

  if (errRef.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' })
  } else next(err)
})

exports.handle404 = ((err, req, res, next) => {
  const psqlErr = ['23502']

  if (psqlErr.includes(err.code)) {
    res.status(404).send({ msg: 'id not found' })
  } else next(err)

})