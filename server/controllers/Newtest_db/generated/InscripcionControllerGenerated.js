
import Properties from "../../../properties";
import InscripcionModel from "../../../models/Newtest_db/InscripcionModel";
import ErrorManager from "../../../classes/ErrorManager";
import { authorize } from "../../../security/SecurityManager";
import InscripcionController from "../InscripcionController";
import TurnosModel from "../../../models/Newtest_db/TurnosModel";

const generatedControllers = {
  /**
   * Init routes
   */
  init: router => {
    const baseUrl = `${Properties.api}/inscripcion`;
    router.post(baseUrl + "", authorize([]), InscripcionController.create);
    router.delete(baseUrl + "/:id", authorize([]), InscripcionController.delete);
    router.get(baseUrl + "/:id", authorize([]), InscripcionController.get);
    router.get(baseUrl + "/user/:id", authorize([]), InscripcionController.findByidUser);
    router.get(baseUrl + "/user/:iduser/evento/:idevento", InscripcionController.findByidUserEvento);
    router.get(baseUrl + "/findByid_evento/:id", authorize([]), InscripcionController.findByidEvento);
    router.get(baseUrl + "/findByid_user/:id", authorize([]), InscripcionController.findByidUser);
    router.get(baseUrl + "/findByid_turno/:id", authorize([]), InscripcionController.findByidTurno);
    router.get(baseUrl + "", authorize([]), InscripcionController.list);
    router.post(baseUrl + "/:id", authorize([]), InscripcionController.update);
  },


  // CRUD METHODS

  
  /**
  * InscripcionModel.create
  *   @description CRUD ACTION create
  *   @param Inscripcion obj Object to insert
  *
  */
  create: async (req, res) => {
    try {
      const result = await InscripcionModel.create(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * InscripcionModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  delete: async (req, res) => {
    try {
      const result = await InscripcionModel.delete(req.params.id);
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
      const result = await InscripcionModel.findByidTurno(req.params.key);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  
  /**
  * UserModel.findByidEvento
  *   @description CRUD ACTION findByidEvento
  *   @param Objectid key Id della risorsa idEvento da cercare
  *
  */
  findByidEvento: async (req, res) => {
    try {
      const result = await InscripcionModel.findByidEvento(req.params.key);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
  * UserModel.findByidUser
  *   @description CRUD ACTION findByidUser
  *   @param Objectid key Id della risorsa idUser da cercare
  *
  */
 findByidUser: async (req, res) => {
    try {
      const result = await InscripcionModel.findByUserId(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
  * InscripcionModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id 
  *
  */
  get: async (req, res) => {
    try {
      const result = await InscripcionModel.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * UserModel.findByidUserEvento
  *   @description CRUD ACTION findByidUserEvento
  *   @param Objectid key Id della risorsa idUserEvento da cercare
  *
  */
 findByidUserEvento: async (req, res) => {
    try {
      const user = await UserModel.findByidUserEvento(req.params.iduser);
      const evento = await EventoModel.get(req.params.id);
      
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  /**
  * InscripcionModel.list
  *   @description CRUD ACTION list
  *
  */
  list: async (req, res) => {
  try {
      const result = await InscripcionModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
    
  /**
  * InscripcionModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  update: async (req, res) => {
    try {
      const result = await InscripcionModel.update(req.body);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  }  
  
};

export default generatedControllers;
