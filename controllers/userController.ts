import UserModel, { User } from '../models/UserModel'
import { Request, Response } from 'express'
var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'photomania123',
    api_key: '785983836446748',
    api_secret: 'Ll_OYiBQK31KqIPDI-6AUB7zVBE',
    secure: true
});


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