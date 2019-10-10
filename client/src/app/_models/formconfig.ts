
export class Config  {
    //get config() { return config.filter(({type}) => type !== 'button'); }
  
    config;
    form;
    
      constructor( config ){
          this.config = config;
        }
    
    setValues(model){
      Object.keys(model).forEach(keys=>
                                this.form = this.config.filter(
                                          (modelConfig)=>{
                                            if(keys==modelConfig.name){
                                              modelConfig.value = model[keys]
                                            }
                                            return model
                                          }
                                      )
                                )
      }
  
      returnConfig(){
        return this.config;
      }
    }
