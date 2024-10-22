// const { auth } = require('../utils/index');
const router = require('../routes/index.js');

module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/claim',router.claim);

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};