import mongoose from "mongoose";
import {Role} from "../_helpers/role.js"

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    role: {
        type: [String],
        enum: Object.keys(Role),
        default:Role.User
    }
},{timestamps: true})

export default mongoose.model("Airbnb_Users", UserSchema);