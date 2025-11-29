const express = require('express');
const router = express.Router();
const projects = require('../controllers/projectController');
const upload = require('../middlewares/upload');
const { isLogged } = require('../middlewares/authMiddleware');

router.get('/', isLogged, projects.list);
router.get('/add', isLogged, projects.add);

router.post(
    '/add',
    upload.fields([
        { name: 'projectImage', maxCount: 1 },
        { name: 'projectFile', maxCount: 1 }
    ]),
    isLogged,
    projects.create
);

router.get('/delete/:id', isLogged, projects.delete);

module.exports = router;
