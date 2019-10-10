
import InscripcionModelGenerated from "./generated/InscripcionModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
  //*/  
  /*
    init() {
      let schema = InscripcionModelGenerated.init();
      console.log('ass');
      
      schema.post('delete', function(doc) {
        console.log(doc);
        const turno = TurnosModel.get(doc.idTurno);
        turno.then(
          data=>{
            data.inscripciones--;
            console.log(data);
            TurnosModel.update(data);
          }
        );
      });

    },
     
  //*/


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await InscripcionsModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...InscripcionModelGenerated,
  ...customModel
};