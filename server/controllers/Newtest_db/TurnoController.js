
import TurnoControllerGenerated from "./generated/TurnoControllerGenerated";

// Properties
import Properties from "../../properties";

// Database
import TurnosModel from "../../models/Newtest_db/TurnosModel";

// Security
import { authorize } from "../../security/SecurityManager";

// Errors
import Errors from "../../classes/Errors";
import ErrorManager from "../../classes/ErrorManager";

const customControllers = {
  
  /**
   * Override here your custom routes
   * EXAMPLE:
   *
    
   init: router => {
     const baseUrl = `${Properties.api}/Turno`;
     
     // custom route
     router.get(baseUrl + "/:id", customControllers.get);
     
     // Init super
     TurnoControllerGenerated.init(router);
    },

  */

  /**
   * Override here your custom controllers
   * EXAMPLE:
   *
   
    get: async (req, res) => {
      try {
        console.log("This is my custom controller");
        const result = await TurnosModel.get(req.params.id);
        res.json(result);
      } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
      }
    }

   */
   

};

export default {
  ...TurnoControllerGenerated,
  ...customControllers
};

