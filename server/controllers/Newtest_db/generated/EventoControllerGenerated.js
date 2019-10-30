import Properties from "../../../properties";
import EventoModel from "../../../models/Newtest_db/EventoModel";
import TurnosModel from "../../../models/Newtest_db/TurnosModel";
import UserModel from "../../../models/Newtest_db/UserModel";
import ErrorManager from "../../../classes/ErrorManager";
import { authorize } from "../../../security/SecurityManager";
import EventoController from "../EventoController";

const generatedControllers = {
  /**
   * Init routes
   */
  init: router => {
    const baseUrl = `${Properties.api}/eventos`;
    router.post(baseUrl + "", authorize([]), EventoController.create);
    router.post(baseUrl + "/me", authorize([]), EventoController.userEvent);
    router.delete(baseUrl + "/:id", authorize([]), EventoController.delete);
    router.get(baseUrl + "/:id", authorize([]), EventoController.get);
    router.get(baseUrl + "/findByid_turno/:id", EventoController.findByidTurno);
    router.get(baseUrl + "", authorize([]), EventoController.list);
    router.post(baseUrl + "/:id", authorize([]), EventoController.update);
  },


  // CRUD METHODS

  
  /**
  * EventoModel.create
  *   @description CRUD ACTION create
  *   @param evento obj Object to insert
  *
  */
  create: async (req, res) => {
    try {
      let i = 0;
      let turnos = [];
      while(i<req.body.turnos.length){
        let turno = await TurnosModel.create(req.body.turnos[i]);
        turnos.push(turno);
        i++;
      }
      
      req.body.turnos = turnos;
      const result = await EventoModel.create(req.body)
      
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * EventoModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  delete: async (req, res) => {
    try {
      const result = await EventoModel.delete(req.params.id);
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
      const result = await EventoModel.findByidTurno(req.params.key);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  /**
  * EventoModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id 
  *
  */
  get: async (req, res) => {
    try {
      const result = await EventoModel.get(req.params.id);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * EventoModel.list
  *   @description CRUD ACTION list
  *
  */
  list: async (req, res) => {
    try {
      //console.log(req.query);
      const result = await EventoModel.list();
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
  
  /**
  * eventoModel.userEvent
  *   @description CRUD ACTION download
  *   @returns String
  *
  */
 userEvent: async (req, res) => {
  try {
    const result = await EventoModel.userEvent(req.body);
    res.json(result);
  } catch (err) {
    const safeErr = ErrorManager.getSafeError(err);
    res.status(safeErr.status).json(safeErr);
  }
},
  /**
  * EventoModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  update: async (req, res) => {
    try {
      let evento = req.body;
      let i = 0;
      const turnos = req.body.turnos.map(turno=>turno);      
      while(i<turnos.length){
        TurnosModel.update(turnos[i]);
        i++;
      }
      evento.turnos = req.body.turnos.map(turno=>turno._id);
      const result = await EventoModel.update(evento);
      res.json(result);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  }  
  
};

export default generatedControllers;
