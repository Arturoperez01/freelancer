// Database
import Database from "../../../classes/Database_Newtest_db";
import mongoose, { Schema } from "mongoose";

// Logger
import Logger from "../../../classes/Logger";
import { stringify } from "querystring";
const generatedModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
      * evento
      */
    const TurnosSchema = new mongoose.Schema({
        fecha: Date,
        horaIni: String,
        horaFin: String,
        cupo: Number,
        estado: String,
        inscripciones: Number
        /*
        idEvento: {
            type: Schema.ObjectId,
            ref: "Evento"
        }
      //RELATIONS
      
      
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

    generatedModel.setModel(db.connection.model("Turno", TurnosSchema));

    return TurnosSchema;
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
  * turnoModel.create
  *   @description CRUD ACTION create
  *   @param turno obj Object to insert
  *
  */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },
  
  /**
  * turnoModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id turno
  *
  */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },
  
  /**
  * turnoModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id turno
  *   @returns turno
  *
  */
  async get(id) {
    return await generatedModel.model.findOne({_id: id});
  },
  
  /**
  * turnoModel.list
  *   @description CRUD ACTION list
  *   @returns ARRAY OF turno
  *
  */
  async list() {
    return await generatedModel.model.find();
  },
  
  /**
  * turnoModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id turno
  *   @returns turno
  *
  */
  async update(item) { 
    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },
  
};

export default generatedModel;