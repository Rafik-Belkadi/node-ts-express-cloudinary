import { Router } from "express";
import { getUserById, getUsers, createUser, register, login } from "../controllers/userController";
var path = require('path');
var appDir = path.dirname(require?.main?.filename);


import multer from 'multer'
// Config 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appDir + '/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toLocaleString() + file.originalname)
    }
})

var upload = multer({ storage: storage })

const initRouter = (router: Router) => {
    router.route('/users').get(getUsers)
        .post(upload.single('photo'), createUser)
    router.route('/users/:id').get(getUserById)

    router.route('/register').post(upload.single('photo'), register)
    router.route('/login').post(login)
}

export default initRouter;
