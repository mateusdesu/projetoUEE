export class Candidate{
    name: string;
    vice_name: string;
    number: number;
    picture_path: string;
    party: string;
    id: number;
    electionId:number;

    constructor(name:string, number:number, electionId:number, party?:string,picture_path?:string, id?:number, vice_name?:string){
        this.name = name;
        this.number = number;
        this.electionId = electionId;

        if(party !== undefined){
            this.party = party;
        }else{
            this.party = "";
        }

        if(picture_path !== undefined){
            this.picture_path = picture_path;
        }else{
            this.picture_path = "";
        }

        if(id !== undefined){
            this.id = id;
        }else{
            this.id = 0;
        }

        if(vice_name !== undefined){
            this.vice_name = vice_name;
        }else{
            this.vice_name = "";
        }

    }
}