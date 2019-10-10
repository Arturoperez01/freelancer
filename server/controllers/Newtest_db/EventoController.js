
import EventoControllerGenerated from "./generated/EventoControllerGenerated";

// Properties
import Properties from "../../properties";

// Database
import EventoModel from "../../models/Newtest_db/EventoModel";
import TurnoModel from "../../models/Newtest_db/TurnosModel"
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
     const baseUrl = `${Properties.api}/Evento`;
     
     // custom route
     router.get(baseUrl + "/:id", customControllers.get);
     
     // Init super
     EventoControllerGenerated.init(router);
    },

  */

 init: router => {
  const baseUrl = `${Properties.api}/eventos`;
  
  // custom route
  router.get(baseUrl + "/turnos/:id", customControllers.getTurno);
  
  // Init super
  EventoControllerGenerated.init(router);
 },
 getTurno: async (req, res) => {
  try {
    const result = await TurnoModel.findByidEvento(req.params.id);
    res.json(result);
  } catch (err) {
    const safeErr = ErrorManager.getSafeError(err);
    res.status(safeErr.status).json(safeErr);
  }
}
  /**
   * Override here your custom controllers
   * EXAMPLE:
   *
   
    get: async (req, res) => {
      try {
        console.log("This is my custom controller");
        const result = await EventoModel.get(req.params.id);
        res.json(result);
      } catch (err) {
        const safeErr = ErrorManager.getSafeError(err);
        res.status(safeErr.status).json(safeErr);
      }
    }

   */
   

};

export default {
  ...EventoControllerGenerated,
  ...customControllers
};

