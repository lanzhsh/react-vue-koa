const Router = require('koa-router');
const router = new Router();
const user_controller = require('./../../app/controllers/user_controller');

router.post('/register', user_controller.register);

module.exports = router;