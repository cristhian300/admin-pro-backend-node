const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    enable: {
        type: Boolean,
        default: true
    },

});

//solo para configurar que mostrar y como mostrar en la solicitud
ProductSchema.method('toJson', function() {
    const {__v , _id,...object} = this.toObject();
    object.uid =_id;
    return object;
})


module.exports = model("Product", ProductSchema)