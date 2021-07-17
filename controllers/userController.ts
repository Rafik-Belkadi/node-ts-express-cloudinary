import UserModel, { User } from '../models/UserModel'
import { Request, Response } from 'express'
var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'photomania123',
    api_key: '785983836446748',
    api_secret: 'Ll_OYiBQK31KqIPDI-6AUB7zVBE',
    secure: true
});
import jwt from 'jsonwebtoken'



const key: jwt.Secret =  "shengriha";

export const getUsers = (req: Request, res: Response) => {
    UserModel.find().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json(err)
    })
}

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params
    UserModel.findById(id).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
}

export const createUser = (req: Request, res: Response) => {
    const photo = req.file;
    cloudinary.uploader.upload(photo?.path, (error: any, result: any) => {
        if (error) res.json(error)
        const user: User = { ...req.body, photo: result.url };
        const newUser = new UserModel(user)
        newUser.save().then(user => res.json(user)).catch(err => res.json(err))
    });
}

export const register = (req: Request, res: Response) => {
    const photo = req.file;
    UserModel.findOne({email: req.body.email}).then(u => {
        if(u) {
            res.json({message: "User already exists"})
        } else {
            cloudinary.uploader.upload(photo?.path, (error: any, result: any) => {
                if (error) res.json(error)
                const user: User = { ...req.body, photo: result.url };
                const newUser = new UserModel(user)
                newUser.save().then(user => {
                    jwt.sign(user.email, key, (err, token) => {
                        if (err) {
                            res.json({ err })
                        } else {
                            res.json({ user: user, token })
                        }
                    })
                }).catch(err => res.json(err))
            });
        }
    })
}

export const login = (req: Request, res: Response) => {
    const user: User = req.body
    console.log({user})
    UserModel.findOne({email: user.email}).then(u => {
        console.log({u})
        if(!u) {
            res.json({message: "User does not exist"})
        } else {
            if(user.password != u.password) {
                res.json({message: "Invalid Credentials"})
            } else {
                jwt.sign(u.email, key, (err, token) => {
                    if(err){
                        res.json({err})
                    }else {
                        res.json({user: u, token})
                    }
                })
            }
        }
    })
}

