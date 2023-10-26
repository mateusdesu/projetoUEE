export class Candidate{
    name: string;
    vice_name: string | null;
    number: number;
    picture_path: string | null;
    party: string | null;
    id: number | null;
    electionId:number;

    constructor(name:string, number:number, electionId:number, party:string | null, picture_path:string | null, vice_name:string |null, id:number | null){
        this.name = name;
        this.number = number;
        this.electionId = electionId;


        if(party === '' || party === null){
            this.party = null;
        }else{
            this.party = party;
        }

        if(picture_path === '' || picture_path === null){
            this.picture_path = null;
        }else{
            this.picture_path = picture_path;
        }

        if(vice_name === '' || vice_name === null){
            this.vice_name = null;
        }else{
            this.vice_name = vice_name;
        }

        if(party === '' || party === null){
            this.id = null;
        }else{
            this.id = id;
        }

        
        
        
       
    }
}