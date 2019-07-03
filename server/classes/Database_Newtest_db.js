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
// Import Mongoose
import mongoose from "mongoose";
// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

// Start Import Models

import UserModel from "../models/Newtest_db/UserModel";
import AsistenciaModel from "../models/Newtest_db/AsistenciaModel";
import Detalle_eventoModel from "../models/Newtest_db/Detalle_eventoModel";
import EventoModel from "../models/Newtest_db/EventoModel";
import RolesModel from "../models/Newtest_db/RolesModel";
import ServicioModel from "../models/Newtest_db/ServicioModel";

// End Import Models

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info("MongoDB connected at: " + properties.newtest_db_dbUrl);

    // Start Init Models

		UserModel.init();
		AsistenciaModel.init();
		Detalle_eventoModel.init();
		EventoModel.init();
		RolesModel.init();
		ServicioModel.init();
 // End Init Models
  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");
    try {
      this.dbConnection_newtest_db = await mongoose.connect(
        "mongodb://" + properties.newtest_db_dbUrl,
        { useNewUrlParser: true }
      );
    } catch (err) {
      Logger.error(`Failed connection to the DB: ${err.message}`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_newtest_db;
  }
}

export default new Database();
