import mongoose, { Types } from "mongoose"

const GoalSchema = new mongoose.Schema({
    text:{
        type:String
    },
    user:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

export const Goal = mongoose.model('Goal',GoalSchema)