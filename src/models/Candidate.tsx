export class Candidate{
    name: String;
    vice_name: String;
    number: Number;
    picture_path: String;
    id: Number;
    electionId:Number;

    constructor(name:String, number:Number, electionId:Number, picture_path?:String, id?:Number, vice_name?:String){
        this.name = name;
        this.number = number;
        this.electionId = electionId;

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