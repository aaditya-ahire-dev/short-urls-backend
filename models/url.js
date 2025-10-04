import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    shortId :{
        type : String ,
        required : true,
        Unique : true
    },
    OriginalURL :{
        type : String ,
        required : true,
        Unique : true
    },
    visitHistory : [{timestamp : {type : Number} }],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    }
},{timestamps : true })

const URL = mongoose.model('urls',UrlSchema)

export default URL;