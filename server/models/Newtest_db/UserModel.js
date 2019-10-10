
import UserModelGenerated from "./generated/UserModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
   */
    init() {
      let schema = UserModelGenerated.init();
  
      schema.add({
        servicios: [{
          type: "String"
        }],
        perfiles: [{
          type: "String"
        }],
        email: {
          type: "String"
        }
      });
      schema.pre('save',()=>{console.log("new user added")})
      
    },
     
   
    


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await UserModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...UserModelGenerated,
  ...customModel
};
