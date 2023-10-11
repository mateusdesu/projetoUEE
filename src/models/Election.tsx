export class Election{

    name:String;
    password:String;
    positions:Array<String>;
    candidatesConfig:JSON ;
    /*{
        party: boolean,
        picture: boolean,
        vice:boolean
    }*/
    id:Number;

    constructor(name:String, password:String, positions:Array<String>, candidatesConfig:JSON, id?:number){
        
        if(id !== undefined){
            this.id = id;
        }else{
           this.id = 0;
        }

        this.name = name;
        this.password = password;
        this.positions = positions;
        this.candidatesConfig = candidatesConfig;
    }


    
}