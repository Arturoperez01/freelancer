
import Properties from "../../../properties";
import TurnosModel from "../../../models/Newtest_db/TurnosModel";
import ErrorManager from "../../../classes/ErrorManager";
import { authorize } from "../../../security/SecurityManager";
import TurnoController from "../TurnoController";

const generatedControllers = {
  /**
   * Init routes
   */
  init: router => {
    const baseUrl = `${Properties.api}/Turnos`;
    router.post(baseUrl + "", authorize([]), TurnoController.create);
    router.delete(baseUrl + "/:id", authorize([]), TurnoController.delete);
    router.get(baseUrl + "/:id", authorize([]), TurnoController.get);
    router.get(baseUrl + "", authorize([]), TurnoController.list);
    router.post(baseUrl + "/:id", authorize([]), TurnoController.update);
  },


  // CRUD METHODS

  
  /**
  * TurnosModel.create
  *   @description CRUD ACTION create
  *   @param Turno obj Object to insert
  *
  */
  create: async (req, res) => {
    try {
      const result = await TurnosModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * TurnosModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  delete: async (req, res) => {
    try {
      const result = await TurnosModel.delete(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  

  /**
  * UserModel.findByidTurno
  *   @description CRUD ACTION findByidTurno
  *   @param Objectid key Id della risorsa idTurno da cercare
  *
  */
  findByidTurno: async (req, res) => {
    try {
      const result = await TurnosModel.findByidTurno(req.params.key);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
  * TurnosModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id 
  *
  */
  get: async (req, res) => {
    try {
      const result = await TurnosModel.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * TurnosModel.list
  *   @description CRUD ACTION list
  *
  */
  list: async (req, res) => {
    try {
      //console.log(req.query);
      const result = await TurnosModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  
  /**
  * TurnosModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  update: async (req, res) => {
    try {
      const result = await TurnosModel.update(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  }  
  
};

export default generatedControllers;
