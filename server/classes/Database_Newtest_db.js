
// Import Mongoose
import mongoose from "mongoose";
// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

// Start Import Models

import UserModel        from "../models/Newtest_db/UserModel";
import RolesModel       from "../models/Newtest_db/RolesModel";
import ServicioModel    from "../models/Newtest_db/ServicioModel";
import EventoModel      from "../models/Newtest_db/EventoModel";
import TurnosModel       from "../models/Newtest_db/TurnosModel";
import InscripcionModel from "../models/Newtest_db/InscripcionModel";

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
		RolesModel.init();
    ServicioModel.init();
    EventoModel.init();
    TurnosModel.init();
    InscripcionModel.init();
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
