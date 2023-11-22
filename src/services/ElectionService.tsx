import { Election } from "../models/Election";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { SQLError } from "expo-sqlite";
import ImageService from "./ImageService";
import { Candidate } from "../models/Candidate";
import CandidateService  from "./CandidateService"; 

const db = DatabaseConnection.getConnection();
const table = "election";
var elections: Array<Election> = [];

export default class ElectionService{
    
    static async addElection(election: Election){
        let add = false;
        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`insert into ${table} (name, password, positions, white_votes) 
                values (?,?,?,?)`, 
                [election.name, election.password, election.positions,0],
                (_,{rows,insertId})=>{
                    console.log("Eleição inserida: "+insertId);
                    ImageService.createDir(election.name); //OBS: fazer verificação se diretório(eleição) já existe                 
                    

                    if(insertId != undefined){
                        add = true;
                    }

                    resolve(rows);

                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                    reject(false);
                }
            }          
        ));
        return add;
    }

    static async sumWhiteVotes(id:number){
        let white_votes = await this.getWhiteVotes(id);
        white_votes = white_votes + 1;
        let voteWasComputed = false;

        await new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`update election set white_votes = ${white_votes} where id = ${id}`,[],(_,{rows,rowsAffected})=>{
                    resolve(rows);
                    if(rowsAffected = 1){
                        voteWasComputed = true;
                    }
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao inserir candidato: "+sqlErr);
                    reject(false);
                }
            }
        ))
        
        return voteWasComputed;
    }

    static async getWhiteVotes(id:number){
        let white_votes = 0;
        await new Promise ((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select white_votes from ${table} where id = ${id}`,[],(_,{rows})=>{
                     resolve(rows);

                    white_votes= rows.item(0).white_votes;

                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao contabilizar votos brancos: "+sqlErr);
                    reject(false);
                }
            }
        ))
        return white_votes;

    }

    static async hasCandidates(id:number){   
        let hasCandidate = 0; 
          await new Promise ((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select count(electionId) as candidates from candidate where electionId = (?)`,[id],(_,{rows})=>{
                     resolve(rows);

                     hasCandidate= rows.item(0).candidates;

                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao contar candidatos "+sqlErr);
                    reject(false);
                }
            }
        ))
        return hasCandidate;
    }

    static deleteElection(id:number){
        return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`delete from ${table} where id = ${id}`,[],(_,{rows})=>{
                    resolve(rows.item(0).id);
                }),(sqlError:SQLError)=>{
                    console.log("Erro ao excluir candidato: "+sqlError);
                }
            }
        ))
    }

    static async checkElectionCredential(id:number, pass:string){
        let authorized = false;

        await new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select password from ${table} where id = ${id}`,[],(_,{rows})=>{
                    resolve(rows);
                    let password = rows._array[0].password;

                    if(password === pass){
                        authorized = true;
                    }
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao conferir senha!"+sqlErr);                   
                }
            }
        ))

        return authorized;
    }

    static computeVote(id: number, votes:number){
        let newVotes = votes + 1;
        let voteWasComputed = false;

        new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`update candidate set votes = ${newVotes} where id = ${id}`,[],(_,{rows})=>{
                    console.log("Voto computado!");
                    voteWasComputed = true;
                }),(sqlErr:SQLError)=>{
                    console.log("Falha ao computar voto!"+sqlErr);                   
                }
            }
        ));

        return voteWasComputed;

    }

    static result(electionId:number){
        let candidates:Array<Candidate> = [];
         new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select * from candidate where idElection = ${electionId} order by votes desc`,[],(_,{rows})=>{
                    resolve(rows._array);
                    candidates = rows._array;
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao gerar resultado: "+sqlErr);                   
                }
            }
         ));

         return candidates;
    }

    static amountOfVotes(electionId:number){
        let amount = 0;
        new Promise((resolve, reject)=>db.transaction(
            tx=>{
                tx.executeSql(`select SUM(votes) as votes from candidate where idElection = ${electionId}`,[],(_,{rows})=>{
                    resolve(rows._array);
                    amount = rows._array[0];
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao gerar resultado: "+sqlErr);                   
                }
            }
         ));

         return amount;
    }

    static findAll(){
       return new Promise((resolve, reject)=> db.transaction(
            tx=>{
                tx.executeSql(`select * from ${table}`,[],(_,{rows})=>{
                    //console.log("FA El: "+rows.length);
                    //resolve(rows._array);
                    //elections = rows._array;
                    resolve(rows);
                    //console.log("FA ELEC: "+elections);
                }),(sqlErr:SQLError)=>{
                    console.log("Erro ao buscar eleições: "+sqlErr);
                    //reject(null);
                }
            }
        ));

        //return elections;
    }
}