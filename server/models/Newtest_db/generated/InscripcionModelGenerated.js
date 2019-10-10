// Database
import Database from "../../../classes/Database_Newtest_db";
import mongoose, { Schema } from "mongoose";

// Logger
import Logger from "../../../classes/Logger";
import { stringify } from "querystring";
import TurnosModel from "../TurnosModel";

/*
const PersonaSchema = { 
                        Nombre: String,
                        Rut: String
                    };
//*/
const generatedModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
      * inscripcion
      */
    const inscripcionSchema = new mongoose.Schema({
      avaya: {
        type: "String"
      },
      tiempoAsistencia: {
        type: "String"
      },
      /*
      fecha: {type: Date},
      horaIni: {type: String},
      horaFin: {type: String},
      //*/
      
      idTurno: {type: Schema.ObjectId,
                ref : "Turno"},            
      /*
      persona: [{
        type: PersonaSchema
      }],
      turno: [{
        type: TurnoSchema
      }]
      turno_inscripcion: {
        type: Schema.ObjectId,
        ref : "servicio"
      },//*/
      //RELATIONS
             
      idEvento: {
        type: Schema.ObjectId,
        ref : "Evento"
      },
      //*/
      idUser: {
        type: Schema.ObjectId,
        ref : "User"
      },
      
      //EXTERNAL RELATIONS
      /*
      evento_evento: {
        type: Schema.ObjectId,
        ref : "evento"
      },
      user_evento: [{
        type: Schema.ObjectId,
        ref : "User"
      }],
      */
    });
    
    inscripcionSchema.post('save', function(doc) {      
      const turno = TurnosModel.get(doc.idTurno);
      turno.then(
        data=>{
          data.inscripciones++;
          TurnosModel.update(data);
        }
      );
    });
    //*/
    
    inscripcionSchema.post('remove', function(doc) {
      const turno = TurnosModel.get(doc.idTurno);
      turno.then(
        data=>{
          data.inscripciones--;
          TurnosModel.update(data);
        }
      );
    });
    //*/

    generatedModel.setModel(db.connection.model("Inscripcion", inscripcionSchema));

    return inscripcionSchema;
  },

  /**
   * Set Model
   */
  setModel: model => {
    generatedModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return generatedModel.model;
  },

  // Start queries
    
  // CRUD METHODS


  /**
  * inscripcionModel.create
  *   @description CRUD ACTION create
  *   @param inscripcion obj Object to insert
  *
  */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },
  
  /**
  * inscripcionModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id inscripcion
  *
  */
  async delete(id) {
    return await  generatedModel.model.findOne({_id: id},
      (err, user) => {
        user.remove();
    });
    //return await generatedModel.model.findByIdAndRemove(id);
  },
  
  /**
  * inscripcionModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id inscripcion
  *   @returns inscripcion
  *
  */
  async get(id) {
    return await generatedModel.model.findOne({_id: id});
  },
  
  /**
  * eventoModel.findByTurnoId
  *   @description CRUD ACTION findByTurnoId
  *   @param Objectid key Id della risorsa TurnoId da cercare
  *
  */
 async findByTurnoId(key) {
    return await generatedModel.model.find({ 'idTurno' : key});
  },
  /**
  * eventoModel.findByUserId
  *   @description CRUD ACTION findByUserId
  *   @param Objectid key Id della risorsa UserId da cercare
  *
  */
 async findByUserId(key) {
    return await generatedModel.model.find({ 'idUser' : key})
    .populate( 'idTurno','-inscripciones,-cupo')
    .populate('idEvento','titulo');
    },
  /**
  * eventoModel.findByEvento
  *   @description CRUD ACTION findByEvento
  *   @param Objectid key Id della risorsa Evento da cercare
  *
  */
 async findByEvento(key) {
    return await generatedModel.model.find({ 'idEvento' : key});
  },
  /**
  * inscripcionModel.list
  *   @description CRUD ACTION list
  *   @returns ARRAY OF inscripcion
  *
  */
  async list() {
    return await generatedModel.model.find();
  },
  
  /**
  * inscripcionModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id inscripcion
  *   @returns inscripcion
  *
  */
  async update(item) { 
    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },
  
};

export default generatedModel;