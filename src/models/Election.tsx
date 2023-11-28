export class Election{

    name: string;
    password: string;
    positions: string; //string.split(',');
    white_votes?:number = 0;
    id:number ;
    closed: boolean = false;

    
    //FINDALL DE REALIZAR ELEIÇÃO: SE ESSE CAMPO FOR VERDADEIRO A ELEIÇÃO NÃO É COLOCADA COMO OPÇÃO A SER SELECIONADA, CASO CONTRÁRIO SIM.
    //FINDALL DE RESULTADO DE ELEIÇÃO: SE ESSE CAMPO FOR VERDADEIRO A ELEIÇÃO É COLOCADA COMO OPÇÃO A SER SELECIONADA, CASO CONTRÁRIO NÃO.

    constructor(name:string, password:string, positions:string, id:number, white_votes?:number){

        if(id === 0 || id === null){
            this.id = 0;
        }else{
            this.id = id;
        }

        if(white_votes !=undefined){
            this.white_votes = white_votes;
        }

        this.name = name;
        this.password = password;
        this.positions = positions;
    }   


   
}