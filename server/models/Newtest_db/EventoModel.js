
import EventoModelGenerated from "./generated/EventoModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
    
    init() {
      let schema = EventosModelGenerated.init();
  
      schema.add({
        extraCustomField: Object
      });
    },
     
   */


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await EventosModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...EventoModelGenerated,
  ...customModel
};