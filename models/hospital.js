
const {Schema , model} =require('mongoose');

const HospitalSchema = Schema({

    nombre :{
        type:String,
        required:true
    },

     
    img :{
        type:String  
    },
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
    
},{ collection:'hospitales'});

//solo para configurar que mostrar y como mostrar
HospitalSchema.method('toJSON',function ( ) {
    const {__v,  ...object} = this.toObject();
     
    return object;
});

//con este expone el modelo
module.exports = model('Hospital', HospitalSchema )

