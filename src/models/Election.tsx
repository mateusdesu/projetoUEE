export class Election{

    name: string;
    password: string;
    positions: string; //string.split(',');
    id:number ;

    constructor(name:string, password:string, positions:string, id:number){

        if(id === 0 || id === null){
            this.id = 0;
        }else{
            this.id = id;
        }

        this.name = name;
        this.password = password;
        this.positions = positions;
    }   


   
}