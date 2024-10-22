const controllers = require('../controllers/index');
const router = require('express').Router();
// const  auth  = require('../utils/auth');

router.get('/', controllers.claim.get);

// router.post('/', auth(), controllers.claim.post);

// router.put('/:id', auth(), controllers.claim.put);

// router.delete('/:id', auth(), controllers.claim.delete);

module.exports = router;