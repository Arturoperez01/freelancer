// Database
import Database from "../../../classes/Database_Newtest_db";
import mongoose, { Schema } from "mongoose";
import TurnosModel from "../TurnosModel";
import UserModel from "../UserModel";
// Logger
import Logger from "../../../classes/Logger";
import { stringify } from "querystring";
/*
const turnoSchema = new Schema({ 
  
                                  fecha: Date,
                                  horaIni: String,
                                  horaFin: String,
                                  cupo: String,
                                  estado: String,
                                  inscripciones: Number
                                });
//*/
const generatedModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
      * evento
      */
    const eventoSchema = new mongoose.Schema({
      titulo: {
        type: "String"
      },
      descripcion: {
        type: "String"
      },
      servicio: {
        type: "String"
      },
      perfiles: [{
        type: "String"
      }],
      estado: {
        type: "String"
      },
      limite: {
        type: "Number"
      },
      //RELATIONS
      
      turnos: [
        {
          type: Schema.ObjectId,
          ref : "Turno"
        }
      ]

      
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

    generatedModel.setModel(db.connection.model("Evento", eventoSchema));
    //generatedModel.setModel(db.connection.model("Turno", turnoSchema));

    return eventoSchema;
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
  * eventoModel.create
  *   @description CRUD ACTION create
  *   @param evento obj Object to insert
  *
  */
  async create(item) {
    //console.log(item)
    const obj = new generatedModel.model(item);
    return await obj.save();
    /*
    obj.turnos.push( item.turnos.map(turnoitem=>{
          return TurnosModel.create(turnoitem);
        }
      )
    )
   return await obj.save();
   //*/
  },
  
  /**
  * eventoModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id evento
  *
  */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },
  
  /**
  * eventoModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id evento
  *   @returns evento
  *
  */
  async get(id) {
      generatedModel.model.aggregate([ 
                                        {$match:{_id:  mongoose.Types.ObjectId(id)}},
                                        {$lookup:{
                                                  "from": "turnos",
                                                  "localField": "turnos",
                                                  "foreignField": "_id",
                                                  "as": "Turnos"
                                                  }
                                        },
                                        {"$unwind": "$Turnos" }
                                        //*/
                                      ], function (err, result) {
                                        if (err) {
                                            next(err);
                                        } else {
                                            console.log(result);
                                        }
                                    });
    return await generatedModel.model.findOne({_id: id})
    .populate('turnos');
  },
  
  /**
  * eventoModel.findByTurnoid
  *   @description CRUD ACTION findByTurnoid
  *   @param Objectid key Id della risorsa Turnoid da cercare
  *
  */
 async findByidTurno(key) {
  return await generatedModel.model.find({ "turno._id" : key});
},
  /**
  * eventoModel.list
  *   @description CRUD ACTION list
  *   @returns ARRAY OF evento
  *
  */
  async list() {
    return await generatedModel.model.find();
  },
  
  /**
  * nominaModel.get
  *   @description CRUD ACTION get
  *   @param filter object
  *
  */
 
  async userEvent(userId) {
    let query={
                perfiles: {$in:Array},
                servicio: {$in:Array}
              };
    let user = await UserModel.get(userId.id);
    
    if(user.perfiles.length != 0?true:false){
      query.perfiles.$in = user.perfiles;
    }
    if(user.servicios.length != 0?true:false){
       query.servicio.$in = user.servicios;
    }
    //*/

    return await generatedModel.model.find(query).select(["-__v"]);
  },

  /**
  * eventoModel.update
  *   @description CRUD ACTION update
  *   @param evento evento
  *   @returns evento
  *
  */
  async update(item) { 
    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  }
  
};

export default generatedModel;