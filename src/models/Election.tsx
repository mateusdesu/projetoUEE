export class Election{

    name: string;
    password: string;
    positions: Array<string>;
    id:number | null;

    constructor(name:string, password:string, positions:Array<string>, id:number | null){

        if(id === 0 || id === null){
            this.id = null;
        }else{
            this.id = id;
        }

        this.name = name;
        this.password = password;
        this.positions = positions;
    }
   
}