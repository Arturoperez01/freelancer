/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://beta.skaffolder.com/#!/register?friend=5d122668c0161c5b2b76f322
*
* You will get 10% discount for each one of your friends
* 
*/
/**
 * 
 * 
  _____                      _              _ _ _     _   _     _        __ _ _      
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |     
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___ 
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|
 
 * DO NOT EDIT THIS FILE!! 
 * 
 *  TO CUSTOMIZE eventoModelGenerated.js PLEASE EDIT ../eventoModel.js
 * 
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 * 
 */
// Database
import Database from "../../../classes/Database_Newtest_db";
import mongoose, { Schema } from "mongoose";

// Logger
import Logger from "../../../classes/Logger";

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
      descripcion: {
        type: "String"
      },
      estado: {
        type: "String"
      },
      fecha_asignacion: {
        type: "Date"
      },
      fecha_creacion: {
        type: "Date"
      },
      limite: {
        type: "Number"
      },
      titulo: {
        type: "String"
      },
      //RELATIONS
      evento_servicio: {
        type: Schema.ObjectId,
        ref : "servicio"
      },
      
      
      //EXTERNAL RELATIONS
      /*
      id_evento: {
        type: Schema.ObjectId,
        ref : "detalle_evento"
      },
      */
    });

    generatedModel.setModel(db.connection.model("Evento", eventoSchema));

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
    const obj = new generatedModel.model(item);
    return await obj.save();
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
  * eventoModel.findByevento_servicio
  *   @description CRUD ACTION findByevento_servicio
  *   @param Objectid key Id della risorsa evento_servicio da cercare
  *
  */
  async findByevento_servicio(key) {
    return await generatedModel.model.find({ 'evento_servicio' : key});
  },
  
  /**
  * eventoModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id evento
  *   @returns evento
  *
  */
  async get(id) {
    return await generatedModel.model.findOne({_id: id});
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
  * eventoModel.update
  *   @description CRUD ACTION update
  *   @returns evento
  *
  */
  async update(item) { 
    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },
  


};

export default generatedModel;
