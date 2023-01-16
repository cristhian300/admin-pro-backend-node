
const {Schema , model} =require('mongoose');

const  MedicoSchema = Schema({

    nombre :{
        type:String,
        required:true
    },

     
    img :{
        type:String  
    },
    usuario:{

        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital',
        require:true
    }
    
},{ collection:'medicos'});

//solo para configurar que mostrar y como mostrar
MedicoSchema.method('toJSON',function ( ) {
    const {__v,  ...object} = this.toObject();
     
    return object;
});

//con este expone el modelo
module.exports = model('Medico', MedicoSchema )

