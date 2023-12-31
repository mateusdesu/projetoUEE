export class Candidate{
    name: string;
    vice_name: string | null;
    number: string;
    picture_path: string;
    party: string | null;
    id: number | null;
    electionId:number;
    position:string;
    votes: number; 


    constructor(name:string, number:string, electionId:number, position:string,party:string | null, picture_path:string, vice_name:string |null, id:number | null){
        this.name = name;
        this.number = number;
        this.electionId = electionId;
        this.position = position;
        this.picture_path = picture_path;
        this.votes = 0;


        if(party === '' || party === null){
            this.party = null;
        }else{
            this.party = party;
        }
           

        if(vice_name === '' || vice_name === null){
            this.vice_name = null;
        }else{
            this.vice_name = vice_name;
        }

        if(id === 0 || id === null){
            this.id = null;
        }else{
            this.id = id;
        }

    }
    
    
    
}