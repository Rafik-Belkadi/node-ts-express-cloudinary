import mongoose, { Model, Schema } from 'mongoose'

export interface User {
    email: String,
    password: String,
    name: String,
    photo: String
}

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    name: String,
    photo: {
        type: String,
        required: false
    }
})

const UserModel = mongoose.model<User>('users', UserSchema);


export default UserModel;