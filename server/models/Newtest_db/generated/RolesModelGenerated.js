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
      * roles
      */
    const rolesSchema = new mongoose.Schema({
      nombre: {
        type: "String"
      },
      //RELATIONS
      
      
      //EXTERNAL RELATIONS
      /*
      */
    });

    generatedModel.setModel(db.connection.model("Roles", rolesSchema));

    return rolesSchema;
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
  * rolesModel.create
  *   @description CRUD ACTION create
  *   @param roles obj Object to insert
  *
  */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },
  
  /**
  * rolesModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id roles
  *
  */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },
  
  /**
  * rolesModel.list
  *   @description CRUD ACTION list
  *   @returns ARRAY OF roles
  *
  */
  async list() {
    return await generatedModel.model.find();
  },
  
  /**
  * rolesModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id roles
  *   @returns roles
  *
  */
  async update(item) { 
    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },
  


};

export default generatedModel;
