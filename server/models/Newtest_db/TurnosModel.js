
import TurnosModelGenerated from "./generated/TurnosModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
   */
    init() {
      let schema = TurnosModelGenerated.init();
  
    },
      
    /**
     * turnoModel.findByTurnoid
     *   @description CRUD ACTION findByTurnoid
     *   @param Objectid key Id della risorsa Turnoid da cercare
     *
     */
    async findByidEvento(key) {
        return await TurnosModelGenerated.model.find({ "idEvento" : key});
    },
  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await TurnosModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...TurnosModelGenerated,
  ...customModel
};
