const Router = require('koa-router');
const router = new Router();
const course_controller = require('./../../app/controllers/course_controller');

router.post('/course', course_controller.getCourse);
router.post('/publish', course_controller.publishCourse);
router.post('/update', course_controller.updateCourse);
router.post('/delete', course_controller.deleteCourse);

module.exports = router;