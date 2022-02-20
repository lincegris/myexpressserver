const mongoose = require("../bin/mongodb")
const errorMessage = require("../util/errorMessage")
//Creacion schema
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        minlength:[3,errorMessage.GENERAL.minlength]
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
    },
    price:{
        type: Number,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        min:1,
        get: function(value){
            return value*1.21
        }
    },
    quantity:{
        type: Number,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        min:1,
        max:10
    },
    deleted:{
        type: Boolean,
        default:false
    },
    status:{
        type:String,
        required:true,
        enum:["sin_stock","roto","nuevo"]
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    }
})
productSchema.virtual("price_currency").get(function(){
    return "$ "+this.price
})
productSchema.set("toJSON",{getters:true,virtuals:true})

//Creacion modelo (Clase -> POO)
module.exports = mongoose.model("products",productSchema)